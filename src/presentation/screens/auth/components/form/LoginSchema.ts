import * as yup from 'yup';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo es requerido')
    .matches(emailRegex, 'Correo inválido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
});

export const registerSchema = loginSchema.concat(
  yup.object().shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es requerida'),
  }),
);
