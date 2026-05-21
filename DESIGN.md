---
name: NIT_Plus
description: ระบบบริหารจัดการสถาบันประสาทวิทยาแห่งชาติ — Clean, trustworthy, and accessible for all clinical staff
colors:
  primary: "#1E3869"
  primary-light: "#E8EDF5"
  primary-mid: "#2A4D8A"
  primary-dark: "#14264A"
  link: "#1677FF"
  success: "#52C41A"
  warning: "#FAAD14"
  error: "#FF4D4F"
  info: "#1677FF"
  surface: "#FFFFFF"
  background: "#F0F2F5"
  surface-raised: "#FAFAFA"
  text-primary: "#262626"
  text-secondary: "#595959"
  text-disabled: "#BFBFBF"
  border: "#D9D9D9"
  border-split: "#F0F0F0"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: 1.23
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.27
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.33
  subtitle:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "20px"
rounded:
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "4px 15px"
  button-primary-hover:
    backgroundColor: "{colors.primary-mid}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
  button-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "4px 15px"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "4px 15px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "4px 11px"
  tag-category:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
---

# Design System: NIT_Plus

## 1. Overview

**Creative North Star: "The Clarity Clinic"**

NIT_Plus is the operational backbone of the Neurological Institute of Thailand — a system used daily by physicians, nurses, administrators, and clinical staff across every department. Its design must be unambiguous, navigable at a glance, and equally approachable for a consultant reviewing patient data and a registrar processing admissions.

The system is built on Ant Design 5.x with a single brand anchor: **Institutional Navy `#1E3869`**. This navy is the color of action, structure, and identity simultaneously — appearing on primary buttons, navigation chrome, category badges, active states, and brand marks. The monolithic anchor gives the system its institutional weight without visual fragmentation.

This system explicitly rejects: generic SaaS dashboard templates with purple-teal gradients; dark-mode-by-default patterns; border-left accent stripes as decoration; bounce/elastic easing; and any component that looks like it shipped with a free admin template.

**Key Characteristics:**
- Single navy brand anchor — used for all primary actions, navigation, and brand marks
- White content surfaces on light gray page background — structure without decoration
- System font stack with Noto Sans Thai priority for bilingual readability
- 14px body baseline per Ant Design spec; no text below 12px in the UI
- Flat by default — elevation only for modals, dropdowns, and overlaid panels
- 8px spacing unit; all spacing is a multiple of 4px
- Functional color signals (green/gold/red) used only for status and state

---

## 2. Colors

A single brand anchor (Institutional Navy), four functional signals, and a neutral ramp. Color earns its place only when it carries meaning.

> **Reference observation:** The NIT admin system uses Institutional Navy (`#1E3869`) as the unified brand color throughout — primary buttons, navigation, category badges, and active states all share this single anchor. This consolidation is the system's defining visual pattern.

### Primary
- **Institutional Navy** (`#1E3869`): The brand color. All primary action buttons, nav bar brand block, category badges, active navigation states, focus rings, and links use this color.
- **Navy Light** (`#E8EDF5`): Selected row backgrounds, badge fills, hover surface tints. Never used as a structural background.
- **Navy Mid** (`#2A4D8A`): Hover state for primary buttons — slightly lighter than base to signal interactivity on dark fills.
- **Navy Dark** (`#14264A`): Active/pressed state for primary elements.

### Links & Text Actions
- **Link Blue** (`#1677FF`): Text-link actions inside tables — "แก้ไข" (edit) and other in-table text actions. Ant Design default link color. Distinct from the navy brand to signal a different action class.
- **Danger Red** (`#FF4D4F`): Destructive text-link actions — "ลบ" (delete) and validation errors.

### Functional Signals
- **Clinical Green** (`#52C41A`): Success states, completed status, healthy indicators. Ant Design `colorSuccess`.
- **Alert Gold** (`#FAAD14`): Warnings, pending states, mild alerts requiring attention. Ant Design `colorWarning`.
- **Critical Red** (`#FF4D4F`): Errors, destructive actions, critical alerts. Ant Design `colorError`.

### Neutral
- **Canvas White** (`#FFFFFF`): All primary content surfaces — cards, tables, form panels.
- **Page Background** (`#F0F2F5`): The base layout background.
- **Surface Raised** (`#FAFAFA`): Table header rows, secondary zones within a card.
- **Text Primary** (`#262626`): All body text, labels, and headings.
- **Text Secondary** (`#595959`): Supporting text, metadata, timestamps, helper text.
- **Text Disabled** (`#BFBFBF`): Disabled input text and placeholder content only.
- **Border Default** (`#D9D9D9`): Input borders, card borders, table dividers.
- **Border Split** (`#F0F0F0`): Internal row dividers within a card.

### Named Rules
**The Single Anchor Rule.** Navy is the only brand color. It appears on primary buttons, navigation chrome, category badges, and active states. Never introduce a competing brand color — no teal, purple, or secondary accent. The unity is the identity.

**The Signal Rule.** Link Blue means "edit this record." Danger Red means "delete." Green/Gold/Red in badges mean status. These roles are fixed.

**The Reserved Navy Rule.** Primary navy fills appear on no more than 20% of any given screen — primarily in the brand block, primary buttons, category badges, and active indicators.

---

## 3. Typography

**System Font:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans Thai', sans-serif`

**Character:** The font stack defers to the user's operating system for legibility. `Noto Sans Thai` is the explicit Thai fallback to ensure consistent glyph quality across Windows and macOS clinical workstations. No decorative or display typefaces.

