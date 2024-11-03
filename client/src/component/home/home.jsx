import Banner from '../banner/banner';
import Categories from '../home/catagories';
import Posts from '../home/post/posts';
import { Grid } from '@mui/material';

const home = () => {
    return (
      <>
      <Banner/>
      <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
              <Posts/>
                </Grid>
            </Grid>
      </>
    

         );
};
export default home;