// src/utils/validation.js

/**
 * Validates that input is a positive number or valid measurement string
 */
export const isValidMeasurement = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const trimmed = input.trim();
  if (trimmed === '') return false;
  
  // Check for valid measurement patterns
  const patterns = [
    /^\d+(?:\.\d+)?$/,                    // Plain number: 8 or 8.5
    /^\d+(?:\.\d+)?'$/,                   // Feet: 8' or 8.5'
    /^\d+(?:\.\d+)?"$/,                   // Inches: 96" or 96.5"
    /^\d+(?:\.\d+)?'\s*\d+(?:\.\d+)?"$/   // Feet and inches: 8'6" or 8' 6.5"
  ];
  
  return patterns.some(pattern => pattern.test(trimmed));
};

/**
 * Validates room dimensions are within reasonable construction limits
 */
export const validateRoomDimensions = (length, width, height) => {
  const errors = [];
  
  if (!isValidMeasurement(length)) {
    errors.push('Length must be a valid measurement');
  }
  
  if (!isValidMeasurement(width)) {
    errors.push('Width must be a valid measurement');
  }
  
  if (!isValidMeasurement(height)) {
    errors.push('Height must be a valid measurement');
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  // Import normalization function to check actual values
  const { normalizeToFeet } = require('./calculations');
  
  const lengthFt = normalizeToFeet(length);
  const widthFt = normalizeToFeet(width);
  const heightFt = normalizeToFeet(height);
  
  // Check reasonable limits (residential/commercial construction)
  if (lengthFt < 2 || lengthFt > 200) {
    errors.push('Length must be between 2 and 200 feet');
  }
  
  if (widthFt < 2 || widthFt > 200) {
    errors.push('Width must be between 2 and 200 feet');
  }
  
  if (heightFt < 6 || heightFt > 30) {
    errors.push('Height must be between 6 and 30 feet');
  }
  
  return errors.length === 0 
    ? { valid: true, errors: [] }
    : { valid: false, errors };
};

/**
 * Validates waste factor percentage
 */
export const isValidWasteFactor = (factor) => {
  const num = parseFloat(factor);
  return !isNaN(num) && num >= 0 && num <= 0.5; // 0% to 50%
};

/**
 * Validates stud spacing option
 */
export const isValidStudSpacing = (spacing) => {
  const validSpacings = [12, 16, 19.2, 24]; // Common OC spacing in inches
  return validSpacings.includes(parseFloat(spacing));
};

/**
 * Sanitizes user input to prevent injection or formatting issues
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove any characters that aren't numbers, decimal points, feet/inch marks, or spaces
  return input.replace(/[^\d.'" ]/g, '').trim();
};

/**
 * Format error messages for display
 */
export const formatErrorMessage = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) {
    return '';
  }
  
  if (errors.length === 1) {
    return errors[0];
  }
  
  return errors.join('\n');
};
