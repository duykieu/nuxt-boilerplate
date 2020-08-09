<template lang="pug">
    Button(v-bind="$props" @click="click")
        slot
</template>
<script>
export default {
    props: {
        confirmMessage: String,
    },
    methods: {
        click() {
            const { confirmMessage } = this;
            this.$confirm({
                title: "Xin hãy xác nhận",
                content: confirmMessage,
                onOk: () => {
                    this.$emit("confirm");
                },
            });
        },
    },
};
</script>
