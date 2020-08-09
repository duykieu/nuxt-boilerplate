<template lang="pug">
    .form-group
        label {{ label }}
        BInput.form-control(
            @keyup.enter="$emit('onEnter')"
            v-bind="$props"
            v-model="validator.$model"
            :type="type || 'text'"
        )
        .form__error(
            v-if="validator.$anyDirty && validator.$invalid"
            v-for="error in errorMessages"
        ) {{ error }}
</template>

<script>
export default {
    props: ["label", "size", "validator", "name", "type"],

    computed: {
        internalSize() {
            return this.size ? `input-${size}` : "";
        },
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        errors() {
            if (!this.validator) return [];
            if (!this.validator.$error) return [];
            const rules = Object.keys(this.validator.$params);
            const { validator } = this;
            return rules.filter(rule => !validator[rule]);
        },
        errorMessages() {
            if (!this.label) return [];
            return this.errors.map(rule => {
                return this.$t("validation." + rule, {
                    field: this.$t("fields." + this.name),
                });
            });
        },
    },
};
</script>

<style lang="scss"></style>
