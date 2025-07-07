import { createContext, useContext, useState } from 'react';
import levels from '../data/levels';
import { shopSkins } from '../data/shopSkins';
import { shopStories } from '../data/shopStories';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [gameLevels, setGameLevels] = useState(levels);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [collectedCoins, setCollectedCoins] = useState([]);
  const [skins, setSkins] = useState(shopSkins);
  const [stories, setStories] = useState(shopStories);

  // levels

  const saveLevels = async data => {
    try {
      await AsyncStorage.setItem('levels', JSON.stringify(data));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getLevels = async () => {
    try {
      const savedData = await AsyncStorage.getItem('levels');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setGameLevels(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // coins

  const saveEarnedCoins = async coins => {
    try {
      await AsyncStorage.setItem('coins', JSON.stringify(coins));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getEarnedCoins = async () => {
    try {
      const savedData = await AsyncStorage.getItem('coins');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setEarnedCoins(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // inventory

  const saveInventory = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getInventory = async key => {
    try {
      const savedData = await AsyncStorage.getItem(key);
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        key === 'Skin' ? setSkins(parsed) : setStories(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    gameLevels,
    setGameLevels,
    earnedCoins,
    setEarnedCoins,
    collectedCoins,
    setCollectedCoins,
    skins,
    setSkins,
    stories,
    setStories,
    saveLevels,
    getLevels,
    saveEarnedCoins,
    getEarnedCoins,
    saveInventory,
    getInventory,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
