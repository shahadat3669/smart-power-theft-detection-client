import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import * as api from '../features/api';
import BaseStation from './BaseStation';
import SubStation from './SubStation';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [stationData, setStationData] = useState({
    baseStation: [],
    subStation: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(user));
    if (!user) {
      navigate('login');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const baseData = [];
      const subData = [];
      const data = await api.getStations();
      data.data.devices.forEach(i => {
        if (i.stationType === 0) {
          baseData.push(i);
        } else {
          subData.push(i);
        }
      });
      const newStationData = {
        baseStation: baseData,
        subStation: subData,
      };
      setStationData(newStationData);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}>
              <Typography variant="h4">Base Station</Typography>
              <BaseStation baseStation={stationData.baseStation} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}>
              <Typography variant="h4">Sub Station</Typography>
              <SubStation subStation={stationData.subStation} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
