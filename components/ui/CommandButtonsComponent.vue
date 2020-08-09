<template lang="pug">
    .command__buttons
        .command__buttons-item(v-for="button in buttons")
            NuxtLink.btn.btn-light(
                v-if="button.type === 'link'"
                :to="button.url"
            )
                BIcon(:icon="button.icon")
            ConfirmButtonComponent.btn.btn-light(
                v-if="button.confirm"
                @confirm="button.onConfirm"
                :confirm-message="button.confirmMessage"
            )
                BIcon(:icon="button.icon")
</template>

<script>
import ConfirmButtonComponent from "@/components/ui/ConfirmButtonComponent";

export default {
    name: "CommandButtonsComponent",
    components: { ConfirmButtonComponent },
    props: {
        buttons: {
            type: Array,
            default: [],
        },
    },
};
</script>

<style scoped lang="scss">
.command__buttons {
    display: flex;
    justify-content: flex-end;

    @include media-breakpoint-down(xs) {
        justify-content: flex-start;
    }

    &-item {
    }
}
</style>
