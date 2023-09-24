import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated,Text } from 'react-native';

const SwipeUpAnimation = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        { dy: pan.y },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy < 0) {
        Animated.spring(pan, {
          toValue: { x: 0, y: -400 },
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.boxContent}>
          <View style={styles.handleBar} >
          </View>
          {props.children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
    bottom: -420,
  },
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
   handleBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#aaa',
  },
});

export default SwipeUpAnimation;
