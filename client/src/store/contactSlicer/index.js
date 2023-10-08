import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state.js";

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact: (state, action) => {
      const contacts = action.payload.contacts;

      if (contacts) {
        state.contacts = contacts;
      } else {
        console.error("Store Error: Cannot update contact info.");
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },

    setNotification: (state, action) => {
      const { show, message, variant } = action.payload;

      state.notification = { show: show, message: message, variant: variant };
    },

    setFormType: (state, action) => {
      state.formType = action.payload.formType;
    },

    toggleContactModal: (state, action) => {
      const { show, isEditing, isAdding, contactDetails } = action.payload;
      console.log('action payload', action.payload);

      if (show) {
        state.showModal.open = show;

        if (isEditing && contactDetails) {
          state.showModal.editModal = isEditing;
          state.formData = {
            ...state.formData,
            ...contactDetails,
            phoneNumber:contactDetails.phoneNumber?.toString()
          };
        } else if (isAdding) {
          console.log('in else if');
          state.showModal.addContactModal = isAdding;
          state.formData = { firstName: "", lastName: "", email: "", phoneNumber: "" };
        } else {
          state.notification = {show:true, message:"Something went wrong. Please try again.", variant:"error"};
        }
      } else {
        state.showModal = {open:false, editModal:false, addContactModal:false};
        state.formData = { firstName: "", lastName: "", email: "", phoneNumber: "" };
      }
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload.searchText;
    },

    updateFilteredContact: (state) => {
      if (!state.searchText.length) {
        state.filteredContacts = null;
        return;
      }

      const contactToDisplay = state.contacts.filter(({firstName, lastName}) => {
          let fullName = firstName+" "+lastName;
          fullName = fullName.toLowerCase();

          return fullName.includes(state.searchText.toLowerCase());
        });

        state.filteredContacts = contactToDisplay;
    }
  }
});

export const {setContact, setLoading, setNotification, setFormType, toggleContactModal, setSearchText, updateFilteredContact} = contactSlice.actions;

export default contactSlice.reducer;
