import API from "./axios-helper";

export const updateContact = async (contactInfo) => {
  const id = contactInfo._id;
  const formData = {...contactInfo, phoneNumber: Number(contactInfo['phoneNumber'])};
  
  console.log('form data is:', formData);
  return API({
    method: 'PATCH',
    url:`/user/update/${id}`,
    headers: {"Content-Type": "application/json"},
    data: formData
  })
    .then((res) => res.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);
    });
};
