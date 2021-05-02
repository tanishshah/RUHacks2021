//mateirla ui template for tabs
//imports
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/List';
import BarChartIcon from '@material-ui/icons/BarChart';
import ImageIcon from '@material-ui/icons/Image';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ListEvents from './ListEvents';
import EditPerson from './EditPerson.js';
import DataVisual from './DataVisual.js';
import ImDisp from './ImDisp.js';

//colour theme
const theme = createMuiTheme({
  palette: {
    primary: {main: '#6200ea'},
    secondary: {main: '#ffffff'}
  }
});

//se up for TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

//style class
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
}));

//panel function
export default function Panel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          centered
        >
          <Tab label="View Events" icon={<ListIcon />} {...a11yProps(0)} />
          <Tab label="View Data" icon={<BarChartIcon />}  {...a11yProps(1)} />
          <Tab label="View Images"icon={<ImageIcon />}  {...a11yProps(2)} />
          <Tab label="Account Settings"icon={<PersonPinIcon />}  {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ListEvents/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataVisual/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImDisp/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EditPerson/>
      </TabPanel>
      </ThemeProvider>
    </div>
  );
}