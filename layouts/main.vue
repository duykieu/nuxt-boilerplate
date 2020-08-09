<template lang="pug">
    .main__layout
        .main__layout--backdrop(:class="{active: showBackDrop}" @click="showBackDrop = false")
        .main__layout--overlay(@click="sidebarActive = false" v-if="sidebarActive")
        .main__sidebar.shadow-sm(:class="{active: sidebarActive}")
            SidebarComponent
        .main__view(:class="{full__width: !sidebarActive}")
            .main__header
                HeaderComponent(
                    @toggleSidebar="sidebarActive = !sidebarActive"
                    @showBackDrop="showBackDrop = true"
                    :sidebarActive="sidebarActive"
                )
            .main__content
                .main__content--content
                    Nuxt

</template>
<script>
import Vue from "vue";
import SidebarComponent from "~/components/ui/SidebarComponent";
import HeaderComponent from "~/components/ui/HeaderComponent";

export default {
    name: "MainLayout",
    components: {
        SidebarComponent,
        HeaderComponent,
    },
    data() {
        return {
            sidebarActive: true,
            showBackDrop: false,
        };
    },
    beforeCreate() {
        if (this.$store.state.auth.token)
            this.$axios.setToken(this.$store.state.auth.token, "Bearer");
    },
    mounted() {
        this.$store.watch(
            state => state.error,
            ({ code, message }) => {
                if (message) {
                    this.$notification("error", message);
                    return this.$store.commit("error/unset");
                }
                if (code) {
                    this.$notification("error", this.$t("error." + code));
                    this.$store.commit("error/unset");
                }
            },
            { deep: true },
        );

        Vue.prototype.$commitError = error => {
            this.$store.commit("error/set", error);
        };
    },
};
</script>
<style lang="scss">
.main__layout {
    @include fixed-full-screen;
    background-color: $gray-200;

    &--overlay {
        @include fixed-full-screen;
        background-color: rgba($gray-900, 0.2);
        z-index: 2;
        display: none;
    }

    &--backdrop {
        z-index: 4;
        @include fixed-full-screen;
        background-color: rgba($gray-900, 0.2);
        display: none;
    }

    .main__sidebar {
        width: 25rem;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        background-color: $main-dark-color;
        z-index: 3;
        overflow-x: hidden;
        display: none;

        &.active {
            display: flex;
        }
    }

    .main__view {
        flex: 1;
        position: fixed;
        left: 25rem;
        top: 0;
        background-color: $gray-200;
        height: 100%;
        width: calc(100% - 25rem);
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include media-breakpoint-down(sm) {
            //left: 0;
        }

        &.full__width {
            width: 100%;
            left: 0;
        }

        .main__content {
            flex: 1;
            padding: 2rem;
            overflow-y: auto;
            @include media-breakpoint-down(sm) {
                width: 100%;
            }

            &--content {
                max-width: 1000px;
                margin: auto;
                padding-bottom: 5rem;
            }
        }
    }
}
</style>
