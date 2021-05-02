//material ui grid list

//Imports
import Sample1 from './Images/sample1.png';
import Sample2 from './Images/sample2.png';
import Sample3 from './Images/sample3.png';
import Sample4 from './Images/sample4.png';
import Sample5 from './Images/sample5.png';
import Sample6 from './Images/sample6.png';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './../App.css';

//styles for components
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  }
}));

//Component to display images
export default function ImDisp() {
  const classes = useStyles();

  return (
    <div> {/*Component To show the images*/}
      <p className={"mainText"}>Recorded Images</p>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          <GridListTile>
            <img src={Sample1} alt={"Sample1"} />
          </GridListTile>
          <GridListTile>
            <img src={Sample2} alt={"Sample2"} />
          </GridListTile>
          <GridListTile>
            <img src={Sample3} alt={"Sample3"} />
          </GridListTile>
          <GridListTile>
            <img src={Sample4} alt={"Sample4"} />
          </GridListTile>
          <GridListTile>
            <img src={Sample5} alt={"Sample5"} />
          </GridListTile>
          <GridListTile>
            <img src={Sample6} alt={"Sample6"} />
          </GridListTile>
        </GridList>
      </div>
    </div>
  );
}