// src/screens/SettingsScreen.js

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/colors';
import { 
  DRYWALL_THICKNESS_OPTIONS, 
  STUD_SPACING_OPTIONS,
  WASTE_FACTOR_PRESETS 
} from '../constants/dimensions';

const SettingsScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.text}>
          Drywall T-Square Calc is a professional calculator for estimating drywall materials 
          needed for construction projects. Built for contractors, DIY enthusiasts, and construction professionals.
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drywall Thickness Guide</Text>
        {DRYWALL_THICKNESS_OPTIONS.map((option, index) => (
          <View key={index} style={styles.infoCard}>
            <Text style={styles.infoLabel}>{option.label}</Text>
            <Text style={styles.infoDescription}>{option.usage}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stud Spacing Guide</Text>
        {STUD_SPACING_OPTIONS.map((option, index) => (
          <View key={index} style={styles.infoCard}>
            <Text style={styles.infoLabel}>{option.label}</Text>
            <Text style={styles.infoDescription}>{option.usage}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Waste Factor Guide</Text>
        {WASTE_FACTOR_PRESETS.map((preset, index) => (
          <View key={index} style={styles.infoCard}>
            <Text style={styles.infoLabel}>{preset.label}</Text>
            <Text style={styles.infoDescription}>
              {preset.value === 0.05 && 'Simple rectangular rooms with experienced installers'}
              {preset.value === 0.10 && 'Most residential and commercial projects'}
              {preset.value === 0.15 && 'Rooms with multiple doors, windows, or openings'}
              {preset.value === 0.20 && 'Irregular layouts, vaulted ceilings, complex designs'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Use</Text>
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>1. Enter Dimensions</Text>
          <Text style={styles.instructionText}>
            Input room length, width, and height. Accepts formats like:
          </Text>
          <Text style={styles.exampleText}>• 20 (feet)</Text>
          <Text style={styles.exampleText}>• 20'6" (feet and inches)</Text>
          <Text style={styles.exampleText}>• 20' 6" (with space)</Text>
          <Text style={styles.exampleText}>• 246" (inches only)</Text>
        </View>

        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>2. Select Options</Text>
          <Text style={styles.instructionText}>
            Toggle ceiling calculation if needed. Enable stud calculation for framing estimates.
          </Text>
        </View>

        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>3. Choose Waste Factor</Text>
          <Text style={styles.instructionText}>
            Select appropriate waste percentage based on project complexity.
          </Text>
        </View>

        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>4. Calculate</Text>
          <Text style={styles.instructionText}>
            View detailed material requirements including sheets, screws, and joint compound.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Standard Materials</Text>
        <View style={styles.materialCard}>
          <Text style={styles.materialTitle}>Drywall Sheets</Text>
          <Text style={styles.materialText}>Standard: 4' × 8' (32 sq ft)</Text>
          <Text style={styles.materialText}>Large: 4' × 12' (48 sq ft)</Text>
        </View>

        <View style={styles.materialCard}>
          <Text style={styles.materialTitle}>Screws</Text>
          <Text style={styles.materialText}>32 screws per 4×8 sheet</Text>
          <Text style={styles.materialText}>~300 screws per pound</Text>
          <Text style={styles.materialText}>Typical: #6 × 1-5/8"</Text>
        </View>

        <View style={styles.materialCard}>
          <Text style={styles.materialTitle}>Joint Compound</Text>
          <Text style={styles.materialText}>110 sq ft per gallon</Text>
          <Text style={styles.materialText}>Based on 3 coats</Text>
          <Text style={styles.materialText}>Available: 1 gal, 3.5 gal, 5 gal</Text>
        </View>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>⚠️ Important Notice</Text>
        <Text style={styles.disclaimerText}>
          This calculator provides estimates only. Actual material requirements may vary based on 
          room layout, openings (doors/windows), installation method, and installer experience. 
          Always consult with your material supplier and verify calculations before purchasing materials.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Drywall T-Square Calc
        </Text>
        <Text style={styles.footerText}>
          Professional Construction Calculator
        </Text>
      </View>

      <View style={styles.bottomSpacer} />
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  version: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoLabel: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  infoDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  instructionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  instructionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  instructionText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.xs,
  },
  exampleText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
    marginLeft: SPACING.md,
    lineHeight: 20,
  },
  materialCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  materialTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  materialText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  disclaimer: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#FFE69C',
    marginBottom: SPACING.md,
  },
  disclaimerTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: SPACING.xs,
  },
  disclaimerText: {
    fontSize: FONT_SIZES.small,
    color: '#856404',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});

export default SettingsScreen;
