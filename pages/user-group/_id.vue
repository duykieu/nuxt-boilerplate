<template lang="pug">
    include ./permissions
    .form__page
        PageTitleComponent Tạo nhóm người dùng
        .form-row
            .col-sm-6
                Input(
                    label="Tên nhóm"
                    :validator="$v.formData.name"
                    name="name"
                )
            .col-sm-6
                Input(
                    label="Mã nhóm"
                    :validator="$v.formData.code"
                    name="code"
                )
        +permissionsList
        FormFooterButtons(@save="onSubmit")
</template>

<script>
import { mapState } from "vuex";
import PageTitleComponent from "@/components/ui/PageTitleComponent";
import FormFooterButtons from "@/components/ui/FormFooterButtons";
import { validations } from "@/pages/user-group/mixins";
import FormValidation from "@/components/form/FormValidation";

import "./style.scss";

export default {
    name: "UserGroupEdit",
    components: { FormValidation, FormFooterButtons, PageTitleComponent },
    layout: "main",
    validations,
    data() {
        return {
            formData: {
                name: null,
                code: null,
                permissions: [],
            },
        };
    },

    computed: {
        ...mapState({
            allPermissions: state => state.auth.allPermissions,
        }),
    },
    mounted() {
        this.$store.dispatch("auth/fetchPermissions");
        this.$api.User_Group.Show(this.$route.params.id)
            .then(({ data: { entries } }) => {
                this.formData = entries.userGroup;
            })
            .catch(this.$commitError);
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

            this.$api.User_Group.Update(this.$route.params.id, this.formData)
                .then(() => {
                    this.$notification("success", "Sửa nhóm thành công");
                    this.$router.push("/user-group");
                })
                .catch(this.$commitError);
        },
    },
};
</script>
