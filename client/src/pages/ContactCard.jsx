import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContactLetterAvatar from "./ContactLetterAvatar";
import { useState } from "react";
import { DeleteContact } from "../api/deleteContact";
import { useDispatch } from "react-redux";
import {
  setContact,
  setNotification,
  toggleContactModal,
} from "../store/contactSlicer";
import { fetchContacts } from "../api/fetchContacts";

const moreOptions = ["Edit", "Delete"];

const ContactCard = ({ contactInfo }) => {
  const [anchorElOption, setAnchorElOption] = useState(null);
  const {
    _id: uniqueId,
    firstName,
    lastName,
    phoneNumber,
    email,
  } = contactInfo;

  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setAnchorElOption(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElOption(null);
  };

  const handleOptionClick = async (event, option, contactInfo) => {
    try {
      event.preventDefault();
      handleCloseMenu();

      if (option === moreOptions[0]) {
        dispatch(
          toggleContactModal({
            show: true,
            isEditing: true,
            isAdding: false,
            contactDetails: contactInfo,
          })
        );
      }

      if (option === moreOptions[1]) {
        const delResponse = await DeleteContact(uniqueId);
        dispatch(
          setNotification({
            show: true,
            message: delResponse.message,
            variant: "success",
          })
        );

        const fetchContactResp = await fetchContacts();
        if (fetchContactResp && !fetchContactResp?.error)
          dispatch(setContact({ contacts: fetchContactResp }));
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: "7rem",
        minWidth: "7rem",
        padding: "0.9rem",
      }}
    >
      <ContactLetterAvatar
        firstName={contactInfo?.firstName}
        lastName={contactInfo?.lastName}
      />
      <CardContent
        sx={{
          display: "grid",
          rowGap: "2px",
          flex: "1 0 auto",
          padding: "0.5rem",
          pl: "0.9rem",
        }}
      >
        <Typography
          component="div"
          variant="h6"
          fontFamily="Roboto"
          noWrap={true}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="div"
          noWrap={true}
          fontSize="0.9rem"
        >
          <b>Mobile Number : </b>
          {phoneNumber}
        </Typography>
        {email && (
          <Typography
            variant="body1"
            component="div"
            color="text.secondary"
            noWrap={true}
            fontSize="0.9rem"
          >
            <b>Email : </b>
            {email}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElOption}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElOption)}
          onClose={handleCloseMenu}
        >
          {moreOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={(event) => handleOptionClick(event, option, contactInfo)}
            >
              <Typography textAlign="center">{option}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Card>
  );
};

export default ContactCard;
