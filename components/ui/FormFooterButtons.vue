<template lang="pug">
    .form__footer__buttons
        button.btn.btn.btn-primary(@click="$emit('save')") Lưu lại
        button.btn.btn-secondary(@click="$router.back()") Hủy bỏ
</template>

<script>
export default {
    name: "FormFooterButtons",
};
</script>

<style scoped lang="scss">
.form__footer__buttons {
    margin-top: 2rem;
    @include media-breakpoint-down(xs) {
        margin-top: 1rem;
    }

    button {
        &:not(:last-child) {
            margin-right: 1rem;
        }

        @include media-breakpoint-down(xs) {
            display: block;
            width: 100%;
            margin-bottom: 1rem;
            margin-right: 0;
        }
    }
}
</style>
