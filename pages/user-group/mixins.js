import { required, alphaNum } from "vuelidate/lib/validators";

export const validations = {
    formData: {
        name: {
            required,
        },
        code: {
            required,
            alphaNum,
        },
    },
};
