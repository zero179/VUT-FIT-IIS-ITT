import * as yup from "yup";

export const accountValidationSchema = yup.object({
    email: yup.string()
        .email('Nesprávny formát')
        .required('Email je povinné pole'),
    password: yup.string()
        .required('Heslo je povinné pole'),
}).required();