export const state = () => ({
    categories: [],
    categoryModels: [],
    priceModels: [],
});

export const mutations = {
    setCategories(state, categories) {
        state.categories = categories || [];
    },
    unsetCategories(state) {
        state.categories = [];
    },

    setCategoryModels(state, models) {
        state.categoryModels = models || [];
    },

    unsetCategoryModels(state) {
        state.categoryModels = [];
    },
};

export const actions = {
    fetchCategoryModels({ commit }) {
        this._vm.$api.Category_Model.Get()
            .then(({ data: { entries } }) => {
                commit("setCategoryModels", entries.categoryModels);
            })
            .catch(this._vm.$commitError);
    },
};
