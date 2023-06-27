import {FC} from 'react'
import dynamic from "next/dynamic";
import {observer} from "mobx-react-lite";
import MapStore from "@/store/Map";
import {Layer, LeafletMouseEvent} from "leaflet";
import {COLOR_GRADE_DELTA, DENSITY_OPACITY, LEGEND_DENSITY_OPACITY, MAP_DENSITY_COLORS, MAX_DENSITY} from "@/app/features/map/constants";
import {Feature, Geometry} from "geojson";
import {Feature as MapFeature} from "../types/Map";
import styles from '../../../../styles/Map.module.scss'
import {getGeoJsonStyles, highlightFeature, resetFeatureHighlight} from "@/app/features/map/helpers";

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), {
   ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), {
   ssr: false,
});
const GeoJSON = dynamic(() => import('react-leaflet').then((module) => module.GeoJSON), {
   ssr: false,
});
const ZoomToFeature = dynamic(() => import('@/app/features/map/components/ZoomToFeature').then((module) => module.default), {
   ssr: false,
});

type Props = {};

const Map: FC<Props> = ({}) => {
   const {geoData, levelNumber, selectedDistrict} = MapStore;

   const onEachGeoFeature = ({properties}: Feature<Geometry, MapFeature["properties"]>, layer: Layer) => {
      layer.bindPopup(properties[`name_${levelNumber}`]!);
      layer.on({
         mouseover: highlightFeature,
         mouseout: resetFeatureHighlight,
         click: zoomIntoFeature
      });
   }

   function zoomIntoFeature(e: LeafletMouseEvent) {
      e.target._map.fitBounds(e.target.getBounds());
   }

   return (
       <div className={styles.mapWrapper}>
          <MapContainer style={{width: '100%', height: '100%'}} maxZoom={9} minZoom={5} center={[51.505, -0.09]} zoom={6} scrollWheelZoom>
             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             {geoData && (
                 <GeoJSON key={geoData.features[0].id} onEachFeature={onEachGeoFeature} data={geoData} style={getGeoJsonStyles}/>
             )}
             <ZoomToFeature feature={selectedDistrict} popupContent={selectedDistrict?.properties[`name_${levelNumber}`]}/>
          </MapContainer>
          <ul className={styles.legendColorsList}>
             {MAP_DENSITY_COLORS.map((color, i) => (
                 <li key={color} className={styles.legendColorBoxWrapper}>
                    <div className={styles.legendColorBox} style={{
                       backgroundColor: color,
                       opacity: Math.max(0.1, LEGEND_DENSITY_OPACITY),
                    }}/>
                    <span>{MAX_DENSITY - i * COLOR_GRADE_DELTA}</span>
                 </li>
             ))}
          </ul>
       </div>
   );
};

export default observer(Map);
