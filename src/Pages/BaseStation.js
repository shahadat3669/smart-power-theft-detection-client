import { Grid } from '@mui/material';
import React from 'react';
import Device from '../components/Device';

const BaseStation = ({ baseStation }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center">
      {baseStation.map(data => (
        <Grid item xs key={data._id}>
          <Device name={data.name} unit={data.unit} value={data.value} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BaseStation;
