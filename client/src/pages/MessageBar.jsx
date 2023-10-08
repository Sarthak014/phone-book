import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { setNotification } from "../store/contactSlicer";

const MessageBar = () => {
  const { show, message, variant } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  return (
    <Box sx={{ width:'100%' }}>
      <Collapse in={show}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(setNotification({ show:false, message:'' }));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={variant}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default MessageBar;
