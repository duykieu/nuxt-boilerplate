<template lang="pug">
    include ./mixins
    .form__page
        PageTitleComponent Tạo người dùng mới
        +formDom
        FormFooterButtons(@save="onSubmit")
</template>

<script>
import { mapState } from "vuex";
import { DatePicker } from "ant-design-vue";
import PageTitleComponent from "@/components/ui/PageTitleComponent";
import FormFooterButtons from "@/components/ui/FormFooterButtons";
import { validations } from "@/pages/user/mixins";
import FormValidation from "@/components/form/FormValidation";
import Select from "@/components/form/Select";
import ImagePreviewComponent from "@/components/ui/ImagePreviewComponent";

export default {
    name: "UserCreate",
    meta: {
        permission: "UserCreate",
    },
    components: {
        ImagePreviewComponent,
        Select,
        FormValidation,
        FormFooterButtons,
        PageTitleComponent,
        DatePicker,
    },
    layout: "main",
    validations: validations(true),
    data() {
        return {
            formData: {
                fullName: null,
                displayName: null,
                email: null,
                phoneNumber: null,
                password: null,
                passwordConfirm: null,
                userGroup: null,
                idNumber: null,
                idIssuePlace: null,
                idIssueDate: null,
                subPhoneNumber: null,
                address: null,
                dateOfBirth: null,
            },
            image: null,
            file: null,
            editPasswordOption: false,
            showEditPassword: true,
        };
    },

    computed: {
        ...mapState({
            userGroups: state => state.auth.userGroupsList,
        }),
    },
    mounted() {
        this.$store.dispatch("auth/fetchUserGroupsList");
    },
    methods: {
        onSubmit() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return this.$notification("error", "Bạn chưa nhập đủ thông tin");
            }

            this.$nextTick(() => {
                this.$nuxt.$loading.start();
            });

            this.$api.User.Store(this.formData)
                .then(() => {
                    this.$notification("success", "Tạo nhóm người dùng thành công");
                    this.$router.push("/user");
                })
                .catch(this.$commitError);
        },

        fileChange({ target: { files } }) {
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onImageDelete() {
            this.image = null;
            document.getElementById("input__file").value = "";
        },
    },
};
</script>

<style lang="scss">
.input__file {
    margin-bottom: 1rem;
}

.avatar__selector {
    max-width: 20rem;
}
</style>
