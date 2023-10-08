import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({toggle}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={toggle}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackDrop;