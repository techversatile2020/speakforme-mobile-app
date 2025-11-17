import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),

  email: Yup.string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),

  phone: Yup.string()
    .trim()
    .matches(/^\d{7,15}$/, 'Enter valid phone number')
    .required('Phone number is required'),

  country: Yup.object().shape({
    callingCode: Yup.string().required('Phone code missing'),
    letterCode: Yup.string().required('Country code missing'),
  }),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('Password is required'),
});
