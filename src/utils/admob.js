// src/utils/admob.js


import { setTestDeviceIDAsync, AdMobBanner, AdMobInterstitial, AdMobRewarded, AdMobRewardedAdEventType } from 'expo-ads-admob';

// Optionally call this during app startup if you want to set test devices
export const initializeAdMob = async () => {
  try {
    await setTestDeviceIDAsync('EMULATOR');
    console.log('AdMob initialized (expo-ads-admob)');
  } catch (error) {
    console.error('AdMob initialization error:', error);
  }
};

// Production ad unit IDs
export const AD_UNITS = {
  banner: 'ca-app-pub-9150671970123251/4098024283',
  interstitial: 'ca-app-pub-9150671970123251/6292304545',
};
