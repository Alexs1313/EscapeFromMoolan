import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useStore } from '../store/context';

const CustomModal = ({
  collectedCoins,
  setRestartKey,
  restartKey,
  setIsVisibleModal,
  setTimeLeft,
}) => {
  const navigation = useNavigation();
  const { setCollectedCoins } = useStore();

  const handleGoBack = () => {
    setRestartKey(restartKey + 1);
    setIsVisibleModal(false);
    navigation.goBack();
  };

  const nextLevel = () => {
    setIsVisibleModal(false);
    setCollectedCoins([]);
    setTimeLeft(300);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.modalContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/components/modal.png')} />
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text style={[styles.title, { top: 49 }]}>Level passed</Text>
            <Text style={[styles.title, { top: 70 }]}>Moolans earned</Text>
            <View style={styles.coinsContainer}>
              <Image source={require('../assets/components/coin.png')} />
              <Text style={styles.quantity}>10+{collectedCoins.length}</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { top: 100 }]}
              onPress={nextLevel}
            >
              <Image source={require('../assets/components/modalBtn.png')} />
              <Text style={styles.btnText}>Next level</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
              <Text style={[styles.btnText, { color: '#76520B' }]}>
                Back home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 65,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#76520B',
  },
  quantity: {
    fontFamily: 'Moul-Regular',
    fontSize: 24,
    color: '#000000',
  },
  modalContainer: { alignItems: 'center', top: 200, zIndex: 10 },
  btnText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#225203',
    position: 'absolute',
  },
  coinsContainer: {
    minWidth: 91,
    paddingHorizontal: 4,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    top: 80,
  },
  button: { alignItems: 'center', justifyContent: 'center', top: 135 },
});

export default CustomModal;
