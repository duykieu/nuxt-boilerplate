<template lang="pug">
    VueSelect(
        :options="wards"
        :reduce="item => item._id"
        label="name"
        v-model="id"
        placeholder="Chọn phường/xã"
    )
</template>

<script>
import { mapState } from "vuex";

export default {
    model: {},
    data() {
        return {
            id: null,
        };
    },

    computed: mapState({
        wards: state => state.geo.wards,
        city: state => state.geo.city,
        state: state => state.state,
    }),

    watch: {
        id: {
            handler(value) {
                this.$store.commit("geo/setWard", value);
            },
        },
        city: {
            handler(value) {
                this.$store.dispatch("geo/fetchWards", {
                    cityId: value,
                    stateId: this.state,
                });
            },
        },
    },
};
</script>
