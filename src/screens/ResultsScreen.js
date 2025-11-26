// src/screens/ResultsScreen.js

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import ResultCard from '../components/ResultCard';
import { useInterstitialAd } from '../hooks/useInterstitialAd';
import BannerAdComponent from '../components/BannerAd';
import { COLORS, SPACING, FONT_SIZES } from '../constants/colors';

const ResultsScreen = ({ route, navigation }) => {
  const { results } = route.params;
  const { showAd } = useInterstitialAd();

  React.useEffect(() => {
    // Show ad after 2 seconds delay so user can see results first
    const timer = setTimeout(() => {
      showAd();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNewCalculation = () => {
    navigation.goBack();
  };

  const formatDimension = (feet) => {
    const wholeFeet = Math.floor(feet);
    const inches = Math.round((feet - wholeFeet) * 12);
    return inches > 0 ? `${wholeFeet}' ${inches}"` : `${wholeFeet}'`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Material Estimate</Text>
      <Text style={styles.subtitle}>
        Room: {formatDimension(results.dimensions.length)} × {formatDimension(results.dimensions.width)} × {formatDimension(results.dimensions.height)}
      </Text>

      <ResultCard
        title="Square Footage"
        items={[
          { 
            label: 'Wall Area', 
            value: `${results.squareFootage.wallArea} sq ft` 
          },
          ...(results.squareFootage.ceilingArea > 0 ? [{
            label: 'Ceiling Area',
            value: `${results.squareFootage.ceilingArea} sq ft`
          }] : []),
          { 
            label: 'Total Area', 
            value: `${results.squareFootage.totalArea} sq ft`,
            emphasis: true
          }
        ]}
      />

      <ResultCard
        title="Drywall Sheets"
        highlight={true}
        items={[
          { 
            label: 'Sheets Needed', 
            value: results.drywall.sheetsNeeded.toString(),
            emphasis: true
          },
          { 
            label: 'Sheet Size', 
            value: `4' × 8' (${results.drywall.sheetArea} sq ft)` 
          },
          { 
            label: 'Total Coverage', 
            value: `${results.drywall.totalCoverage} sq ft` 
          },
          { 
            label: 'Waste Factor', 
            value: `${results.drywall.wastePercentage}%` 
          },
          { 
            label: 'Waste Amount', 
            value: `${results.drywall.wasteAmount} sq ft` 
          }
        ]}
      />

      <ResultCard
        title="Drywall Screws"
        items={[
          { 
            label: 'Total Screws', 
            value: results.screws.totalScrews.toString(),
            emphasis: true
          },
          { 
            label: 'Pounds Needed', 
            value: `${results.screws.poundsNeeded} lb` 
          },
          { 
            label: 'Screws Per Sheet', 
            value: '32' 
          }
        ]}
      />

      <ResultCard
        title="Joint Compound (Mud)"
        items={[
          { 
            label: 'Total Gallons', 
            value: `${results.mud.totalGallons} gal`,
            emphasis: true
          },
          { 
            label: 'Container Breakdown', 
            value: results.mud.containerBreakdown 
          },
          { 
            label: 'Coverage Rate', 
            value: '110 sq ft/gal (3 coats)' 
          }
        ]}
      />

      {results.studs && (
        <ResultCard
          title="Metal Studs & Track"
          items={[
            { 
              label: 'Vertical Studs', 
              value: results.studs.verticalStuds.toString(),
              emphasis: true
            },
            { 
              label: 'Stud Length', 
              value: `${results.studs.studLength}'` 
            },
            { 
              label: 'Track Length', 
              value: `${results.studs.trackLength}'` 
            },
            { 
              label: 'Spacing', 
              value: `${results.studs.spacing}" OC` 
            }
          ]}
        />
      )}

      <View style={styles.additionalInfo}>
        <Text style={styles.infoTitle}>Additional Items Needed:</Text>
        <Text style={styles.infoText}>• Drywall tape (paper or mesh)</Text>
        <Text style={styles.infoText}>• Corner bead (inside and outside)</Text>
        <Text style={styles.infoText}>• Primer and paint</Text>
        <Text style={styles.infoText}>• Sandpaper or sanding screens</Text>
        {results.studs && (
          <>
            <Text style={styles.infoText}>• Metal stud screws</Text>
            <Text style={styles.infoText}>• Track for top and bottom plates</Text>
          </>
        )}
      </View>

      <TouchableOpacity 
        style={styles.newCalculationButton}
        onPress={handleNewCalculation}
        activeOpacity={0.8}
      >
        <Text style={styles.newCalculationButtonText}>New Calculation</Text>
      </TouchableOpacity>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          These estimates include a {results.drywall.wastePercentage}% waste factor. 
          Actual material needs may vary based on room complexity, openings, and installation method. 
          Always consult with your supplier for specific project requirements.
        </Text>
      </View>

      <View style={styles.bottomSpacer} />
      <BannerAdComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  additionalInfo: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  newCalculationButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  newCalculationButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  disclaimer: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});

export default ResultsScreen;
