// src/constants/dimensions.js

export const DRYWALL_DIMENSIONS = {
  STANDARD_SHEET: {
    width: 4,
    length: 8,
    area: 32
  },
  LARGE_SHEET: {
    width: 4,
    length: 12,
    area: 48
  }
};

export const DRYWALL_THICKNESS_OPTIONS = [
  { label: '1/4"', value: 0.25, usage: 'Curved walls, double-layer' },
  { label: '3/8"', value: 0.375, usage: 'Repair, covering' },
  { label: '1/2"', value: 0.5, usage: 'Standard walls/ceilings' },
  { label: '5/8"', value: 0.625, usage: 'Fire-rated, soundproofing' }
];

export const STUD_SPACING_OPTIONS = [
  { label: '12" OC', value: 12, usage: 'Heavy load, commercial' },
  { label: '16" OC', value: 16, usage: 'Standard residential/commercial' },
  { label: '19.2" OC', value: 19.2, usage: 'Engineered systems' },
  { label: '24" OC', value: 24, usage: 'Light load, non-bearing' }
];

export const WASTE_FACTOR_PRESETS = [
  { label: 'Minimal (5%)', value: 0.05 },
  { label: 'Standard (10%)', value: 0.10 },
  { label: 'High (15%)', value: 0.15 },
  { label: 'Complex (20%)', value: 0.20 }
];

export const SCREWS_PER_SHEET = 32; // Standard spacing on 16" OC studs
export const JOINT_COMPOUND_COVERAGE = 110; // Square feet per gallon
