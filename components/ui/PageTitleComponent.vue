<template lang="pug">
    .page__title--container
        .page__title
            slot
</template>
<script>
export default {
    name: "PageTitleComponent",
};
</script>
<style lang="scss">
.page__title--container {
    margin-bottom: 2rem;
}

.page__title {
    color: $main-dark-color;
    border-bottom: 0.2rem solid $main-dark-color;
    display: inline-block;
}
</style>
