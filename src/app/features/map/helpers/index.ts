import {LeafletMouseEvent, StyleFunction} from "leaflet";
import {COLOR_GRADE_DELTA, DENSITY_OPACITY, MAP_DENSITY_COLORS, MAX_DENSITY} from "@/app/features/map/constants";

export const getGeoJsonStyles: StyleFunction = (feature) => {
   return {
      color: 'red',
      fillColor: getColorByDensity(feature?.properties.Density),
      weight: 1,
      opacity: DENSITY_OPACITY,
   }
}

function getColorByDensity(density: number) {
   return MAP_DENSITY_COLORS.find((color, i) => {
      return density >= MAX_DENSITY * ((MAX_DENSITY - COLOR_GRADE_DELTA * i) / MAX_DENSITY)
   })
}

export function highlightFeature(e: LeafletMouseEvent) {
   const layer = e.target;
   layer.setStyle({
      weight: 3,
      color: '#666',
   });

   layer.bringToFront();
}

export function resetFeatureHighlight(e: LeafletMouseEvent) {
   const layer = e.target;
   layer.setStyle(getGeoJsonStyles(layer.feature));
}
