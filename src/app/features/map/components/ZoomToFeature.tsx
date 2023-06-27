import {FC, useEffect} from 'react'
import {latLngBounds, popup} from "leaflet";
import {useMap} from "react-leaflet";
import {Feature} from "@/app/features/map/types/Map";

type Props = {
   feature: Feature | null,
   popupContent?: string
};

const ZoomToFeature: FC<Props> = ({feature, popupContent = ''}) => {
   const map = useMap();
   if(!feature) return null;
   const {bbox: bounds} = feature;

   const leafletBounds = latLngBounds([
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
   ]);

   useEffect(() => {
      if (!bounds || !map) return;
      zoomIntoFeature();
      createPopup();
   }, [bounds]);

   function zoomIntoFeature() {
      map.fitBounds(leafletBounds);
   }

   function createPopup() {
      const popUp = popup().setContent(popupContent).setLatLng(leafletBounds.getCenter());
      map.openPopup(popUp);
   }

   return null;
};

export default ZoomToFeature;
