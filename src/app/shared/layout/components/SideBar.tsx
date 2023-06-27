import {FC, MouseEventHandler} from 'react'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import MapStore from "@/store/Map";
import {AdministrativeLevel, Feature} from "@/app/features/map/types/Map";
import {observer} from "mobx-react-lite";
import styles from '../../../../styles/SideBar.module.scss'
import Loader from "@/app/shared/ui/Loader";

type Props = {};

const SideBar: FC<Props> = ({}) => {
   const {adminLevel, isLoadingGeoData} = MapStore;

   const handleAdminOptionChange = async (event: SelectChangeEvent) => {
      const selectedAdminLevel = event.target.value as AdministrativeLevel;
      await MapStore.setAdminLevel(selectedAdminLevel);
   };

   const handleDistrictClick = (feature: Feature): MouseEventHandler<HTMLButtonElement> => {
      return () => {
         MapStore.setSelectedDistrict(feature);
      }
   }

   return (
       <Stack sx={{height: '100%'}}>
          <FormControl fullWidth>
             <InputLabel>Administ. level</InputLabel>
             <Select value={adminLevel} label="Administ. level" onChange={handleAdminOptionChange}>
                {Object.entries(AdministrativeLevel).map(([key, level], i) => (
                    <MenuItem key={level} value={level}>Level {i + 1}</MenuItem>
                ))}
             </Select>
          </FormControl>

          {isLoadingGeoData ? <Loader/> : <ul className={styles.districtsList}>
             {MapStore.geoData?.features.map((feature) => {
                const {id, properties} = feature;

                return (
                    <li key={id}>
                       <button onClick={handleDistrictClick(feature)} className={styles.district}>
                          {properties[`name_${MapStore.levelNumber}`]}
                       </button>
                    </li>
                )
             })}
          </ul>}
       </Stack>
   );
};

export default observer(SideBar);
