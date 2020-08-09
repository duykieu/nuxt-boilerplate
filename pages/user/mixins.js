import { required, email, numeric, sameAs } from "vuelidate/lib/validators";

export const validations = (editPassword = true) => {
    let validation = {
        formData: {
            fullName: {
                required,
            },
            displayName: {
                required,
            },
            email: {
                required,
                email,
            },
            phoneNumber: {
                required,
                numeric,
            },
            userGroup: {
                required,
            },
            idNumber: {
                numeric,
            },
            idIssuePlace: {},
            idIssueDate: {},
            subPhoneNumber: {
                numeric,
            },
            address: {},
            dateOfBirth: {},
        },
    };

    if (editPassword) {
        validation = {
            ...validation,
            formData: {
                ...validation.formData,
                password: {
                    required,
                },
                passwordConfirm: {
                    required,
                    sameAs: sameAs("password"),
                },
            },
        };
    }

    return validation;
};
