<template lang="pug">
    .form__validation(v-if="validator.$anyDirty && validator.$invalid")
        .form__error(
            v-for="rule in rules"
        ) {{ $t('validation.'+rule, {field: $t('fields.'+name)}) }}
</template>

<script>
export default {
    name: "FormValidation",
    props: {
        name: {
            type: String,
            required: true,
        },
        validator: {
            type: Object,
            required: true,
        },
    },
    computed: {
        rules() {
            return Object.keys(this.validator.$params).map(rule => rule);
        },
    },
};
</script>

<style scoped lang="scss"></style>
