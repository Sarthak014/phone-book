import { Zoom, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { toggleContactModal } from "../store/contactSlicer";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const AddContactButton = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const addFab = {
    color: "primary",
    sx: fabStyle,
    icon: <AddIcon />,
    label: "Add Contact",
  };

  function addNewContact() {
    console.log('add icon clicked');
    dispatch(
      toggleContactModal({
        show: true,
        isEditing: false,
        isAdding: true,
        // newContact: {} as IContact, // TODO: fix this hacky way of passing an empty object to the modal component
      })
    );
  }

  return (
    <Zoom
      key={addFab.color}
      in={true}
      timeout={transitionDuration}
      unmountOnExit
    >
      <Fab
        component='div'
        sx={addFab.sx}
        aria-label={addFab.label}
        color={addFab.color}
        onClick={addNewContact}
        // onDoubleClick={addNewContact}
      >
        {/* <Box
          component='button'
          onClick={addNewContact}
        > */}
          {addFab.icon}
        {/* </Box> */}
      </Fab>
    </Zoom>
  );
};

export default AddContactButton;
