<template lang="pug">
    .user__page
        PageTitleComponent Quản lý người dùng
        FilterBarComponent(
            create-link="/user/create"
            v-model="filterData.search"
            @change="$refs.userGrid.refresh()"
        )
            template(v-slot:filter__dropdown)
                .filter__dropdown
                    input.form-control
                    input.form-control
                    input.form-control
        GridComponent.padding(
            :items="fetch"
            :fields="fields"
            :total-rows="totalRows"
            ref="userGrid"
        )
            template(v-slot:commands="{row}")
                CommandButtonsComponent(:buttons="commandButtons(row)")

</template>
<script>
import PageTitleComponent from "~/components/ui/PageTitleComponent";
import FilterBarComponent from "~/components/ui/FilterBarComponent";
import GridComponent from "~/components/ui/GridComponent";
import CommandButtonsComponent from "@/components/ui/CommandButtonsComponent";

export default {
    meta: {
        permission: "UserIndex",
    },
    components: {
        CommandButtonsComponent,
        GridComponent,
        FilterBarComponent,
        PageTitleComponent,
    },
    layout: "main",
    data() {
        return {
            totalRows: 0,
            columnDefs: null,
            filterData: {
                search: null,
            },
            fields: [
                { label: "Họ tên", key: "fullName" },
                "email",
                { label: "Điện thoại", key: "phoneNumber" },
                { label: "Địa chỉ", key: "address" },
                { label: "Vai trò", key: "userGroup" },
                {
                    key: "commands",
                    class: "commands",
                },
            ],
        };
    },

    created() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });
    },

    mounted() {
        this.$root.permission = "UserIndex";
    },

    methods: {
        fetch(context) {
            console.log({ context });
            const { perPage, currentPage } = context;
            return this.$api.User.Get({
                limit: perPage,
                page: currentPage,
                ...this.filterData,
            })
                .then(({ data: { success, entries } }) => {
                    this.totalRows = entries.totalRows;
                    return entries.users;
                })
                .catch(error => {
                    this.$store.commit("error/set", error);
                    return [];
                });
        },
        commandButtons({ _id }) {
            return [
                {
                    type: "link",
                    url: "/user/" + _id,
                    icon: "pencil",
                },
                {
                    confirm: true,
                    confirmMessage: "Bạn chắc chắn muốn xóa người dùng này chứ ?",
                    icon: "archive",
                    onConfirm: () => {
                        this.$api.User.Delete(_id)
                            .then(() => {
                                this.$notification("info", "Xóa người dùng thành công");
                                this.$refs.userGrid.refresh();
                            })
                            .catch(this.$commitError);
                    },
                },
            ];
        },
    },
};
</script>

<style lang="scss">
.filter__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 1rem;
    background-color: $white;
}
</style>
