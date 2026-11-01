# Homepage visual system

## Direction

The first Aureon storefront screen follows a quiet editorial tailoring direction. The composition combines an open ivory text field with a single warm campaign photograph. Fine rules, restrained gold accents, and large serif typography provide the luxury signal without ornamental UI.

## Implementation reference

`aureon-storefront.png` records the production desktop composition for the foundation milestone. The hero uses an original vector tailoring illustration; interface text and controls remain native HTML.

## Visible copy lock

- `AUREON`
- `New arrivals`
- `Suits`
- `Shirts`
- `Accessories`
- `Account`
- `Cart (0)`
- `Fictional product study`
- `Tailored for the moments that matter.`
- `Modern formalwear, considered down to the last detail.`
- `Explore the collection`
- `Discover our approach`
- `Complimentary alterations`
- `Responsible materials`
- `Delivery & returns`

## Design tokens

| Role | Value |
| --- | --- |
| Page background | Warm ivory `#f4f0e7` |
| Primary text | Ink `#151412` |
| Secondary text | Warm gray `#615e58` |
| Accent | Deep antique gold `#72571f` |
| Accent hover | Dark bronze `#574113` |
| Hairline rule | 22% ink |
| Display type | Iowan Old Style / Baskerville / Times fallback |
| Interface type | Helvetica Neue / Segoe UI / Arial fallback |

## Layout and component rules

- Desktop header uses three zones: wordmark, primary navigation, and account/cart utilities.
- Hero is an asymmetric two-column open layout with no card container.
- The campaign image has no tint or color overlay.
- CTA geometry is sharp; rounding and shadows are avoided.
- The value strip is one horizontal rail on desktop and a divided list on mobile.
- Mobile retains the primary navigation as a horizontally scrollable second header row.
- Motion is limited to link underlines, arrow travel, and a subtle CTA lift, with reduced-motion support.

## Icon inventory

- CTA and text-link arrows: custom 24px outline SVG, 1.5px round stroke.
- Alterations: custom scissors outline.
- Responsible materials: custom leaf outline.
- Delivery and returns: custom parcel outline.
