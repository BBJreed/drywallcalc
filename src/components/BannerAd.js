// src/components/BannerAd.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { AD_UNITS } from '../utils/admob';

const BannerAdComponent = () => {
  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={AD_UNITS.banner}
        servePersonalizedAds // true by default
        onDidFailToReceiveAdWithError={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default BannerAdComponent;
