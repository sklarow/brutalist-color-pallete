// Convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}

// Rotate hue by degrees
function rotateHue(h, degrees) {
    let newH = (h + degrees) % 360;
    return newH < 0 ? newH + 360 : newH;
}

// Desaturate by percentage
function desaturate(s, percentage) {
    return Math.max(0, Math.min(100, s * (1 - percentage / 100)));
}

// Adjust lightness by percentage
function adjustLightness(l, percentage) {
    const adjustment = l * (percentage / 100);
    return Math.max(0, Math.min(100, l + adjustment));
}

// Generate palette from base color
function generatePalette(baseColor) {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const goldenRatio = 1.618;
    const goldenAngle = 137.5; // 360°/φ²
    const goldenAngle2 = 222.5; // 360°/φ
    const goldenAngle3 = 275; // 137.5° × 2
    const goldenAngle4 = 52.5; // 137.5° / φ

    // Core Palette
    // Color 1: Base color (unchanged)
    const color1 = baseColor;

    // Color 2: Rotate hue by 137.5° (golden angle)
    const hsl2 = { h: rotateHue(hsl.h, goldenAngle), s: hsl.s, l: hsl.l };
    const rgb2 = hslToRgb(hsl2.h, hsl2.s, hsl2.l);
    const color2 = rgbToHex(rgb2.r, rgb2.g, rgb2.b);

    // Color 3: Desaturate by 60%
    const hsl3 = { h: hsl.h, s: desaturate(hsl.s, 60), l: hsl.l };
    const rgb3 = hslToRgb(hsl3.h, hsl3.s, hsl3.l);
    const color3 = rgbToHex(rgb3.r, rgb3.g, rgb3.b);

    // Golden Ratio Hue Rotations
    // Color 4: Rotate hue by 222.5° (360°/φ)
    const hsl4 = { h: rotateHue(hsl.h, goldenAngle2), s: hsl.s, l: hsl.l };
    const rgb4 = hslToRgb(hsl4.h, hsl4.s, hsl4.l);
    const color4 = rgbToHex(rgb4.r, rgb4.g, rgb4.b);

    // Color 5: Rotate hue by 275° (137.5° × 2)
    const hsl5 = { h: rotateHue(hsl.h, goldenAngle3), s: hsl.s, l: hsl.l };
    const rgb5 = hslToRgb(hsl5.h, hsl5.s, hsl5.l);
    const color5 = rgbToHex(rgb5.r, rgb5.g, rgb5.b);

    // Color 6: Rotate hue by 52.5° (137.5° / φ)
    const hsl6 = { h: rotateHue(hsl.h, goldenAngle4), s: hsl.s, l: hsl.l };
    const rgb6 = hslToRgb(hsl6.h, hsl6.s, hsl6.l);
    const color6 = rgbToHex(rgb6.r, rgb6.g, rgb6.b);

    // Golden Ratio Saturation Variants
    // Color 7: Desaturate by 38.2% (golden ratio: 100% - 61.8%)
    const hsl7 = { h: hsl.h, s: desaturate(hsl.s, 38.2), l: hsl.l };
    const rgb7 = hslToRgb(hsl7.h, hsl7.s, hsl7.l);
    const color7 = rgbToHex(rgb7.r, rgb7.g, rgb7.b);

    // Color 8: Desaturate by 23.6% (golden ratio division)
    const hsl8 = { h: hsl.h, s: desaturate(hsl.s, 23.6), l: hsl.l };
    const rgb8 = hslToRgb(hsl8.h, hsl8.s, hsl8.l);
    const color8 = rgbToHex(rgb8.r, rgb8.g, rgb8.b);

    // Golden Ratio Lightness Variants
    // Color 9: Lighten by 38.2% (golden ratio)
    const hsl9 = { h: hsl.h, s: hsl.s, l: adjustLightness(hsl.l, 38.2) };
    const rgb9 = hslToRgb(hsl9.h, hsl9.s, hsl9.l);
    const color9 = rgbToHex(rgb9.r, rgb9.g, rgb9.b);

    // Color 10: Darken by 38.2% (golden ratio)
    const hsl10 = { h: hsl.h, s: hsl.s, l: adjustLightness(hsl.l, -38.2) };
    const rgb10 = hslToRgb(hsl10.h, hsl10.s, hsl10.l);
    const color10 = rgbToHex(rgb10.r, rgb10.g, rgb10.b);

    return { 
        color1, color2, color3, color4, color5, color6, 
        color7, color8, color9, color10 
    };
}

