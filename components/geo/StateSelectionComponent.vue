<template lang="pug">
    VueSelect(
        :options="states"
        :reduce="item => item._id"
        label="name"
        v-model="id"
        placeholder="Chọn tỉnh/thành"
    )
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            id: null,
        };
    },

    computed: mapState({
        states: state => state.geo.states,
    }),

    watch: {
        id: {
            handler(value) {
                this.$store.commit("geo/setState", value);
            },
        },
    },

    mounted() {
        this.$store.dispatch("geo/fetchStates");
    },
};
</script>