### Hierarchy
- **Display** (600, 38px, lh 1.23): Page-level titles only. Rare.
- **Headline** (600, 30px, lh 1.27): Primary card headings, modal titles.
- **Title** (600, 24px, lh 1.33): Section headings within pages.
- **Subtitle** (500, 20px, lh 1.4): Sub-section labels, panel headings.
- **Body** (400, 14px, 22px lh): All standard interface text. The dominant size.
- **Label** (400, 12px, 20px lh): Tags, badges, helper text. Never below 12px.

### Named Rules
**The Thai-First Rule.** Every text rendering decision is tested in Thai script first.

**The 14px Floor Rule.** Body text is 14px minimum. 12px is permitted for labels and metadata only.

---

## 4. Elevation

NIT_Plus is **flat by default**. Cards have no shadow at rest. Elevation signals an element has risen above the page layer.

### Shadow Vocabulary
- **Ambient Low** (`0 1px 4px rgba(0,0,0,0.08)`): Top navigation bar, sticky elements.
- **Panel Medium** (`0 4px 12px rgba(0,0,0,0.12)`): Dropdowns, Select popups, Tooltip containers.
- **Modal High** (`0 8px 24px rgba(0,0,0,0.16)`): Modal dialogs, Drawer panels.

### Named Rules
**The Flat-By-Default Rule.** Cards have no shadow at rest. A shadow means the element is floating.

---

## 5. Components

### Buttons
- **Shape:** Slightly rounded (6px radius — Ant Design default `borderRadius`)
- **Primary:** Navy background (`#1E3869`), white text, `padding: 4px 15px`, height 32px
- **Hover / Focus:** Background shifts to Navy Mid (`#2A4D8A`); focus ring `2px outline #1E3869` at 25% opacity
- **Active / Pressed:** Background darkens to Navy Dark (`#14264A`)
- **Default:** White background, `#D9D9D9` border, Text Primary color; hover shows Navy border and text
- **Danger (filled):** Critical Red background, white text; reserved for primary destructive confirmation dialogs only
- **Disabled:** Background `#F5F5F5`, text `#BFBFBF`, border `#D9D9D9`
- **Text/Link actions in tables:** "แก้ไข" uses Link Blue (`#1677FF`); "ลบ" uses Danger Red (`#FF4D4F`). Never wrap in button containers inside table rows.

### Tags & Badges
- **Category badge:** Navy `#1E3869` fill, white text, 4px radius — for content category labels.
- **Status Success:** `#F6FFED` bg / `#389E0D` text / `#B7EB8F` border
- **Status Warning:** `#FFFBE6` bg / `#D48806` text / `#FFE58F` border
- **Status Error:** `#FFF2F0` bg / `#CF1322` text / `#FFCCC7` border
- **Status Default:** `#FAFAFA` bg / `#595959` text / `#D9D9D9` border
- **Shape:** 4px radius

### Cards
- **Corner Style:** Rounded (8px)
- **Background:** Canvas White
- **Shadow:** None at rest
- **Border:** `1px solid #F0F0F0` for internal card sections
- **Internal Padding:** 24px standard

### Inputs
- **Style:** White background, `1px solid #D9D9D9` border, 6px radius, `padding: 4px 11px`
- **Focus:** Border `#1E3869`; `box-shadow: 0 0 0 2px rgba(30,56,105,0.2)`
- **Error:** Border `#FF4D4F`

### Tables
- **Header row:** Surface Raised (`#FAFAFA`) background
- **Row divider:** Border Split (`#F0F0F0`)
- **Row hover:** `#F5F7FA` (subtle navy-tinted gray)
- **Selected row:** `#E8EDF5` background with left border `2px solid #1E3869`

### Navigation (Top Bar)
- **Bar background:** White (`#FFFFFF`) with bottom border `1px solid #D9D9D9`
- **Brand block (left):** Navy `#1E3869` square containing logo + brand text
- **Nav items default:** Text Secondary (`#595959`)
- **Nav items hover:** Navy text, `#F5F7FA` background
- **Nav items active:** Navy text (bold) + `2px solid #1E3869` bottom border
- **Right:** Logout text-button in Navy color

---

## 6. Do's and Don'ts

### Do:
- **Do** use Institutional Navy (`#1E3869`) as the single brand anchor — buttons, nav, badges, active states all share this color.
- **Do** keep page backgrounds at `#F0F2F5` and card surfaces at `#FFFFFF`.
- **Do** use Link Blue (`#1677FF`) for "แก้ไข" and Danger Red (`#FF4D4F`) for "ลบ" as text-link actions in table rows.
- **Do** use functional colors (green, gold, red, gray) for status badges only — these are signal colors, not palette choices.
- **Do** test every text label in Thai script before finalizing size and weight.
- **Do** use the 8px grid for all spacing.

### Don't:
- **Don't** introduce a competing brand color (teal, purple, secondary accent) — navy is the single anchor.
- **Don't** use border-left accent stripes as decoration — generic admin template anti-pattern.
- **Don't** use gradient backgrounds, gradient text, or glassmorphism.
- **Don't** use bounce or elastic easing — `ease-in-out` at 200ms maximum.
- **Don't** nest cards inside cards.
- **Don't** put any text below 12px.
- **Don't** use dark mode or dark-surface card variants.
- **Don't** use more than one primary (navy) action button per page section.
- **Don't** use filled Danger Red buttons for "ลบ" in table rows — use text-link style.
