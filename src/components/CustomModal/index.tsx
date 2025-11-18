import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

export const CustomModal = ({
  visible,
  onClose,
  type = 'center',
  children,
  modalHeight,
}: any) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // for bottom sheet
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // for center modal scale
  const opacityAnim = useRef(new Animated.Value(0)).current; // backdrop opacity

  const isBottomSheet = type === 'bottomsheet';

  // RESET animation values before each open
  useEffect(() => {
    if (visible) {
      slideAnim.setValue(height); // reset bottomsheet position
      scaleAnim.setValue(0.8); // reset center scale
      opacityAnim.setValue(0);
    }

    if (visible) {
      // OPEN animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        isBottomSheet
          ? Animated.timing(slideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            })
          : Animated.spring(scaleAnim, {
              toValue: 1,
              friction: 6,
              useNativeDriver: true,
            }),
      ]).start();
    } else {
      // CLOSE animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        isBottomSheet
          ? Animated.timing(slideAnim, {
              toValue: height,
              duration: 250,
              useNativeDriver: true,
            })
          : Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: 150,
              useNativeDriver: true,
            }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.container}>
        {/* BACKDROP */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
        </TouchableWithoutFeedback>

        {/* CONTENT */}
        {isBottomSheet ? (
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }], height: modalHeight },
            ]}
          >
            {children}
          </Animated.View>
        ) : (
          <Animated.View
            style={[styles.centerModal, { transform: [{ scale: scaleAnim }] }]}
          >
            {children}
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  centerModal: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 15,
  },
});
