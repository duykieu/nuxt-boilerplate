import Vue from "vue";

export default function ({ $axios }) {
    Vue.prototype.$api = {
        Auth: {
            Login: data => $axios.post("/login", data),
            fetchPermissions: () => $axios.get("/permissions"),
        },
        User: {
            Get: params => $axios.get("/user", { params }),
            Store: data => $axios.post("/user", { data }),
            Update: (id, data) => $axios.patch("/user/" + id, { data }),
            Show: id => $axios.get("/user/" + id),
            Delete: id => $axios.delete("/user/" + id),
        },
        User_Group: {
            Get: params => $axios.get("/user-groups", { params }),
            Store: data => $axios.post("/user-groups", { data }),
            Update: (id, data) => $axios.patch("/user-groups/" + id, { data }),
            Show: id => $axios.get("/user-groups/" + id),
            Delete: id => $axios.delete("/user-groups/" + id),
        },
        Category: {
            Get: params => $axios.get("/category", { params }),
            Store: data => $axios.post("/category", { data }),
            Update: (id, data) => $axios.patch("/category/" + id, { data }),
            Show: id => $axios.get("/category/" + id),
            Delete: id => $axios.delete("/category/" + id),
        },
        Category_Model: {
            Get: params => $axios.get("/category-model", { params }),
            Store: data => $axios.post("/category-model", { data }),
            Update: (id, data) => $axios.patch("/category-model/" + id, { data }),
            Show: id => $axios.get("/category-model/" + id),
            Delete: id => $axios.delete("/category-model/" + id),
        },
        Property: {
            Get: params => $axios.get("/property", { params }),
            Store: data => $axios.post("/property", { data }),
            Update: (id, data) => $axios.patch("/property/" + id, { data }),
            Show: id => $axios.get("/property/" + id),
            Delete: id => $axios.delete("/property/" + id),
        },

        Geo: {
            Get_States: () => $axios.get("/state"),
            Get_Cities: stateId => $axios.get("/city/" + stateId),
            Get_Wards: (stateId, cityId) => $axios.get("/ward/" + stateId + "/" + cityId),
            Get_Streets: (stateId, cityId) =>
                $axios.get("/street/" + stateId + "/" + cityId),
            Get_Projects: (stateId, cityId) =>
                $axios.get("/project/" + stateId + "/" + cityId),
        },
    };
}
