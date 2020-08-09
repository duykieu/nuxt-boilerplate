<template lang="pug">
    VueSelect(
        :options="cities"
        :reduce="item => item._id"
        label="name"
        v-model="id"
        placeholder="Chọn quận/huyện"
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
        cities: state => state.geo.cities,
        state: state => state.geo.state,
    }),
    watch: {
        state: {
            handler(value) {
                this.id = null;
                if (value) {
                    this.$store.dispatch("geo/fetchCities", value);
                }
            },
        },
        id: {
            handler(value) {
                this.$store.commit("geo/setCity", value);
            },
        },
    },
};
</script>
