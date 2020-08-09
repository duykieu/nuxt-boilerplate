const defaultState = {
    token: null,
    user: null,
    permissions: [],
    allPermissions: [],
    userGroupsList: [],
};

export const state = () => ({ ...defaultState });

export const mutations = {
    set(state, auth) {
        Object.assign(state, auth);
    },
    unset(state) {
        Object.assign(state, defaultState);
    },

    setAllPermissions(state, permissions) {
        state.allPermissions = permissions;
    },

    setUserGroupsList(state, groups) {
        state.userGroupsList = groups;
    },
};

export const actions = {
    fetchPermissions({ commit }) {
        this._vm.$api.Auth.fetchPermissions()
            .then(({ data: { entries } }) => {
                commit("setAllPermissions", entries.permissions);
            })
            .catch(error => commit("error/set", error, { root: true }));
    },

    fetchUserGroupsList({ commit }) {
        this._vm.$api.User_Group.Get()
            .then(({ data: { entries } }) => {
                const userGroups = entries.userGroups.map(({ name, code }) => ({
                    text: name,
                    value: code,
                }));
                commit("setUserGroupsList", userGroups);
            })
            .catch(error => commit("error/set", error, { root: true }));
    },
};
