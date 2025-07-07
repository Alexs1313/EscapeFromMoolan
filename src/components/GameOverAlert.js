import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GameOverAlert = ({
  setIsVisibleAlert,
  restartKey,
  setRestartKey,
  setTimeLeft,
  level,
  setLevel,
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
    setIsVisibleAlert(false);
  };

  const tryAgain = () => {
    setTimeLeft(300);
    setLevel(level);
    setRestartKey(restartKey + 1);
    setIsVisibleAlert(false);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.alertContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/components/modal.png')} />
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text style={[styles.title, { top: 49 }]}>Game over</Text>
            <Image
              source={require('../assets/images/trap.png')}
              style={styles.trapImg}
            />
            <TouchableOpacity
              style={[styles.button, { top: 100 }]}
              onPress={tryAgain}
            >
              <Image source={require('../assets/components/modalBtn.png')} />
              <Text style={styles.btnText}>Try again</Text>
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
  alertContainer: { alignItems: 'center', top: 200, zIndex: 10 },
  btnText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#225203',
    position: 'absolute',
  },
  coinsContainer: {
    width: 91,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    top: 80,
  },
  trapImg: { top: 70 },
  button: { alignItems: 'center', justifyContent: 'center', top: 135 },
});

export default GameOverAlert;
