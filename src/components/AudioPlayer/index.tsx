import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { Image } from '../Image';
import { Icons } from '../../assets';
import { SD } from '../../utils';

Sound.setCategory('Playback');

export const AudioPlayer = ({ url, isLoading, setIsLoading }: any) => {
  const soundRef = useRef<Sound | null>(null);
  const intervalRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // ───────────────────────────────────────────────
  // Load Sound on Mount
  // ───────────────────────────────────────────────

  useEffect(() => {
    console.log('AUDIO URL => ', url);

    const sound = new Sound(url, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('Audio Load Error:', err);
        return;
      }
      setDuration(sound.getDuration());
      if (sound.isLoaded()) {
        setIsLoading(false);
      }
    });

    soundRef.current = sound;

    return () => {
      stopTracking();
      sound.release();
    };
  }, [url]);

  // ───────────────────────────────────────────────
  // Progress Tracking Timer
  // ───────────────────────────────────────────────
  const startTracking = () => {
    stopTracking();
    intervalRef.current = setInterval(() => {
      if (!soundRef.current) return;
      soundRef.current.getCurrentTime(sec => setPosition(sec));
    }, 200);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // ───────────────────────────────────────────────
  // Play / Pause
  // ───────────────────────────────────────────────
  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
      stopTracking();
    } else {
      soundRef.current.play(success => {
        if (success) {
          setIsPlaying(false);
          setPosition(0);
          stopTracking();
        }
      });
      setIsPlaying(true);
      startTracking();
    }
  };

  // ───────────────────────────────────────────────
  // Seek (Slider)
  // ───────────────────────────────────────────────
  const seek = (value: number) => {
    soundRef.current?.setCurrentTime(value);
    setPosition(value);
  };

  return (
    <View
      style={{
        width: '100%',
        padding: SD.wp(15),
        borderWidth: 1,
        borderRadius: 35,
        flexDirection: 'row',
        alignItems: 'center',
        height: SD.hp(48),
      }}
    >
      {/* Play / Pause */}
      <TouchableOpacity onPress={togglePlay}>
        <Image source={isPlaying ? Icons.pause : Icons.play} size={18} />
      </TouchableOpacity>

      {/* Time Indicator */}
      <Text style={{ marginHorizontal: 10 }}>
        {format(position)} / {format(duration)}
      </Text>

      {/* Slider */}
      <Slider
        style={{ flex: 1 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seek}
      />

      <Pressable style={{ marginLeft: SD.wp(10) }}>
        <Image source={Icons.volume} size={18} />
      </Pressable>
    </View>
  );
};

// ───────────────────────────────────────────────
// Format Seconds to mm:ss
// ───────────────────────────────────────────────
const format = (sec: number) => {
  if (!sec) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
};
