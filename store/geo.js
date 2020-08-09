export const state = () => ({
    states: null,
    cities: null,
    wards: null,
    streets: null,
    projects: null,
    state: null,
    city: null,
    street: null,
    ward: null,
    project: null,
});

export const mutations = {
    setStates(state, payload) {
        state.states = payload;
    },

    setState(state, payload) {
        state.state = payload;
    },

    unsetStates(state) {
        state.states = null;
    },

    unsetState(state) {
        state.state = null;
    },

    setCities(state, payload) {
        state.cities = payload;
    },
    setCity(state, payload) {
        state.city = payload;
    },

    unsetCities(state) {
        state.cities = null;
    },

    unsetCity(state) {
        state.city = null;
    },

    setWards(state, payload) {
        state.wards = payload;
    },

    setWard(state, payload) {
        state.ward = payload;
    },

    unsetWards(state) {
        state.wards = null;
    },

    unsetWard(state) {
        state.ward = null;
    },

    setStreets(state, payload) {
        state.streets = payload;
    },

    setStreet(state, payload) {
        state.street = payload;
    },

    unsetStreets(state) {
        state.streets = null;
    },

    unsetStreet(state) {
        state.street = null;
    },

    setProjects(state, payload) {
        state.projects = payload;
    },

    setProject(state, payload) {
        state.project = payload;
    },

    unsetProjects(state) {
        state.projects = null;
    },

    unsetProject(state) {
        state.project = null;
    },
};

export const actions = {
    fetchStates({ commit }) {
        this._vm.$api.Geo.Get_States()
            .then(({ data: { entries } }) => {
                commit("setStates", entries.states);
            })
            .catch(this.$commitError);
    },
    fetchCities({ commit }, stateId) {
        this._vm.$api.Geo.Get_Cities(stateId)
            .then(({ data: { entries } }) => {
                commit("setCities", entries.cities);
            })
            .catch(this.$commitError);
    },
    fetchWards({ commit }, { stateId, cityId }) {
        this._vm.$api.Geo.Get_Wards(stateId, cityId)
            .then(({ data: { entries } }) => {
                commit("setWards", entries.wards);
            })
            .catch(this.$commitError);
    },
    fetchStreets({ commit }, { stateId, cityId }) {
        this._vm.$api.Geo.Get_Streets(stateId, cityId)
            .then(({ data: { entries } }) => {
                commit("setStreets", entries.streets);
            })
            .catch(this.$commitError);
    },
    fetchProjects({ commit }, { stateId, cityId }) {
        this._vm.$api.Geo.Get_Projects(stateId, cityId)
            .then(({ data: { entries } }) => {
                commit("setProjects", entries.projects);
            })
            .catch(this.$commitError);
    },
};
