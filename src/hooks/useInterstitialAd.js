// src/hooks/useInterstitialAd.js

import { useEffect, useState } from 'react';
import { AdMobInterstitial } from 'expo-ads-admob';
import { AD_UNITS } from '../utils/admob';



export const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prepareAd = async () => {
      await AdMobInterstitial.setAdUnitID(AD_UNITS.interstitial);
      AdMobInterstitial.addEventListener('interstitialDidLoad', () => setLoaded(true));
      AdMobInterstitial.addEventListener('interstitialDidClose', () => {
        setLoaded(false);
        AdMobInterstitial.requestAdAsync().catch(() => {});
      });
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    };
    prepareAd();
    return () => {
      AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const showAd = async () => {
    if (loaded) {
      await AdMobInterstitial.showAdAsync();
    }
  };

  return { showAd, loaded };
};
