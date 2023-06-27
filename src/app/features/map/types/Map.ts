import {BBox, GeoJsonTypes, Geometry} from "geojson";

export enum AdministrativeLevel {
   ONE = 'level1',
   TWO = 'level2'
}

export type DensityData = {
   properties: { Density: number; }
};

type Coordinate = [number, number];

export interface GeoJSONFeature {
   type: GeoJsonTypes;
   id: string;
   geometry: {
      type: Geometry,
      coordinates: Coordinate[][];
   };
   bbox: BBox;
   properties: {
      name_0: string,
      name_1: string,
      name_2?: string,
   };
}

export type GeoJSON<T extends Record<string, any>> = {
   type: GeoJsonTypes;
   features: T[];
};

export type AdminNumberLevel = 1 | 2;
export type Feature = GeoJSONFeature & DensityData;
export type GeoData = GeoJSON<Feature>;
