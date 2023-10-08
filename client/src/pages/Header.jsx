import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchBar from './SearchBar';
import { Box } from '@mui/material';

const NavigationBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalLibraryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'block', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                flexGrow: 1,
              }}
            >
              Phone Book
            </Typography>
            <SearchBar />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default NavigationBar;
