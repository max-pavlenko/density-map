import {makeAutoObservable} from 'mobx';
import {AdministrativeLevel, AdminNumberLevel, DensityData, Feature, GeoData, GeoJSON, GeoJSONFeature} from "@/app/features/map/types/Map";
import axios from "axios";
import {ENV_VARS} from "@/config/EnvVars";
import merge from 'lodash.merge';

class MapStore {
   adminLevel = AdministrativeLevel.TWO;
   levelNumber: AdminNumberLevel = this.convertLevelStrToNumber();
   geoData: GeoData | null = null;
   selectedDistrict: Feature | null = null;
   isLoadingGeoData = true;

   constructor() {
      makeAutoObservable(this);
      this.fetchAdminLevelData().then();
   }

   async fetchAdminLevelData() {
      const {geoJsonUrl, JsonUrl} = getAdminLevelAPIUrl(this.levelNumber);

      this.isLoadingGeoData = true;
      const [geoJSONResponse, densityDataResponse] = await Promise.all([
         axios.get<GeoJSON<GeoJSONFeature>>(geoJsonUrl),
         axios.get<GeoJSON<DensityData>>(JsonUrl)
      ]);
      const newGeoJSON = geoJSONResponse.data;
      const densityData = densityDataResponse.data;
      newGeoJSON.features = newGeoJSON.features.map((feature, i) => merge(feature, densityData.features[i]));

      this.setGeoJSON(newGeoJSON as GeoData);
      this.isLoadingGeoData = false;
   }

   async setAdminLevel(level: AdministrativeLevel) {
      this.adminLevel = level;
      this.convertLevelStrToNumber();
      await this.fetchAdminLevelData();
   }

   setGeoJSON(geoJSON: typeof this.geoData) {
      this.geoData = geoJSON;
   }

   setSelectedDistrict(district: typeof this.selectedDistrict) {
      this.selectedDistrict = district;
   }

   convertLevelStrToNumber() {
      this.levelNumber = +this.adminLevel.replace('level', '') as AdminNumberLevel;
      return this.levelNumber;
   }
}

export default new MapStore();

function getAdminLevelAPIUrl(levelNumber: number) {
   return {
      geoJsonUrl: `${ENV_VARS.API_URL}/great_britain_${levelNumber}.geojson`,
      JsonUrl: `${ENV_VARS.API_URL}/data_great_britain_${levelNumber}.json`
   }
}
