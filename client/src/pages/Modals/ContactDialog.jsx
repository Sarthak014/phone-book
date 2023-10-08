import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleContactModal } from '../../store/contactSlicer';
import ContactForm from '../ContactForm/Form';

const ContactDialog = () => {
  const dispactch = useDispatch();
  const theme = useTheme();

  const { open } = useSelector((state) => state.showModal);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispactch(
      toggleContactModal({ show: false })
    );
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll="paper"
        onClose={handleClose}
        aria-labelledby="contact-title"
      >
        <DialogTitle id="contact-title" variant='h5' fontWeight={"500"}>
          {'Contact Details'}
        </DialogTitle>
        <DialogContent>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactDialog;
