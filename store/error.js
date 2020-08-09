export const state = () => ({
    code: null,
    message: null,
});

export const mutations = {
    set(state, { isAxiosError, response, status, ...errorRest }) {
        if (isAxiosError) {
            const { status, data } = response;
            state.code = status;
            state.message = data.message;
        }
    },

    unset(state) {
        state.code = null;
        state.message = null;
    },
};
