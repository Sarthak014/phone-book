import { Box, Grid } from "@mui/material";
import ContactCard from "./ContactCard";
import MessageBar from "./MessageBar";
import ContactDialog from "./Modals/ContactDialog";
import AddContactButton from "./AddContactButton";
import { useSelector } from "react-redux";

const ContactBox = () => {
  const contacts = useSelector((state) => state.contacts);
  const filteredContacts = useSelector((state) => state.filteredContacts);

  return (
    <>
      <MessageBar />
      <ContactDialog />
      <Box sx={{ flexGrow:1, m:'2rem 2rem 0 2rem' }}>
        <Grid
          container={true}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          columnSpacing={3}
          rowGap={4}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {(filteredContacts ? filteredContacts : contacts).map((contact, index) => (
            <Grid item xs={6} sm={4} key={contact?._id || index}>
              <ContactCard contactInfo={contact} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <AddContactButton />
    </>
  );
};

export default ContactBox;
