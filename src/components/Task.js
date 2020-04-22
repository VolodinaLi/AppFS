import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TaskNavigation from './TaskNavigation';
import TaskContent from './TaskContent';
import CircularProgress from '@material-ui/core/CircularProgress';



function TabPanel(props) {
  const { children, value, index} = props;

  return (
    <div
      component="div"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    width: '100%'
  },
  navigation: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '200px',
    width: '30%'
  }
}));


async function getNavigationData(database, callBack) {
  let ref = database.ref('/subjects');
  await ref.on('value', callBack);
}

export default function Task(props) {
  const [data, setData] = useState(0); 
  const classes = useStyles();
  const [selectedId, setSelectedId] = React.useState(1);
  let callBack = snapshot => {
    setData(snapshot.val());

  };
  if(!data)
    getNavigationData(props.database, callBack);
  const SelectedIdChangedHandler = (newValue) => {
    setSelectedId(newValue);
  };
    return (
      <div className={classes.root}>
      {
        data ? 
        (<TaskNavigation className={classes.navigation} data={data} onSelectedIdChanged={SelectedIdChangedHandler}/>):
        (<CircularProgress />)
      }
        
        <div className={classes.content}>
          <TaskContent selectedId={selectedId} database={props.database}/>
        </div>
      </div>
    );
}
