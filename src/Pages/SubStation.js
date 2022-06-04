import { Grid } from '@mui/material';
import React from 'react';
import Device from '../components/Device';

const SubStation = ({ subStation }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center">
      {subStation.map(data => (
        <Grid item xs key={data._id}>
          <Device name={data.name} unit={data.unit} value={data.value} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubStation;
