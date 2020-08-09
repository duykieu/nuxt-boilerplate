<template lang="pug">
    .login__form
        .login__form-content
            h1 LOGIN
            p You must login with higher right
            Input(
                label="Username"
            )
            Input(
                label="Password"
                class="password"
            )
            button.btn.btn-primary.btn-block Switch user
            button.btn.btn-secondary.btn-block(@click="$emit('cancel')") Cancel


</template>
<script>
import Input from "./Input";

export default {
    components: {
        Input,
    },
};
</script>
<style lang="scss">
@import "@/assets/styles/main.scss";

.login__form {
    background-color: rgba($color: #000000, $alpha: 0.4);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;

    &-content {
        width: 35rem;
        max-width: 100%;
        padding: 2.5rem;
        background-color: $white;
        border-radius: $border-radius;

        h1 {
            font-size: 2.5rem;
            text-transform: uppercase;
            text-align: center;
        }

        p {
            text-align: center;
            font-style: italic;
        }

        .password {
            margin-bottom: 2rem;
        }
    }
}
</style>
