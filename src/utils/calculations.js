// src/utils/calculations.js

/**
 * Converts various measurement inputs to decimal feet
 * Handles inputs like "8'6\"", "8.5", "102" (inches), "8' 6.5\""
 */
export const normalizeToFeet = (input) => {
  if (!input || input.trim() === '') return 0;
  
  const str = input.trim();
  
  // Check for feet and inches format (8'6" or 8' 6")
  const feetInchesMatch = str.match(/^(\d+(?:\.\d+)?)'?\s*(\d+(?:\.\d+)?)"?$/);
  if (feetInchesMatch) {
    const feet = parseFloat(feetInchesMatch[1]);
    const inches = parseFloat(feetInchesMatch[2]);
    return feet + (inches / 12);
  }
  
  // Check for feet only (8' or 8)
  const feetOnlyMatch = str.match(/^(\d+(?:\.\d+)?)'?$/);
  if (feetOnlyMatch) {
    return parseFloat(feetOnlyMatch[1]);
  }
  
  // Check for inches only (102" or just large number > 20)
  const inchesMatch = str.match(/^(\d+(?:\.\d+)?)"$/);
  if (inchesMatch) {
    return parseFloat(inchesMatch[1]) / 12;
  }
  
  // Plain number - if greater than 20, assume inches, else feet
  const plainNumber = parseFloat(str);
  if (!isNaN(plainNumber)) {
    return plainNumber > 20 ? plainNumber / 12 : plainNumber;
  }
  
  return 0;
};

/**
 * Calculate total square footage including ceiling if specified
 */
export const calculateSquareFootage = (length, width, height, includeCeiling = false) => {
  const lengthFt = normalizeToFeet(length);
  const widthFt = normalizeToFeet(width);
  const heightFt = normalizeToFeet(height);
  
  if (lengthFt <= 0 || widthFt <= 0 || heightFt <= 0) {
    throw new Error('All dimensions must be positive values');
  }
  
  // Calculate wall area (all four walls)
  const wallArea = 2 * (lengthFt * heightFt) + 2 * (widthFt * heightFt);
  
  // Add ceiling if needed
  const ceilingArea = includeCeiling ? (lengthFt * widthFt) : 0;
  
  return {
    wallArea: Math.round(wallArea * 100) / 100,
    ceilingArea: Math.round(ceilingArea * 100) / 100,
    totalArea: Math.round((wallArea + ceilingArea) * 100) / 100
  };
};

/**
 * Calculate drywall sheets needed with waste factor
 * Standard sheet is 4ft x 8ft = 32 sq ft
 */
export const calculateDrywallSheets = (totalSquareFeet, wasteFactor = 0.10, sheetWidth = 4, sheetLength = 8) => {
  if (totalSquareFeet <= 0) {
    throw new Error('Total square footage must be positive');
  }
  
  const sheetArea = sheetWidth * sheetLength;
  const areaWithWaste = totalSquareFeet * (1 + wasteFactor);
  const sheetsNeeded = Math.ceil(areaWithWaste / sheetArea);
  
  return {
    sheetsNeeded,
    sheetArea,
    totalCoverage: sheetsNeeded * sheetArea,
    wasteAmount: Math.round((sheetsNeeded * sheetArea - totalSquareFeet) * 100) / 100,
    wastePercentage: Math.round(wasteFactor * 100)
  };
};

/**
 * Calculate screws needed based on drywall area
 * Standard: 32 screws per 4x8 sheet (one screw every 12 inches on studs 16" OC)
 */
export const calculateScrews = (numberOfSheets, screwsPerSheet = 32) => {
  const totalScrews = numberOfSheets * screwsPerSheet;
  
  // Screws typically sold in boxes of 1lb (approximately 300 screws for #6 x 1-5/8")
  const screwsPerPound = 300;
  const poundsNeeded = Math.ceil(totalScrews / screwsPerPound);
  
  return {
    totalScrews,
    poundsNeeded,
    boxesNeeded: poundsNeeded // Typically sold by pound
  };
};

/**
 * Calculate joint compound (mud) needed
 * Rule of thumb: 1 gallon covers approximately 100-120 sq ft for 3 coats
 */
export const calculateJointCompound = (totalSquareFeet) => {
  const coveragePerGallon = 110; // Middle estimate
  const gallonsNeeded = Math.ceil(totalSquareFeet / coveragePerGallon);
  
  // Convert to standard container sizes (1 gal, 3.5 gal, 5 gal buckets)
  let containers = [];
  let remaining = gallonsNeeded;
  
  const fiveGalBuckets = Math.floor(remaining / 5);
  remaining = remaining % 5;
  
  const threeGalBuckets = Math.floor(remaining / 3.5);
  remaining = remaining % 3.5;
  
  const oneGalBuckets = Math.ceil(remaining);
  
  if (fiveGalBuckets > 0) containers.push(`${fiveGalBuckets} five-gallon bucket${fiveGalBuckets > 1 ? 's' : ''}`);
  if (threeGalBuckets > 0) containers.push(`${threeGalBuckets} 3.5-gallon bucket${threeGalBuckets > 1 ? 's' : ''}`);
  if (oneGalBuckets > 0) containers.push(`${oneGalBuckets} one-gallon bucket${oneGalBuckets > 1 ? 's' : ''}`);
  
  return {
    totalGallons: gallonsNeeded,
    containerBreakdown: containers.join(' + ')
  };
};

/**
 * Calculate metal studs needed for framing
 * Standard spacing is 16" on center (OC) or 24" OC
 */
export const calculateStuds = (length, width, height, spacing = 16) => {
  const lengthFt = normalizeToFeet(length);
  const widthFt = normalizeToFeet(width);
  const heightFt = normalizeToFeet(height);
  
  const spacingFt = spacing / 12;
  const perimeter = 2 * (lengthFt + widthFt);
  
  // Calculate vertical studs on each wall
  const studsPerWall1 = Math.floor(lengthFt / spacingFt) + 1;
  const studsPerWall2 = Math.floor(widthFt / spacingFt) + 1;
  const totalVerticalStuds = 2 * (studsPerWall1 + studsPerWall2);
  
  // Top and bottom track (runner) - need perimeter length
  const trackLengthNeeded = perimeter;
  
  // Standard stud lengths are 8', 9', 10', 12'
  const studLengthOptions = [8, 9, 10, 12];
  const optimalStudLength = studLengthOptions.find(len => len >= heightFt) || 12;
  
  return {
    verticalStuds: totalVerticalStuds,
    studLength: optimalStudLength,
    trackLength: Math.ceil(trackLengthNeeded),
    spacing: spacing
  };
};

/**
 * Master calculation function that returns complete material list
 */
export const calculateAllMaterials = (length, width, height, options = {}) => {
  const {
    includeCeiling = false,
    wasteFactor = 0.10,
    studSpacing = 16,
    drywallThickness = '1/2"',
    includeStuds = false
  } = options;
  
  try {
    const sqFootage = calculateSquareFootage(length, width, height, includeCeiling);
    const drywall = calculateDrywallSheets(sqFootage.totalArea, wasteFactor);
    const screws = calculateScrews(drywall.sheetsNeeded);
    const mud = calculateJointCompound(sqFootage.totalArea);
    
    let studs = null;
    if (includeStuds) {
      studs = calculateStuds(length, width, height, studSpacing);
    }
    
    return {
      dimensions: {
        length: normalizeToFeet(length),
        width: normalizeToFeet(width),
        height: normalizeToFeet(height)
      },
      squareFootage: sqFootage,
      drywall,
      screws,
      mud,
      studs,
      drywallThickness
    };
  } catch (error) {
    throw new Error(`Calculation error: ${error.message}`);
  }
};
