import Vue from "vue";
import Vuelidate from "vuelidate";
import { notification, Modal } from "ant-design-vue";
import { IconsPlugin } from "bootstrap-vue";
import moment from "moment";
import VueSelect from "vue-select";

const { confirm } = Modal;

Vue.use(Modal);

Vue.component("VueSelect", VueSelect);

Vue.use(IconsPlugin);

Vue.use(Vuelidate);

Vue.prototype.$notification = (type, description, message, placement) => {
    notification[type]({
        message: message || "Thông báo",
        placement: placement || "bottomRight",
        description,
    });
};

Vue.prototype.dateFormat = "DD/MM/YYYY";

Vue.prototype.$confirm = confirm;

Vue.prototype.$log = (...items) => {
    items.forEach(el => {
        console.log(el);
    });
};

Vue.filter("formatDate", value => {
    moment(value).format("DD/MM/YYYY");
});
