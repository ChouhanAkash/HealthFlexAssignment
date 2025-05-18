import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SectionList,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import TimerCard from '../components/TimerCard';
import {saveTimersToStorage, loadTimersFromStorage} from '../utils/storage';
import CategorySection from '../components/CategorySection';
export default function HomeScreen({navigation}) {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTimers();
    }
  }, [isFocused]);

  const loadTimers = async () => {
    const data = await loadTimersFromStorage();
    setTimers(data);
  };

  const addTimer = async () => {
    if (!name || !duration || !category) return;
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    await saveTimersToStorage(updatedTimers);
    setModalVisible(false);
    setName('');
    setDuration('');
    setCategory('');
  };

  const grouped = timers.reduce((acc, timer) => {
    const cat = timer.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(timer);
    return acc;
  }, {});

  const sectionData = Object.keys(grouped).map(key => ({
    title: key,
    data: grouped[key],
  }));

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <View style={{flex: 1, marginRight: 5}}>
          <Button
            title="Add Timer"
            onPress={() => setModalVisible(true)}
            color="black"
          />
        </View>
        <View style={{flex: 1, marginLeft: 5}}>
          <Button
            title="Go to History"
            onPress={() => navigation.navigate('History')}
            color="black"
          />
        </View>
      </View>
      <SectionList
        sections={sectionData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TimerCard timer={item} timers={timers} setTimers={setTimers} />
        )}
        renderSectionHeader={({section: {title}}) => (
          <CategorySection
            title={title}
            timers={timers}
            setTimers={setTimers}
          />
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Timer Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Duration (in seconds)"
            placeholderTextColor="#888"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Category"
            placeholderTextColor="#888"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={{flex: 1, marginRight: 5}}>
              <Button title="Save" onPress={addTimer} />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    padding: 5,
  },
  modalContent: {flex: 1, justifyContent: 'center', padding: 20},
  input: {borderWidth: 1, padding: 10, marginBottom: 10},
});
