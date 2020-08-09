import createPersistedState from "vuex-persistedstate";

export default ({ store, $axios }) => {
    createPersistedState({
        key: "vuesx22s",
        paths: "localxxxx",
        rehydrated: () => {
            if (store.state.auth.token) $axios.setToken();
        },
    })(store);
};
