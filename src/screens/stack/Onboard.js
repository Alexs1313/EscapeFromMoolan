import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const handleNextStep = () => {
    if (index === 5) {
      navigation.replace('TabNav');
    }
    setIndex(index + 1);
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#D09725', '#77591E']}>
      <ScrollView
        contentContainerStyle={{ height: 900 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/onboard.png')}
            style={styles.image}
          />
        </View>

        <LinearGradient
          colors={['#D09725', '#77591E']}
          style={styles.contentContainer}
        >
          <View style={styles.contentWrap}>
            <View style={index < 4 && { minHeight: 150 }}>
              <Text style={styles.title}>
                {index === 0 && 'Trapped in the Maze of Moolan'}
                {index === 1 && 'Navigate the Ever-Changing Maze'}
                {index === 2 && 'Collect Keys & Outsmart Moolan'}
                {index === 3 && 'Every Second Counts'}
                {index === 4 && 'Are You Ready to Face the Guardian?'}
                {index === 5 && 'How to Move'}
              </Text>

              <Text style={styles.subtitle}>
                {index === 0 &&
                  `A powerful guardian lion watches over an ancient labyrinth. Only the bold escape. Will you?`}
                {index === 1 &&
                  'Swipe or tap to move. Discover hidden paths, avoid traps, and search for the key to freedom.'}
                {index === 2 &&
                  'Keys are your only way out. But beware — Moolan is never far behind.'}
                {index === 3 &&
                  ' Solve the maze before the sands run out. Fast thinking is your greatest ally.'}
                {index === 4 &&
                  'The gates are closed. The lion is awake. The only way is forward.'}
                {index === 5 && 'Use the arrow keys to move'}
              </Text>
            </View>
            {index === 5 && (
              <Image
                source={require('../../assets/images/controls.png')}
                style={styles.controlsImg}
              />
            )}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={handleNextStep}
            >
              <Image
                source={require('../../assets/components/onboardBtn.png')}
                style={styles.button}
              />
              <Text style={styles.btnText}>
                {index < 4 && 'Next'}
                {index === 4 && 'Enter the maze'}
                {index === 5 && 'Start Game'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  contentWrap: {
    padding: 30,
    paddingHorizontal: 40,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  contentContainer: {
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    borderTopWidth: 4,
    borderWidth: 0.17,
    borderColor: '#76520B',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '45%',
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 26,
  },
  image: { width: '100%' },
  btnText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#225203',
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsImg: {
    marginBottom: 20,
  },
});

export default Onboard;
