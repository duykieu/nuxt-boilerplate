<template>
    <div class="form-check">
        <input v-model="inputVal" type="checkbox" class="form-check-input" />
        <label class="form-check-label">{{ $t(label) }}</label>
    </div>
</template>

<script>
export default {
    props: ["label", "size", "type", "placeholder", "error", "value"],
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
    },
};
</script>

<style lang="scss" scoped>
.form-check {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    label.form-check-label {
        margin-bottom: 0;
        padding-left: 0.5rem;
        margin-bottom: -0.3rem;
    }
}
</style>