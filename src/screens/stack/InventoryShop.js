import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';

import { useStore } from '../../store/context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const InventoryShop = ({ title }) => {
  const {
    earnedCoins,
    skins,
    setSkins,
    stories,
    setStories,
    setEarnedCoins,
    getEarnedCoins,
    saveInventory,
    getInventory,
    saveEarnedCoins,
  } = useStore();
  const [index, setIndex] = useState(0);
  const [showStoryDetails, setShowStoryDetails] = useState(0);
  const [selectedStory, setSelectedStory] = useState(0);

  const purchasedSkins = skins.filter(skin => skin.unlocked);

  const purchasedStories = stories.filter(story => story.unlocked);

  let selectedSkins = [];
  let selectedStories = [];

  title === 'Shop'
    ? (selectedSkins = skins)
    : (selectedStories = purchasedStories);
  title === 'Inventory'
    ? (selectedSkins = purchasedSkins)
    : (selectedStories = stories);

  useFocusEffect(
    useCallback(() => {
      getEarnedCoins();

      getInventory('Skin');
      getInventory('Story');
    }, []),
  );

  const handleUnlockSkin = selectedIdx => {
    if (skins[selectedIdx].coins <= earnedCoins) {
      const isUnlockedSkin = skins.map((skin, idx) => {
        if (idx === selectedIdx) {
          return { ...skin, unlocked: true };
        }
        return skin;
      });
      setSkins(isUnlockedSkin);
      saveInventory('Skin', isUnlockedSkin);
    }
    const coinsLimit =
      earnedCoins < 10 || earnedCoins < skins[selectedIdx].coins;

    if (coinsLimit) return;
    else {
      setEarnedCoins(earnedCoins - skins[selectedIdx].coins);
      saveEarnedCoins(earnedCoins - skins[selectedIdx].coins);
    }
  };

  const handleSelectSkin = selectedIdx => {
    if (!skins[selectedIdx].equipped) {
      const isEquippedSkin = skins.map((skin, idx) => {
        if (idx === selectedIdx) {
          return { ...skin, equipped: true };
        }
        return { ...skin, equipped: false };
      });
      setSkins(isEquippedSkin);
      saveInventory('Skin', isEquippedSkin);
    }
  };

  const handleUnlockStory = selectedIdx => {
    if (stories[selectedIdx].coins <= earnedCoins) {
      const isUnlockedStory = stories.map((story, idx) => {
        if (idx === selectedIdx) {
          return { ...story, unlocked: true };
        }
        return story;
      });
      setStories(isUnlockedStory);
      saveInventory('Story', isUnlockedStory);
    }
    if (earnedCoins < 30) return;
    else setEarnedCoins(earnedCoins - 30), saveEarnedCoins(earnedCoins - 30);
  };

  const handleShowDetails = selectedIdx => {
    setShowStoryDetails(true);
    setSelectedStory(selectedIdx);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${stories[selectedStory].story}
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {showStoryDetails
              ? 'Reading'
              : title === 'Shop'
              ? 'Shop'
              : 'Inventory'}
          </Text>

          <View style={styles.coinsContainer}>
            <Image source={require('../../assets/components/coin.png')} />
            <Text style={styles.quantity}>+{earnedCoins}</Text>
          </View>

          {showStoryDetails ? (
            <View style={styles.detailsWrap}>
              <View>
                <Image
                  source={require('../../assets/components/readingBg.png')}
                />
                <Text style={styles.storyText}>
                  {stories[selectedStory].story}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.shareButton}
                  onPress={() => handleShare()}
                >
                  <Image
                    source={require('../../assets/components/shopBtn.png')}
                  />

                  <View style={styles.quantityWrapper}>
                    <Text style={styles.quantityText}>Share</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.backButton}
                  onPress={() => setShowStoryDetails(false)}
                >
                  <View style={styles.quantityWrapper}>
                    <Text style={[styles.quantityText, { color: '#76520B' }]}>
                      Back
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{}}>
              <View style={styles.buttonsWrap}>
                <TouchableOpacity onPress={() => setIndex(0)}>
                  <Text
                    style={[
                      styles.btnText,
                      index === 0 && { color: '#76520B' },
                    ]}
                  >
                    Skins
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(1)}>
                  <Text
                    style={[
                      styles.btnText,
                      index === 1 && { color: '#76520B' },
                    ]}
                  >
                    Stories
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {index === 0 && (
                  <View style={styles.skinsWrap}>
                    {selectedSkins.map((skin, idx) => (
                      <View style={{ alignItems: 'center' }} key={idx}>
                        <Image
                          source={require('../../assets/components/skinBg.png')}
                        />
                        <Image source={skin.image} style={styles.skinImg} />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          disabled={title === 'Inventory'}
                          style={styles.button}
                          onPress={() =>
                            !skin.unlocked
                              ? handleUnlockSkin(idx)
                              : handleSelectSkin(idx)
                          }
                        >
                          <Image
                            source={require('../../assets/components/shopBtn.png')}
                          />

                          {!skin.unlocked && (
                            <View style={styles.quantityWrapper}>
                              <Image
                                source={require('../../assets/components/coin.png')}
                              />
                              <Text style={styles.quantityText}>
                                {skin.coins}
                              </Text>
                            </View>
                          )}

                          {skin.unlocked && (
                            <View style={styles.quantityWrapper}>
                              {!skin.equipped && (
                                <View>
                                  <Text style={styles.quantityText}>equip</Text>
                                </View>
                              )}
                            </View>
                          )}

                          <View style={styles.quantityWrapper}>
                            {skin.equipped && (
                              <View>
                                <Text style={styles.quantityText}>
                                  equipped
                                </Text>
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {index === 1 && (
                <View style={styles.storiesWrap}>
                  {selectedStories.map((story, idx) => (
                    <View style={{}} key={idx}>
                      <Image
                        source={require('../../assets/components/storyBg.png')}
                      />

                      <Text style={styles.stotyTitle}>{story.title}</Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.storyButton}
                        onPress={() =>
                          story.unlocked
                            ? handleShowDetails(idx)
                            : handleUnlockStory(idx)
                        }
                      >
                        <Image
                          source={require('../../assets/components/shopBtn.png')}
                        />

                        {!story.unlocked && (
                          <View style={styles.quantityWrapper}>
                            <Image
                              source={require('../../assets/components/coin.png')}
                            />
                            <Text style={styles.quantityText}>30</Text>
                          </View>
                        )}

                        {story.unlocked && (
                          <View style={styles.quantityWrapper}>
                            <View>
                              <Text style={styles.quantityText}>Read</Text>
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.065,
    paddingHorizontal: 20,
    paddingBottom: height * 0.28,
  },
  title: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 12,
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 61,
    marginTop: 21,
  },
  quantity: {
    fontFamily: 'Moul-Regular',
    fontSize: 24,
    color: '#000000',
  },
  detailsWrap: { alignItems: 'center', marginTop: 25 },
  skinsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
    gap: 5,
  },
  storiesWrap: {
    marginTop: 22,
    gap: 11,
    alignItems: 'center',
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
    position: 'absolute',
    right: 27,
    top: height * 0.06,
  },
  btnText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 24,
    color: '#fff',
  },
  stotyTitle: {
    fontFamily: 'Lobster-Regular',
    fontSize: 18,
    color: '#000000',
    position: 'absolute',
    left: 22,
    top: 28,
  },
  skinImg: {
    position: 'absolute',
    top: 6,
  },
  button: {
    position: 'absolute',
    top: 115,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    bottom: 27,
    left: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 47,
    right: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyButton: {
    position: 'absolute',
    top: 71,
    left: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    gap: 5,
  },
  quantityText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 16,
    color: '#000',
  },
  storyText: {
    fontFamily: 'Lobster-Regular',
    fontSize: 18,
    color: '#000000',
    position: 'absolute',
    left: 18,
    top: 28,
    textAlign: 'center',
    lineHeight: 28,
    width: 300,
  },
});

export default InventoryShop;
