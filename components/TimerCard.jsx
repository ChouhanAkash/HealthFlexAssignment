import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {saveTimersToStorage, addToHistory} from '../utils/storage';
export default function TimerCard({timer, timers, setTimers}) {
  const intervalRef = useRef(null);
  const [remaining, setRemaining] = useState(timer.remaining);
  const [status, setStatus] = useState(timer.status);

  useEffect(() => {
    if (status === 'Running') {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setStatus('Completed');
            showCompletionModal();
            updateStatus('Completed', 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [status]);

  useEffect(() => {
    updateTimerInState();
  }, [remaining, status]);

  const updateTimerInState = async () => {
    const updatedTimers = timers.map(t =>
      t.id === timer.id ? {...t, remaining, status} : t,
    );
    setTimers(updatedTimers);
    await saveTimersToStorage(updatedTimers);
  };

  const updateStatus = async (newStatus, newRemaining = remaining) => {
    setStatus(newStatus);
    setRemaining(newRemaining);
  };

  const resetTimer = () => {
    setStatus('Paused');
    setRemaining(timer.duration);
  };

  const showCompletionModal = () => {
    Alert.alert('Timer Completed!', `${timer.name} has finished.`, [
      {text: 'OK'},
    ]);
    addToHistory({name: timer.name});
  };

  const percent = 1 - remaining / timer.duration;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Status: {status}</Text>
      <Text>Remaining: {remaining}s</Text>
      <ProgressBar progress={percent} width={null} color="#4682B4" />
      <View style={styles.buttons}>
        <Button
          title="Start"
          onPress={() => updateStatus('Running')}
          disabled={status === 'Completed'}
        />
        <Button
          title="Pause"
          onPress={() => updateStatus('Paused')}
          disabled={status === 'Completed'}
        />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
