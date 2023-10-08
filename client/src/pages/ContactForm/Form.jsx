import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { contactFormSchema } from "./FormSchema";
import { setContact, setLoading, setNotification, setSearchText, toggleContactModal } from "../../store/contactSlicer";
import { useEffect, useState } from "react";
import { updateContact } from "../../api/updateContact";
import { fetchContacts } from "../../api/fetchContacts";

const ContactForm = () => {
  const dispatch = useDispatch();

  // Data
  const formData = useSelector((state) => state.formData);
  const [initialFormData, setInitialFormData] = useState(formData);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    setInitialFormData(formData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Method
  const handleFormSubmit = async (values, onSubmitProps) => {
    dispatch(setLoading({loading: true}));

    // console.log('Form Submitted: ', values);
    // Update Contact Info API
    const response = await updateContact(values);
    // console.log('update contact response is: ', response);
    await onSubmitProps.resetForm();

    dispatch(toggleContactModal({ open: false }));
    dispatch(
      setNotification({
        show: true,
        message: response.message,
        variant: "success",
      })
    );

    const fetchContactResp = await fetchContacts();
        if (fetchContactResp && !fetchContactResp?.error) {
          dispatch(setContact({ contacts: fetchContactResp }));
          dispatch(setSearchText({ searchText: ""}));
        }

    dispatch(setLoading({loading: false}));
  };

  return (
      <Box
        width={"93%"}
        margin={"0 auto"}
        marginTop={'10px'}
        borderRadius="1.5rem"
        // backgroundColor={palette.background.alt}
      >
        {/* Form Header */}
        {/* <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {isAddContact?'Add Contact':'Update Contact'}
        </Typography> */}

        {/* Form Body */}
        <Formik
          initialValues={{...initialFormData}}
          validationSchema={contactFormSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Box
                display={'grid'}
                gap={'30px'}
                gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="First Name"
                  type="text"
                  name="firstName"
                  required
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn:'span 2' }}
                />
                <TextField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn:'span 2' }}
                />
                <TextField
                  label="Phone Number"
                  type="text"
                  name="phoneNumber"
                  required
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn:'span 4' }}
                />
                <TextField
                  label="Email ID"
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn:'span 4' }}
                />
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    m:"2rem 0",
                    p:"1rem",
                    "&:hover":{boxShadow: 'none'}
                  }}
                >
                  {'SAVE'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  );
};

export default ContactForm;
