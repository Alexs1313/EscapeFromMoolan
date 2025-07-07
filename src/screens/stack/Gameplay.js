import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import levels from '../../data/levels';
import GameBoard from '../../components/GameBoard';
import { useStore } from '../../store/context';
import CustomModal from '../../components/CustomModal';
import GameOverAlert from '../../components/GameOverAlert';
import { useFocusEffect } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

export default function Gameplay({ route }) {
  const [restartKey, setRestartKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const intervalRef = useRef();
  const selectedLevel = route.params;
  const {
    gameLevels,
    setGameLevels,
    setEarnedCoins,
    earnedCoins,
    collectedCoins,
    setCollectedCoins,
    saveLevels,
    saveEarnedCoins,
  } = useStore();
  const [level, setLevel] = useState(selectedLevel);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);

      handleGameOver();
    }
  }, [timeLeft]);

  const handleGameOver = () => {
    setIsVisibleAlert(true);
    clearInterval(intervalRef.current);
    setCollectedCoins([]);
  };

  const handleVictory = () => {
    const unlockLevel = gameLevels.map((lvl, idx) => {
      if (idx === level + 1) {
        return { ...lvl, unlocked: true };
      }
      return lvl;
    });
    setGameLevels(unlockLevel);
    saveLevels(unlockLevel);
    clearInterval(intervalRef.current);

    if (level < levels.length - 1) {
      setLevel(level + 1);
      setRestartKey(restartKey + 1);
      setIsVisibleModal(true);
      setEarnedCoins(earnedCoins + collectedCoins.length + 10);
      saveEarnedCoins(earnedCoins + collectedCoins.length + 10);
    } else {
      setLevel(0);
      setRestartKey(restartKey + 1);
      setIsVisibleModal(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      {isVisibleModal && (
        <BlurView style={styles.blurBg} blurType="dark" blurAmount={1} />
      )}
      {isVisibleAlert && (
        <BlurView style={styles.blurBg} blurType="dark" blurAmount={1} />
      )}
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Level {level + 1}</Text>
          <Text style={styles.title}>
            {minutes}:{seconds}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/lion.png')}
            style={styles.lionImg}
          />
          <View style={styles.boardWrap}>
            <GameBoard
              key={restartKey}
              levelData={gameLevels[level]}
              onGameOver={handleGameOver}
              onVictory={handleVictory}
            />
          </View>
        </View>
        {isVisibleModal && (
          <CustomModal
            collectedCoins={collectedCoins}
            setRestartKey={setRestartKey}
            restartKey={restartKey}
            level={level}
            setLevel={setLevel}
            setIsVisibleModal={setIsVisibleModal}
            setTimeLeft={setTimeLeft}
          />
        )}
        {isVisibleAlert && (
          <GameOverAlert
            collectedCoins={collectedCoins}
            setIsVisibleAlert={setIsVisibleAlert}
            setRestartKey={setRestartKey}
            restartKey={restartKey}
            setTimeLeft={setTimeLeft}
            level={level}
            setLevel={setLevel}
          />
        )}
      </View>
    </ImageBackground>
  );
}

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
    color: '#fff',
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  boardWrap: { position: 'absolute', top: 210 },
});
