// src/components/ResultCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/colors';

const ResultCard = ({ title, items, highlight = false }) => {
  return (
    <View style={[styles.card, highlight && styles.cardHighlight]}>
      <Text style={styles.cardTitle}>{title}</Text>
      
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={[
              styles.itemValue,
              item.emphasis && styles.itemValueEmphasis
            ]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHighlight: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  itemsContainer: {
    gap: SPACING.xs,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  itemLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    flex: 1,
  },
  itemValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'right',
  },
  itemValueEmphasis: {
    fontSize: FONT_SIZES.large,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default ResultCard;
