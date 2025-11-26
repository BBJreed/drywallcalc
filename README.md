# Drywall Calculator Pro

A professional mobile application for calculating drywall materials needed for construction projects.

## Features

- **Smart Dimension Input**: Accepts multiple formats (feet, inches, feet + inches)
- **Comprehensive Calculations**: 
  - Drywall sheets needed with waste factor
  - Screws required
  - Joint compound (mud) quantities
  - Optional metal stud calculations
- **Flexible Options**:
  - Include ceiling in calculations
  - Adjustable waste factor presets (5%, 10%, 15%, 20%)
  - Optional stud framing estimates
- **Professional Results**: Detailed material breakdown with container sizing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Add required assets to `assets/` folder (see assets/README.md)

4. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- **iOS Simulator**: Press `i` in the Expo CLI or run `npm run ios`
- **Android Emulator**: Press `a` in the Expo CLI or run `npm run android`
- **Web Browser**: Press `w` in the Expo CLI or run `npm run web`
- **Physical Device**: Scan QR code with Expo Go app

## Project Structure

```
drywall-calculator-pro/
├── App.js                          # Main app entry point with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── assets/                         # Images and icons
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon-foreground.png
│   ├── adaptive-icon-background.png
│   └── favicon.png
└── src/
    ├── components/
    │   ├── InputField.js          # Reusable input component
    │   └── ResultCard.js          # Results display card
    ├── constants/
    │   ├── colors.js              # Theme colors and spacing
    │   └── dimensions.js          # Drywall-specific constants
    ├── screens/
    │   ├── CalculatorScreen.js    # Main calculator interface
    │   ├── ResultsScreen.js       # Material estimate results
    │   └── SettingsScreen.js      # App settings
    └── utils/
        ├── calculations.js        # Core calculation logic
        └── validation.js          # Input validation functions
```

## Usage

1. **Enter Room Dimensions**: Input length, width, and height in feet or feet + inches format
2. **Select Options**: Choose whether to include ceiling and/or stud calculations
3. **Choose Waste Factor**: Select appropriate waste percentage for your project
4. **Calculate**: View detailed material requirements including:
   - Total square footage
   - Number of drywall sheets
   - Screws needed
   - Joint compound quantities
   - Metal studs (if selected)

## Calculation Details

### Supported Input Formats
- Feet only: `12` or `12'`
- Feet and inches: `12'6"` or `12' 6"`
- Inches only: `150"`
- Decimal feet: `12.5`

### Material Calculations
- **Drywall Sheets**: Based on 4' × 8' (32 sq ft) standard sheets
- **Screws**: 32 screws per sheet (~300 screws per pound)
- **Joint Compound**: 110 sq ft coverage per gallon (3 coats)
- **Metal Studs**: Based on 16" or 24" on-center spacing

### Waste Factor Presets
- **Minimal (5%)**: Simple rectangular rooms, experienced installers
- **Standard (10%)**: Most residential/commercial projects
- **High (15%)**: Rooms with multiple openings
- **Complex (20%)**: Irregular layouts, vaulted ceilings

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development and build tooling
- **React Navigation**: Screen navigation and routing
- **JavaScript ES6+**: Modern JavaScript features

## Version

Current version: 1.0.0

## License

Private - All rights reserved

## Support

For issues or questions, please contact the development team.
