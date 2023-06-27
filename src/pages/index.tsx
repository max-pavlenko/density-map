import 'leaflet/dist/leaflet.css';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import Map from "@/app/features/map/components/Map";
import MapStore from "@/store/Map";
import {AdministrativeLevel} from "@/app/features/map/types/Map";
import {observer} from "mobx-react-lite";
import SideBar from "@/app/shared/layout/components/SideBar";

const PAGE_HEIGHT = 700;

const IndexPage = () => {
   return (
       <Container>
          <Grid sx={{height: PAGE_HEIGHT}} container spacing={2}>
             <Grid item xs={3}>
               <SideBar />
             </Grid>
             <Grid item xs>
                <Map/>
             </Grid>
          </Grid>
       </Container>
   );
};

export default IndexPage;
