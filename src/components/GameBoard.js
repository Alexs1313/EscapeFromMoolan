import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ControlPad from './ControlPad';
import {
  ROAD_IMG,
  BRICK_IMG,
  TRAP_IMG,
  COIN_IMG,
  DOOR_IMG,
} from '../data/images';
import { useStore } from '../store/context';

const CELL_SIZE = 34;
const GRID_SIZE = 10;

function GameBoard({ levelData, onGameOver, onVictory }) {
  const { manStart, road, traps, coins, door } = levelData;
  const [man, setMan] = useState({ ...manStart });
  const { collectedCoins, setCollectedCoins, skins } = useStore();

  const selectedSkin = skins.find(skin => skin.equipped);

  const isRoad = (x, y) => road.some(r => r.x === x && r.y === y);

  const moveMan = (dx, dy) => {
    const nx = man.x + dx,
      ny = man.y + dy;
    if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) return;
    if (!isRoad(nx, ny) && !(nx === door.x && ny === door.y)) return;

    if (traps.some(t => t.x === nx && t.y === ny)) {
      onGameOver();
      return;
    }

    setMan({ x: nx, y: ny });

    coins.forEach((c, i) => {
      if (c.x === nx && c.y === ny && !collectedCoins.includes(i)) {
        setCollectedCoins([...collectedCoins, i]);
      }
    });

    if (nx === door.x && ny === door.y) {
      onVictory();
    }
  };

  const renderCell = (x, y) => {
    const isOnRoad = isRoad(x, y) || (x === door.x && y === door.y);
    const background = isOnRoad ? ROAD_IMG : BRICK_IMG;

    let foreground = null;
    if (x === man.x && y === man.y) foreground = selectedSkin.image;
    else if (
      coins.some(
        (c, i) => c.x === x && c.y === y && !collectedCoins.includes(i),
      )
    )
      foreground = COIN_IMG;
    else if (traps.some(t => t.x === x && t.y === y)) foreground = TRAP_IMG;

    const showDoor = x === door.x && y === door.y;

    return (
      <View
        key={`${x},${y}`}
        style={{ width: CELL_SIZE, height: CELL_SIZE, position: 'relative' }}
      >
        <Image source={background} style={styles.cellImg} />
        {showDoor && (
          <Image source={DOOR_IMG} style={[styles.cellImg, styles.doorImg]} />
        )}
        {foreground && (
          <Image
            source={foreground}
            style={[styles.cellImg, styles.foregroundImg]}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.grid}>
        {[...Array(GRID_SIZE)].map((_, y) => (
          <View key={y} style={{ flexDirection: 'row' }}>
            {[...Array(GRID_SIZE)].map((_, x) => renderCell(x, y))}
          </View>
        ))}
      </View>
      <ControlPad onMove={moveMan} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    marginBottom: 10,
  },
  cellImg: { width: CELL_SIZE, height: CELL_SIZE, position: 'absolute' },
  doorImg: { zIndex: 2 },
  foregroundImg: { zIndex: 3 },
});

export default GameBoard;
