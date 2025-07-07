import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../../store/context';
import { useCallback } from 'react';

const { height } = Dimensions.get('window');

const Game = () => {
  const navigation = useNavigation();
  const { gameLevels, getLevels } = useStore();

  useFocusEffect(
    useCallback(() => {
      getLevels();
    }, []),
  );

  const handleSelectLevel = selectedLevel => {
    navigation.navigate('Gameplay', selectedLevel);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Levels:</Text>
            <Image source={require('../../assets/images/lion.png')} />
          </View>
          <View style={styles.levelsWrap}>
            {gameLevels.map((level, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => handleSelectLevel(idx)}
                disabled={!level.unlocked}
                style={styles.btnWrap}
              >
                <Image source={require('../../assets/components/levels.png')} />
                {level.unlocked ? (
                  <Text style={styles.levelText}>{level.level}</Text>
                ) : (
                  <Image
                    source={require('../../assets/icons/lock.png')}
                    style={styles.lockImg}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.065,
    alignItems: 'center',
    paddingBottom: height * 0.28,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 12,
  },
  levelText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 63,
    color: '#76520B',
    position: 'absolute',
  },
  lockImg: {
    position: 'absolute',
  },
  levelsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 50,
    justifyContent: 'center',
    gap: 3,
  },
  btnWrap: { alignItems: 'center', justifyContent: 'center' },
});

export default Game;
