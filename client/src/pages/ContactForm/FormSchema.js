import { object, string } from "yup";

export const contactFormSchema = object().shape({
  firstName: string().min(3, 'Too Short!').max(12, 'Too Long!').required('Field Required'),
  lastName: string().min(3, 'Too Short!').max(12, 'Too Long!').notRequired(),
  phoneNumber: string().min(8, 'Invalid phone number').max(10, 'Invalid phone number').required('Field Required'),
  email: string().email("Invalid email").notRequired()
});
