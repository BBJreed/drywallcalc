import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

export const initializeAdMob = async () => {
  try {
    await mobileAds().initialize();
    
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
    
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('AdMob initialization error:', error);
  }
};

// Production ad unit IDs
export const AD_UNITS = {
  banner: 'ca-app-pub-9150671970123251/4098024283',
  interstitial: 'ca-app-pub-9150671970123251/6292304545',
};
