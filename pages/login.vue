<template lang="pug">
    .login__page
        .login__form
            h1 Login
            p Enter your credentials
            Input(
                label="Username"
                v-model="credentials.username"
                :validator="$v.credentials.username"
                @onEnter="postLogin"
                name="username"
            )
            Input(
                label="Password"
                type="password"
                v-model="credentials.password"
                :validator="$v.credentials.password"
                @onEnter="postLogin"
                name="password"
            )
            button.btn.btn-primary.btn-block(
                :disabled="loading"
                @click="postLogin"
            ) {{ !loading ? 'Start Login' : ''}}

</template>

<script>
import { required } from "vuelidate/lib/validators";

const schema = {
    credentials: {
        username: {
            required,
        },
        password: {
            required,
        },
    },
};

export default {
    name: "LoginPage",
    data() {
        return {
            loading: false,
            credentials: {
                username: "",
                password: "",
            },
        };
    },
    validations: schema,
    mounted() {
        const { token, user, permissions } = this.$store.state.auth;
        if (!token || !user || !permissions) {
            return this.$router.push("/");
        }
    },
    methods: {
        postLogin() {
            if (this.$v.$invalid)
                return this.$notification("error", "Bạn chưa nhập đủ thông tin");

            this.$api.Auth.Login(this.credentials)
                .then(({ data: { success, message, data } }) => {
                    if (!success) return this.$notification("error", message);
                    this.$store.commit("auth/set", data);
                    this.$router.push("/");
                })
                .catch(({ message, ...rest }) => {
                    this.$notification("error", "Có vẻ như có lỗi kết nối máy chủ");
                    this.$log(rest);
                });
        },
    },
};
</script>

<style lang="scss">
.login__page {
    @include fixed-full-screen;
    @include flex-center;

    .login__form {
        width: 35rem;
        max-width: 100%;
        padding: 2rem;

        h1 {
            text-align: center;
        }

        p {
            text-align: center;
            font-style: italic;
        }

        button {
            margin-top: 3rem;

            svg {
                display: flex;
            }

            animation: all 300ms ease-in;
        }
    }
}
</style>
