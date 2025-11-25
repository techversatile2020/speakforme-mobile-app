import React, { useEffect, useRef, useState } from 'react';
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
  const slideAnim = useRef(new Animated.Value(height)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const isBottomSheet = type === 'bottomsheet';

  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    // FIX: Stop any animation already running
    slideAnim.stopAnimation();
    scaleAnim.stopAnimation();
    opacityAnim.stopAnimation();

    if (visible) {
      // Reset animations before opening
      slideAnim.setValue(height);
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);

      // OPEN ANIMATION
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 300, // slow fade in
          useNativeDriver: true,
        }),
        isBottomSheet
          ? Animated.timing(slideAnim, {
              toValue: 0,
              duration: 450, // slow slide up
              useNativeDriver: true,
            })
          : Animated.spring(scaleAnim, {
              toValue: 1,
              friction: 8, // smoother & slower
              useNativeDriver: true,
            }),
      ]).start();
    } else {
      // CLOSE ANIMATION
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300, // slow fade out
          useNativeDriver: true,
        }),
        isBottomSheet
          ? Animated.timing(slideAnim, {
              toValue: height,
              duration: 400, // slow slide down
              useNativeDriver: true,
            })
          : Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: 300, // slow scale down
              useNativeDriver: true,
            }),
      ]).start(() => {
        // Unmount after close animation
        setIsMounted(false);
      });
    }
  }, [visible]);

  if (!isMounted) return null;

  return (
    <Modal
      visible
      transparent
      // animationType="slide"
      // presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
        </TouchableWithoutFeedback>

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