// Base colors management
let baseColors = [];
let currentBaseColor = '#FF0000';

// Load base colors from localStorage
function loadBaseColors() {
    const saved = localStorage.getItem('baseColors');
    if (saved) {
        baseColors = JSON.parse(saved);
    } else {
        // Initialize with default color
                baseColors = [{ id: Date.now(), color: '#FF0000' }];
        saveBaseColors();
    }
    renderBaseColors();
}

// Save base colors to localStorage
function saveBaseColors() {
    localStorage.setItem('baseColors', JSON.stringify(baseColors));
}

// Render base colors grid
function renderBaseColors() {
    const grid = document.getElementById('baseColorsGrid');
    grid.innerHTML = '';
    
    baseColors.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `base-color-item ${item.color === currentBaseColor ? 'selected' : ''}`;
        div.onclick = () => selectBaseColor(item.color);
        
        const swatch = document.createElement('div');
        swatch.className = 'base-color-swatch';
        swatch.style.backgroundColor = item.color;
        
        const hex = document.createElement('div');
        hex.className = 'base-color-hex';
        hex.textContent = item.color.toUpperCase();
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-base-color';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteBaseColor(item.id);
        };
        
        div.appendChild(swatch);
        div.appendChild(hex);
        div.appendChild(deleteBtn);
        grid.appendChild(div);
    });
}

// Add current color as base color
function addBaseColor() {
    const color = document.getElementById('baseColor').value;
    // Check if color already exists
    if (!baseColors.find(item => item.color.toLowerCase() === color.toLowerCase())) {
        baseColors.push({ id: Date.now(), color: color });
        saveBaseColors();
        renderBaseColors();
    }
}

// Select a base color
function selectBaseColor(color) {
    currentBaseColor = color;
    document.getElementById('baseColor').value = color;
    updatePalette();
    renderBaseColors();
}

// Delete a base color
function deleteBaseColor(id) {
    baseColors = baseColors.filter(item => item.id !== id);
    if (baseColors.length === 0) {
        // If no colors left, add default
                baseColors = [{ id: Date.now(), color: '#FF0000' }];
    }
    // If deleted color was current, select first available
    if (baseColors.length > 0 && !baseColors.find(item => item.color === currentBaseColor)) {
        selectBaseColor(baseColors[0].color);
    }
    saveBaseColors();
    renderBaseColors();
}

// Update color preview and hex input
function updateColorPreview() {
    const baseColor = document.getElementById('baseColor').value;
    const preview = document.getElementById('colorPreview');
    const hexInput = document.getElementById('hexInput');
    
    if (preview) {
        preview.style.backgroundColor = baseColor;
    }
    if (hexInput) {
        hexInput.value = baseColor.toUpperCase();
    }
}

// Handle hex input changes
function handleHexInput() {
    const hexInput = document.getElementById('hexInput');
    const colorInput = document.getElementById('baseColor');
    
    if (!hexInput || !colorInput) return;
    
    hexInput.addEventListener('input', (e) => {
        let value = e.target.value.toUpperCase();
        // Remove any non-hex characters except #
        value = value.replace(/[^#0-9A-F]/g, '');
        // Ensure it starts with #
        if (value && !value.startsWith('#')) {
            value = '#' + value;
        }
        // Limit to 7 characters (#RRGGBB)
        if (value.length > 7) {
            value = value.substring(0, 7);
        }
        e.target.value = value;
        
        // Validate and update color picker if valid hex
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            colorInput.value = value;
            updatePalette();
        }
    });
    
    hexInput.addEventListener('blur', (e) => {
        let value = e.target.value.toUpperCase();
        // If incomplete, try to complete it
        if (value.startsWith('#') && value.length > 1 && value.length < 7) {
            // Pad with zeros
            value = value.padEnd(7, '0');
        }
        // Validate hex format
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            colorInput.value = value;
            e.target.value = value;
            updatePalette();
        } else {
            // Reset to current color if invalid
            e.target.value = colorInput.value.toUpperCase();
        }
    });
}

