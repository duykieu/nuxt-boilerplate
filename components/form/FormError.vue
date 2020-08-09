<template lang="pug">
    .form__error
        slot
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.form__error {
    color: $danger;
    font-size: 1.2rem;
}
</style>
