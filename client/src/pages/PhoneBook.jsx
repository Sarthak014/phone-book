import { useEffect } from "react";
import { fetchContacts } from "../api/fetchContacts";
import NoContactBox from "./Errors/NoContactFound";
import ContactBox from "./ContactBox";
import BackDrop from "./BackDrop";
import { useDispatch, useSelector } from "react-redux";
import { setContact, setLoading } from "../store/contactSlicer";

const PhoneBook = () => {
  const contacts = useSelector((state) => state.contacts);
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const getContacts = async () => {
    const response = await fetchContacts();

    if (response && !response?.error) dispatch(setContact({contacts: response}));
  }

  useEffect(() => {
    dispatch(setLoading({loading: true}));
  
    getContacts()
      .finally(() => dispatch(setLoading({loading: false})));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? <BackDrop toggle={isLoading} /> : null }
      {!isLoading && contacts.length && <ContactBox /> }
      {!isLoading && !contacts.length ? <NoContactBox /> : null}
    </>
  );
};

export default PhoneBook;
