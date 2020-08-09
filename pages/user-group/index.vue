<template lang="pug">
    .user__group__page
        PageTitleComponent Quản lý nhóm người dùng
        FilterBarComponent(create-link="/user-group/create")
        GridComponent(
            :items="fetch"
            :fields="fields"
            :totalRows="totalRows"
            ref="userGroupGrid"
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
        };
    },

    computed: {
        fields() {
            return [
                {
                    label: "Tên nhóm",
                    key: "name",
                },
                {
                    label: "Mã nhóm",
                    key: "code",
                },
                {
                    key: "commands",
                    class: "commands",
                },
            ];
        },
    },

    methods: {
        fetch(context) {
            return this.$api.User_Group.Get()
                .then(({ data: { entries } }) => {
                    const { totalRows, userGroups } = entries;
                    this.totalRows = totalRows;
                    return userGroups;
                })
                .catch(err => {
                    this.$store.commit("error/set", err);
                    return [];
                });
        },
        commandButtons({ _id }) {
            return [
                {
                    type: "link",
                    url: "/user-group/" + _id,
                    icon: "pencil",
                },
                {
                    confirm: true,
                    confirmMessage: "Bạn chắc chắn muốn xóa nhóm này chứ ?",
                    icon: "archive",
                    onConfirm: () => {
                        this.$api.User_Group.Delete(_id)
                            .then(() => {
                                this.$notification(
                                    "info",
                                    "Xóa nhóm người dùng thành công",
                                );
                                this.$refs.userGroupGrid.refresh();
                            })
                            .catch(error => this.$store.commit("error/set", error));
                    },
                },
            ];
        },
    },
};
</script>
