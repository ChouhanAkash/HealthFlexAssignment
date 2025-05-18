import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('TIMER_HISTORY');
      const parsed = stored ? JSON.parse(stored) : [];
      setHistory(parsed.reverse()); // latest first come here
    } catch (e) {
      console.log('Error loading history:', e);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.time}>Completed at: {item.completedAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Timers</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No completed timers yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15},
  heading: {fontSize: 22, fontWeight: 'bold', marginBottom: 15},
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  name: {fontSize: 18, fontWeight: '600'},
  time: {fontSize: 14, color: '#555'},
});
