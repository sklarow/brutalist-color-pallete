# Brutalist Color Palette Maker

A minimalist, brutalist-inspired color palette generator that creates harmonious color schemes using the golden ratio (φ ≈ 1.618). Generate mathematically balanced palettes perfect for brutalist web design interfaces.

## Features

- **Golden Ratio Color Generation**: Creates 10 color variants using mathematical golden ratio principles
- **Multiple Base Colors**: Save and switch between multiple base color palettes
- **Dark Mode**: Full dark mode support with smooth transitions
- **Component Showcase**: See your colors applied to real UI components (buttons, cards, inputs, etc.)
- **Usage Guidelines**: Learn how to use each color type effectively
- **Brutalist Aesthetic**: Bold borders, monospace typography, stark contrasts

## Color Generation Rules

The palette generates 10 colors from your base color:

1. **Base Color** - Your selected color (unchanged)
2. **Accent (+137.5°)** - Hue rotated by 137.5° (360°/φ²)
3. **Desaturated (-60%)** - Base color with 60% saturation reduction
4. **Golden Accent (+222.5°)** - Hue rotated by 222.5° (360°/φ)
5. **Double Rotation (+275°)** - Hue rotated by 275° (137.5° × 2)
6. **Inverse Ratio (+52.5°)** - Hue rotated by 52.5° (137.5° / φ)
7. **Golden Desat (-38.2%)** - Desaturated by 38.2% (golden ratio)
8. **Light Desat (-23.6%)** - Desaturated by 23.6%
9. **Lightened (+38.2%)** - Lightness increased by 38.2%
10. **Darkened (-38.2%)** - Lightness decreased by 38.2%

## Color Usage Guidelines

- **BASE COLOR**: Use for primary buttons, main headings, key actions, brand elements
- **ACCENT**: Use for secondary buttons, highlights, links, call-to-action elements
- **DESATURATED**: Use for body text, backgrounds, subtle borders, disabled states
- **LIGHTENED**: Use for card backgrounds, hover states, light sections, subtle fills
- **DARKENED**: Use for dark text on light backgrounds, emphasis, strong contrast

## How to Use

1. **Choose Base Color**: Click the color preview square or use the color picker to select your base color
2. **Enter Hex Value**: Type or paste a hex color code directly into the input field
3. **Save Colors**: Click "Add Current" to save your base color to your collection
4. **Switch Palettes**: Click any saved base color to generate its palette
5. **Copy Colors**: Click the "Copy" button on any color card to copy its hex value
6. **Toggle Dark Mode**: Use the dark mode switch to view your palette in dark mode

## Component Showcase

The app includes a comprehensive component showcase demonstrating how your colors work in real UI elements:

- Buttons (Primary, Secondary, Outline)
- Progress Bars
- Gradient Bars
- Sliders
- Cards
- Badges & Tags
- Text Fields
- Checkboxes & Radio Buttons
- Switches
- Chips
- Tabs
- Lists
- Icon Buttons

## Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (CSS variables) for dark mode, brutalist styling
- **Vanilla JavaScript**: Color calculations, palette generation, localStorage persistence

## Design Philosophy

This tool embraces brutalist web design principles:

- **Raw Aesthetics**: Unpolished, functional design
- **Bold Typography**: Monospace fonts, uppercase text, strong letter spacing
- **Stark Contrasts**: High contrast borders, clear visual hierarchy
- **Functional Layout**: Content over decoration
- **Mathematical Harmony**: Golden ratio-based color relationships

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- ES6 JavaScript
- HTML5 Color Input
- Clipboard API

## License

This project is open source and available for use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

