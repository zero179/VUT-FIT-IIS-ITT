import * as yup from "yup";

export const personValidationSchema = yup.object({
    firstName: yup.string()
        .max(50, 'Křestní jméno nemůže mít více než 50 znaků')
        .required('Křestní jméno je povinné pole'),
    lastName: yup.string()
        .max(50, 'Příjmení nemůže mít více než 50 znaků')
        .required('Příjmení je povinné pole'),
    phoneNumber: yup.string().matches(/^[0-9]{9}$/, 'Nesprávny formát telefonního čísla'),
}).required();