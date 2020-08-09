import { createLogger } from "vuex";

export const state = () => ({
    locale: "vi",
});

export const plugins = [createLogger()];
