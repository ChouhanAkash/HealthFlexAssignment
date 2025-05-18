import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Common layout
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },

  // Section headers for categories
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
    marginVertical: 5,
  },

  // Timer input modal styles
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fafafa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  // Timer card styles
  timerCard: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  // History screen
  historyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  historyTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
