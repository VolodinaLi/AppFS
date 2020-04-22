import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TasksForm from './TasksForm';
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

async function getData(database,selectedId, callBack) {
  let ref = database.ref('/topics/'+ selectedId);
  await ref.on('value', callBack);
}

export default function TaskContent(props) {
  const [data, setData] = useState(0); 
  const [selectedId, setSelectedId] = useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let callBack = snapshot => {
    setData(snapshot.val());
  };
  if (selectedId !== props.selectedId) {
    setData(null);
    setSelectedId(props.selectedId);
  }
  if(!data)
    getData(props.database, selectedId, callBack);

    return (
      <div className={classes.root}>
          <AppBar  position="static" color="default">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Теория" {...a11yProps(0)} />
              <Tab label="Практика" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>

          {
            data ? 
            (
              <>
                <Typography variant='h4'>{data.title}</Typography>
                <Typography>{data.theory.content}</Typography>
              </>
            ):
            (
              <CircularProgress />
            )
          }
          </TabPanel>
          <TabPanel value={value} index={1}>
          {
            data ? 
            (
              <>
              <Typography variant='h4'>{data.title}</Typography>
              {
                data.practice.content ? 
                (<Typography>{data.practice.content}</Typography>) : 
                (<TasksForm tasks={data.practice.tasks} answers={data.practice.answers}/>)
              }
              </>
            ):
            (
              <CircularProgress />
            )
          }
            
          </TabPanel>
      </div>
    );
}
