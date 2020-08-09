import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import langVi from "~/locales/vi";

console.log({ langVi });

export default ({ app, store }) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: "vi",
        messages: {
            en: require("~/locales/en"),
            vi: langVi,
        },
    });
};
