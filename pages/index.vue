<template lang="pug">
    PageTitleComponent Dashboard
</template>

<script>
import PageTitleComponent from "~/components/ui/PageTitleComponent";

export default {
    middleware: "authenticated",
    layout: "main",
    meta: {
        permission: "DashboardIndex",
    },
    components: {
        PageTitleComponent,
    },
};
</script>
