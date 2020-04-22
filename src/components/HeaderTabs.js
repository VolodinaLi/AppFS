import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Main from './Main';
import Character from './Character';
import Task from './Task';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      className="TabContent"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <div p={3}>{children}</div>}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Главный экран" {...a11yProps(0)} />
          <Tab label="Персонаж" {...a11yProps(1)} />
          <Tab label="Задания" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Main/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Character/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Task database={props.database}/>
      </TabPanel>
    </div>
  );
}