// Update showcase with colors
function updateShowcase(palette) {
    // Helper function to determine if color is light or dark
    function isLight(color) {
        const rgb = hexToRgb(color);
        if (!rgb) return false;
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128;
    }

    // Helper function to set text color based on background
    function setTextColor(element, bgColor) {
        if (element) {
            element.style.color = isLight(bgColor) ? '#000' : '#fff';
        }
    }

    // Color Usage Guidelines
    const usageSwatches = {
        usageBaseSwatch: palette.color1,
        usageAccentSwatch: palette.color2,
        usageDesatSwatch: palette.color3,
        usageLightSwatch: palette.color9,
        usageDarkSwatch: palette.color10
    };

    Object.keys(usageSwatches).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.style.backgroundColor = usageSwatches[key];
        }
    });

    // Buttons
    const btnPrimary = document.getElementById('btnPrimary');
    if (btnPrimary) {
        btnPrimary.style.backgroundColor = palette.color1;
        btnPrimary.style.borderColor = palette.color1;
        setTextColor(btnPrimary, palette.color1);
    }

    const btnSecondary = document.getElementById('btnSecondary');
    if (btnSecondary) {
        btnSecondary.style.backgroundColor = palette.color2;
        btnSecondary.style.borderColor = palette.color2;
        setTextColor(btnSecondary, palette.color2);
    }

    const btnOutline = document.getElementById('btnOutline');
    if (btnOutline) {
        btnOutline.style.borderColor = palette.color1;
        btnOutline.style.color = palette.color1;
    }

    // Progress Bars
    const progressFill1 = document.getElementById('progressFill1');
    if (progressFill1) {
        progressFill1.style.backgroundColor = palette.color1;
        progressFill1.style.width = '75%';
    }

    const progressFill2 = document.getElementById('progressFill2');
    if (progressFill2) {
        progressFill2.style.backgroundColor = palette.color2;
        progressFill2.style.width = '45%';
    }

    // Gradient Bars (subtle gradients)
    const gradientBar1 = document.getElementById('gradientBar1');
    if (gradientBar1) {
        gradientBar1.style.background = `linear-gradient(90deg, ${palette.color1}, ${palette.color2})`;
    }

    const gradientBar2 = document.getElementById('gradientBar2');
    if (gradientBar2) {
        gradientBar2.style.background = `linear-gradient(90deg, ${palette.color4}, ${palette.color6})`;
    }

    // Slider
    const demoSlider = document.getElementById('demoSlider');
    if (demoSlider) {
        demoSlider.style.setProperty('--thumb-color', palette.color1);
        const style = document.createElement('style');
        style.textContent = `
            .demo-slider::-webkit-slider-thumb {
                background: ${palette.color1};
            }
            .demo-slider::-moz-range-thumb {
                background: ${palette.color1};
            }
        `;
        if (!document.getElementById('slider-style')) {
            style.id = 'slider-style';
            document.head.appendChild(style);
        } else {
            document.getElementById('slider-style').textContent = style.textContent;
        }
    }

    // Cards
    const demoCard1 = document.getElementById('demoCard1');
    if (demoCard1) {
        demoCard1.style.backgroundColor = palette.color9;
        demoCard1.style.borderColor = palette.color1;
    }

    const cardTitle1 = document.getElementById('cardTitle1');
    if (cardTitle1) {
        // Use darkened color for better contrast on light background
        cardTitle1.style.color = palette.color10;
    }

    const cardText1 = document.getElementById('cardText1');
    if (cardText1) {
        cardText1.style.color = palette.color10;
    }

    const demoCard2 = document.getElementById('demoCard2');
    if (demoCard2) {
        demoCard2.style.backgroundColor = palette.color8;
        demoCard2.style.borderColor = palette.color2;
    }

    const cardTitle2 = document.getElementById('cardTitle2');
    if (cardTitle2) {
        // Use darkened color for better contrast on light background
        cardTitle2.style.color = palette.color10;
    }

    const cardText2 = document.getElementById('cardText2');
    if (cardText2) {
        cardText2.style.color = palette.color10;
    }

    // Badges
    const badge1 = document.getElementById('badge1');
    if (badge1) {
        badge1.style.backgroundColor = palette.color1;
        badge1.style.borderColor = palette.color1;
        setTextColor(badge1, palette.color1);
    }

    const badge2 = document.getElementById('badge2');
    if (badge2) {
        badge2.style.backgroundColor = palette.color2;
        badge2.style.borderColor = palette.color2;
        setTextColor(badge2, palette.color2);
    }

    const badge3 = document.getElementById('badge3');
    if (badge3) {
        badge3.style.backgroundColor = palette.color4;
        badge3.style.borderColor = palette.color4;
        setTextColor(badge3, palette.color4);
    }

    // Text Fields
    const textfield1 = document.getElementById('textfield1');
    if (textfield1) {
        textfield1.style.borderColor = palette.color1;
    }

    const textfieldLabel1 = document.getElementById('textfieldLabel1');
    if (textfieldLabel1) {
        textfieldLabel1.style.color = palette.color1;
    }

    const textfield2 = document.getElementById('textfield2');
    if (textfield2) {
        textfield2.style.borderColor = palette.color2;
        textfield2.style.backgroundColor = palette.color9 + '40';
    }

    const textfieldLabel2 = document.getElementById('textfieldLabel2');
    if (textfieldLabel2) {
        textfieldLabel2.style.color = palette.color2;
    }

    // Checkboxes
    const checkboxCustom1 = document.getElementById('checkboxCustom1');
    if (checkboxCustom1) {
        checkboxCustom1.style.borderColor = palette.color1;
    }

    const checkbox1 = document.getElementById('checkbox1');
    if (checkbox1 && checkbox1.checked) {
        checkboxCustom1.style.backgroundColor = palette.color1;
        checkboxCustom1.style.color = isLight(palette.color1) ? '#000' : '#fff';
    }

    const checkboxCustom2 = document.getElementById('checkboxCustom2');
    if (checkboxCustom2) {
        checkboxCustom2.style.borderColor = palette.color2;
    }

    // Radio buttons
    const radioCustom1 = document.getElementById('radioCustom1');
    if (radioCustom1) {
        radioCustom1.style.borderColor = palette.color1;
    }

    const radio1 = document.getElementById('radio1');
    if (radio1) {
        radioCustom1.style.setProperty('--radio-fill', palette.color1);
        if (radio1.checked) {
            radioCustom1.style.setProperty('--radio-fill', palette.color1);
        }
    }

    const radioCustom2 = document.getElementById('radioCustom2');
    if (radioCustom2) {
        radioCustom2.style.borderColor = palette.color2;
    }

    // Switches
    const switchSlider1 = document.getElementById('switchSlider1');
    if (switchSlider1) {
        switchSlider1.style.borderColor = palette.color1;
    }

    const switch1 = document.getElementById('switch1');
    if (switch1 && switch1.checked) {
        switchSlider1.style.backgroundColor = palette.color1;
        switchSlider1.style.setProperty('--switch-thumb', isLight(palette.color1) ? '#000' : '#fff');
    }

    const switchSlider2 = document.getElementById('switchSlider2');
    if (switchSlider2) {
        switchSlider2.style.borderColor = palette.color2;
    }

    // Dark mode toggle (top section)
    const darkModeToggleSlider = document.getElementById('darkModeToggleSlider');
    if (darkModeToggleSlider) {
        darkModeToggleSlider.style.borderColor = palette.color1;
    }

    // Chips
    const chip1 = document.getElementById('chip1');
    if (chip1) {
        chip1.style.backgroundColor = palette.color1;
        chip1.style.borderColor = palette.color1;
        setTextColor(chip1, palette.color1);
    }

    const chip2 = document.getElementById('chip2');
    if (chip2) {
        chip2.style.backgroundColor = palette.color2;
        chip2.style.borderColor = palette.color2;
        setTextColor(chip2, palette.color2);
    }

    const chip3 = document.getElementById('chip3');
    if (chip3) {
        chip3.style.backgroundColor = 'transparent';
        chip3.style.borderColor = palette.color4;
        chip3.style.color = palette.color4;
    }

    // Tabs
    const tabsHeader = document.getElementById('tabsHeader');
    if (tabsHeader) {
        tabsHeader.style.borderBottomColor = palette.color1;
    }

    const tab1 = document.getElementById('tab1');
    if (tab1) {
        tab1.style.color = palette.color1;
    }

    const tab2 = document.getElementById('tab2');
    if (tab2) {
        tab2.style.color = palette.color2;
    }

    const tab3 = document.getElementById('tab3');
    if (tab3) {
        tab3.style.color = palette.color4;
    }

    const tabsIndicator = document.getElementById('tabsIndicator');
    if (tabsIndicator) {
        tabsIndicator.style.backgroundColor = palette.color1;
        tabsIndicator.style.transform = 'translateX(0)';
    }

    // Lists
    const listItem1 = document.getElementById('listItem1');
    if (listItem1) {
        listItem1.style.borderBottomColor = palette.color3;
    }

    const listTitle1 = document.getElementById('listTitle1');
    if (listTitle1) {
        listTitle1.style.color = palette.color1;
    }

    const listItem2 = document.getElementById('listItem2');
    if (listItem2) {
        listItem2.style.borderBottomColor = palette.color3;
    }

    const listTitle2 = document.getElementById('listTitle2');
    if (listTitle2) {
        listTitle2.style.color = palette.color1;
    }

    const listItem3 = document.getElementById('listItem3');
    if (listItem3) {
        listItem3.style.borderBottomColor = palette.color3;
    }

    const listTitle3 = document.getElementById('listTitle3');
    if (listTitle3) {
        listTitle3.style.color = palette.color1;
    }

    // Icon Buttons
    const iconBtn1 = document.getElementById('iconBtn1');
    if (iconBtn1) {
        iconBtn1.style.borderColor = palette.color1;
        iconBtn1.style.color = palette.color1;
    }

    const iconBtn2 = document.getElementById('iconBtn2');
    if (iconBtn2) {
        iconBtn2.style.borderColor = palette.color2;
        iconBtn2.style.color = palette.color2;
    }

    const iconBtn3 = document.getElementById('iconBtn3');
    if (iconBtn3) {
        iconBtn3.style.borderColor = palette.color1;
        iconBtn3.style.backgroundColor = palette.color1;
        setTextColor(iconBtn3, palette.color1);
    }

    const iconBtn4 = document.getElementById('iconBtn4');
    if (iconBtn4) {
        iconBtn4.style.borderColor = palette.color4;
        iconBtn4.style.color = palette.color4;
    }

    // Update checkbox and radio checked states with colors
    setTimeout(() => {
        const checkboxes = document.querySelectorAll('.demo-checkbox');
        checkboxes.forEach((cb, index) => {
            const custom = cb.nextElementSibling;
            if (custom && cb.checked) {
                const color = index === 0 ? palette.color1 : palette.color2;
                custom.style.backgroundColor = color;
                custom.style.color = isLight(color) ? '#000' : '#fff';
            }
        });

        const radios = document.querySelectorAll('.demo-radio');
        radios.forEach((rb, index) => {
            const custom = rb.nextElementSibling;
            if (custom) {
                const color = index === 0 ? palette.color1 : palette.color2;
                custom.style.setProperty('--radio-fill', color);
            }
        });

        const switches = document.querySelectorAll('.demo-switch');
        switches.forEach((sw, index) => {
            const slider = sw.nextElementSibling;
            if (slider && sw.checked) {
                const color = index === 0 ? palette.color1 : palette.color2;
                slider.style.backgroundColor = color;
            }
        });

        // Update dark mode toggle slider
        const darkModeToggle = document.getElementById('darkModeToggle');
        const darkModeToggleSlider = document.getElementById('darkModeToggleSlider');
        if (darkModeToggle && darkModeToggleSlider && darkModeToggle.checked) {
            darkModeToggleSlider.style.backgroundColor = palette.color1;
        }
    }, 100);
}

