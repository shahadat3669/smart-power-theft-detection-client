import logo from './logo.svg';
import './App.css';
import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider } from '@mui/material'
const mdTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                sfasdf
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                sadf
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box></ThemeProvider>
  );
}

export default App;
