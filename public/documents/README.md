# Competition Documents Directory

Upload or place your official PDFs here:

1. `Innovista2026_ReelShoot_Guidelines.pdf` - Official Competition Guidelines
2. `Innovista2026_ReelShoot_Itinerary.pdf` - Official Event Itinerary

Once placed in this directory (or hosted externally), update the paths in `src/config/eventConfig.ts`:

```typescript
export const EVENT_CONFIG = {
  ...
  guidelinesPdfUrl: '/documents/Innovista2026_ReelShoot_Guidelines.pdf',
  itineraryPdfUrl: '/documents/Innovista2026_ReelShoot_Itinerary.pdf',
  ...
};
```
