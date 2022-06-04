import { Box, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import { Route, Routes, Outlet, useNavigate, BrowserRouter } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
const mdTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
