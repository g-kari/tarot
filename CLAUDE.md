# Tarot — CLAUDE.md

## Project
- **Repo**: g-kari/tarot
- **Framework**: vinext (Vite + Next.js App Router → Cloudflare Workers)
- **Package manager**: pnpm (always use pnpm, never npm/yarn)

## Commands
```bash
pnpm dev       # dev server at localhost:3000
pnpm build     # production build
pnpm deploy    # build + deploy to Cloudflare Workers (requires wrangler login)
```

## Project Structure
```
src/app/
├── data/          # cards.ts (78 cards), spreads.ts
├── store/         # useTarotStore.ts (zustand)
├── animations/    # variants.ts (framer-motion)
└── components/
    ├── TarotApp.tsx           # DndContext root ('use client')
    ├── background/
    ├── card/
    │   ├── CardShell.tsx      # 3D flip (rotateY)
    │   ├── CardBack.tsx       # SVG card back
    │   ├── CardFront.tsx      # SVG card front
    │   └── svg/
    │       ├── MajorArcanaArt.tsx   # 22 abstract SVG scenes (switch)
    │       ├── MinorArcanaArt.tsx   # pip layout + court figures
    │       ├── SuitSymbol.tsx       # ♦♠♥♣ SVG symbols
    │       └── BorderFrame.tsx
    ├── deck/      # DeckPile, DeckControls
    ├── spread/    # SpreadLayout, SlotDropZone, SpreadSelector
    └── table/     # ReadingTable (main canvas)
```

## Key Decisions
- All interactive components must have `"use client"` at the top
- `wrangler.toml` (not .jsonc/.yml — wrangler doesn't support .yml)
- Card size: 120×210px
- vinext auto-configures Vite — no vite.config.ts needed
- DnD: @dnd-kit/core with DragOverlay portal pattern
- Animations: framer-motion v12 — `layoutId` for deck→slot travel

## Design System
| Token | Value |
|---|---|
| card major border | `#c8a84b` |
| card wands border | `#e67e22` |
| card cups border | `#3498db` |
| card swords border | `#95a5a6` |
| card pentacles border | `#27ae60` |
| accent purple | `#6366f1` |
| accent gold | `#a89060` |

## Do Not
- Do not add `type="module"` to individual script tags manually
- Do not create `vite.config.ts` (vinext handles it)
- Do not use `npm` or `yarn`
