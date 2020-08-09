<template lang="pug">
    .grid__component
        BCard.no__padding
            BTable(
                v-bind="$props"
                :ref="gridId"
                :per-page="perPage"
                :current-page="currentPage"
                :stacked="stacked || 'sm'"
            )
                template(v-slot:head(checkbox))
                    input(type="checkbox" @change="selectAll = !selectAll")
                template(v-slot:cell(checkbox)="row")
                    input(
                        type="checkbox"
                        :checked="selectedRows.includes(row.item._id)"
                        :value="row.item._id"
                        @change="checkboxChange"
                    )
                template(v-slot:cell(commands)="{item}")
                    slot(name="commands" v-bind:row="item")

                template(v-slot:cell(info)="{item}")
                    slot(name="info" v-bind:row="item")

                template(v-slot:cell(size)="{item}")
                    slot(name="size" v-bind:row="item")

        .grid__component-footer
            .grid__component-footer-left
                select.form-control(v-model="perPage")
                    option(value="15") 15 hàng
                    option(value="30") 30 hàng
                    option(value="50") 50 hàng
                    option(value="100") 100 hàng
                    option(value="200") 200 hàng
                    option(value="500") 500 hàng
            .grid__component-footer-right
                BPagination(
                    v-if="totalRows && perPage && totalRows > perPage"
                    :per-page="perPage"
                    :total-rows="totalRows"
                    v-model="currentPage"
                    @change="$refs[gridId].refresh()"
                )

</template>

<script>
import uniqid from "uniqid";

const gridId = uniqid();

export default {
    name: "GridComponent",
    props: ["totalRows", "fields", "items", "stacked"],
    data() {
        return {
            selectAll: false,
            selectedRows: [],
            perPage: 15,
            currentPage: 1,
            gridId,
        };
    },
    watch: {
        selectAll: {
            handler() {
                if (this.selectAll) {
                    return (this.selectedRows = this.items.map(el => el._id));
                }
                return (this.selectedRows = []);
            },
        },
    },
    methods: {
        checkboxChange({ target: { checked, value } }) {
            const currentSelectedRows = [...this.selectedRows];
            if (checked) {
                if (!currentSelectedRows.includes(value)) {
                    currentSelectedRows.push(value);
                    this.selectedRows = currentSelectedRows;
                }
            } else {
                this.selectedRows = currentSelectedRows.filter(el => el !== value);
            }
        },
        refresh() {
            this.$refs[this.gridId].refresh();
        },
    },
};
</script>

<style lang="scss">
.grid__component {
    table {
        margin-bottom: 0;

        th,
        td {
            padding: 1rem 1.5rem;
        }
    }

    &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pagination {
        margin-top: 1rem;

        .page-item {
            margin: 0 0.3rem;

            button,
            a {
                color: $gray-700;
            }

            &.active {
                button,
                a {
                    color: $gray-100;
                }
            }
        }
    }
}
</style>
