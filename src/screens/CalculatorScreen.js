// src/screens/CalculatorScreen.js

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Switch,
  Alert
} from 'react-native';
import InputField from '../components/InputField';
import BannerAdComponent from '../components/BannerAd';
import { COLORS, SPACING, FONT_SIZES } from '../constants/colors';
import { WASTE_FACTOR_PRESETS } from '../constants/dimensions';
import { validateRoomDimensions, sanitizeInput } from '../utils/validation';
import { calculateAllMaterials } from '../utils/calculations';

const CalculatorScreen = ({ navigation }) => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [includeStuds, setIncludeStuds] = useState(false);
  const [wasteFactor, setWasteFactor] = useState('0.10');
  const [errors, setErrors] = useState({});

  const handleInputChange = (setter, value) => {
    const sanitized = sanitizeInput(value);
    setter(sanitized);
    
    // Clear error for this field when user types
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[setter.name];
      return newErrors;
    });
  };

  const validateInputs = () => {
    const validation = validateRoomDimensions(length, width, height);
    
    if (!validation.valid) {
      const newErrors = {};
      validation.errors.forEach(error => {
        if (error.includes('Length')) newErrors.length = error;
        if (error.includes('Width')) newErrors.width = error;
        if (error.includes('Height')) newErrors.height = error;
      });
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      Alert.alert('Invalid Input', 'Please correct the errors before calculating.');
      return;
    }

    try {
      const results = calculateAllMaterials(length, width, height, {
        includeCeiling,
        wasteFactor: parseFloat(wasteFactor),
        includeStuds
      });

      navigation.navigate('Results', { results });
    } catch (error) {
      Alert.alert('Calculation Error', error.message);
    }
  };

  const selectWasteFactor = (value) => {
    setWasteFactor(value.toString());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Drywall Calculator</Text>
      <Text style={styles.subtitle}>Enter room dimensions to calculate materials</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Room Dimensions</Text>
        
        <InputField
          label="Length"
          value={length}
          onChangeText={(val) => handleInputChange(setLength, val)}
          placeholder="e.g., 20 or 20'6\""
          error={errors.length}
          helperText="Enter in feet or feet and inches"
          keyboardType="default"
        />

        <InputField
          label="Width"
          value={width}
          onChangeText={(val) => handleInputChange(setWidth, val)}
          placeholder="e.g., 15 or 15'3\""
          error={errors.width}
          helperText="Enter in feet or feet and inches"
          keyboardType="default"
        />

        <InputField
          label="Height"
          value={height}
          onChangeText={(val) => handleInputChange(setHeight, val)}
          placeholder="e.g., 8 or 8'0\""
          error={errors.height}
          helperText="Enter in feet or feet and inches"
          keyboardType="default"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options</Text>
        
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Include Ceiling</Text>
          <Switch
            value={includeCeiling}
            onValueChange={setIncludeCeiling}
            trackColor={{ false: COLORS.disabled, true: COLORS.primaryLight }}
            thumbColor={includeCeiling ? COLORS.primary : COLORS.surface}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Include Stud Calculation</Text>
          <Switch
            value={includeStuds}
            onValueChange={setIncludeStuds}
            trackColor={{ false: COLORS.disabled, true: COLORS.primaryLight }}
            thumbColor={includeStuds ? COLORS.primary : COLORS.surface}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Waste Factor</Text>
        <View style={styles.wasteFactorGrid}>
          {WASTE_FACTOR_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.value}
              style={[
                styles.wasteFactorButton,
                parseFloat(wasteFactor) === preset.value && styles.wasteFactorButtonActive
              ]}
              onPress={() => selectWasteFactor(preset.value)}
            >
              <Text style={[
                styles.wasteFactorText,
                parseFloat(wasteFactor) === preset.value && styles.wasteFactorTextActive
              ]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.calculateButton}
        onPress={handleCalculate}
        activeOpacity={0.8}
      >
        <Text style={styles.calculateButtonText}>Calculate Materials</Text>
      </TouchableOpacity>

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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  switchLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  wasteFactorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  wasteFactorButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  wasteFactorButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  wasteFactorText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    fontWeight: '500',
  },
  wasteFactorTextActive: {
    color: COLORS.surface,
    fontWeight: 'bold',
  },
  calculateButton: {
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
  calculateButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: SPACING.xl,
  },
});

export default CalculatorScreen;