// Update palette display
function updatePalette() {
    const baseColor = document.getElementById('baseColor').value;
    currentBaseColor = baseColor;
    const palette = generatePalette(baseColor);

    // Update color preview and hex input
    updateColorPreview();

    // Update all color displays and values
    for (let i = 1; i <= 10; i++) {
        const colorKey = `color${i}`;
        const valueKey = `value${i}`;
        if (document.getElementById(colorKey) && palette[colorKey]) {
            document.getElementById(colorKey).style.backgroundColor = palette[colorKey];
            document.getElementById(valueKey).textContent = palette[colorKey].toUpperCase();
        }
    }
    
    // Update showcase
    updateShowcase(palette);
    
    renderBaseColors();
}

// Copy color to clipboard
function copyColor(elementId) {
    const colorValue = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(colorValue).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'COPIED';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Dark mode functionality
function initDarkMode() {
    const darkModeSwitch = document.getElementById('switch2');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
        
        // Sync both switches
        if (darkModeSwitch) {
            darkModeSwitch.checked = isDark;
        }
        if (darkModeToggle) {
            darkModeToggle.checked = isDark;
        }
    }
    
    if (savedDarkMode) {
        applyDarkMode(true);
    }
    
    // Add event listeners to both switches
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', (e) => {
            applyDarkMode(e.target.checked);
        });
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            applyDarkMode(e.target.checked);
        });
    }
}

// Initialize
loadBaseColors();
initDarkMode();
document.getElementById('baseColor').addEventListener('input', updatePalette);
handleHexInput();
updatePalette();

