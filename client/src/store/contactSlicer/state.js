export const initialState = {
  contacts: null,
  loading: false,
  notification: { show: false, message: "", variant: "" },
  formType: null,
  showModal: { open: false, editModal: false, addContactModal: false },
  formData: { firstName: "", lastName: "", email: "", phoneNumber: "" },
  searchText: "",
  filteredContacts: null,
};
