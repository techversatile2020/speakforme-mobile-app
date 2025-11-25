import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string().required('Old password is required'),
  password: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#^()+_=<>/\\|.,;:-]/,
      'Password must contain one special character',
    ),

  confirm_password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
