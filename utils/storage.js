import AsyncStorage from '@react-native-async-storage/async-storage';

// Save all timers to AsyncStorage
export const saveTimersToStorage = async (timers) => {
  try {
    await AsyncStorage.setItem('TIMERS', JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};

// Load timers from AsyncStorage
export const loadTimersFromStorage = async () => {
  try {
    const stored = await AsyncStorage.getItem('TIMERS');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
};

// Add a completed timer to history
export const addToHistory = async ({ name }) => {
  try {
    const stored = await AsyncStorage.getItem('TIMER_HISTORY');
    const history = stored ? JSON.parse(stored) : [];

    const newEntry = {
      name,
      completedAt: new Date().toLocaleString(),
    };

    history.push(newEntry);

    await AsyncStorage.setItem('TIMER_HISTORY', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};
