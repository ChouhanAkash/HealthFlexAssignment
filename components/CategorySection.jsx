import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  startAllInCategory,
  pauseAllInCategory,
  resetAllInCategory,
} from '../utils/timerUtils';
import {saveTimersToStorage} from '../utils/storage';

export default function CategorySection({title, timers, setTimers}) {
  const handleAction = async action => {
    let updatedTimers;
    if (action === 'start') {
      updatedTimers = startAllInCategory(timers, title);
    } else if (action === 'pause') {
      updatedTimers = pauseAllInCategory(timers, title);
    } else if (action === 'reset') {
      updatedTimers = resetAllInCategory(timers, title);
    }
    setTimers(updatedTimers);
    await saveTimersToStorage(updatedTimers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <Button title="Start All" onPress={() => handleAction('start')} />
        <Button title="Pause All" onPress={() => handleAction('pause')} />
        <Button title="Reset All" onPress={() => handleAction('reset')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
