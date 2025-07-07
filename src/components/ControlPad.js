import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ControlPad = ({ onMove }) => (
  <View style={styles.pad}>
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() => onMove(0, -1)}
      >
        <Image source={require('../assets/components/up.png')} />
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() => onMove(-1, 0)}
      >
        <Image source={require('../assets/components/left.png')} />
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={() => onMove(0, 1)}
        >
          <Image source={require('../assets/components/down.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btn}
        onPress={() => onMove(1, 0)}
      >
        <Image source={require('../assets/components/right.png')} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  pad: { alignItems: 'center', margin: 16 },
  row: { flexDirection: 'row' },
  btn: {
    width: 48,
    height: 48,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default ControlPad;
