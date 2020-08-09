<template lang="pug">
    .sidebar__content
        NuxtLink.__logo(to="/") IP
            span Intelligent Property

        //- Level 1
        ul.menu__list
            li(v-for="item in menu")
                NuxtLink.menu__item(v-if="item.path" :to="item.path")
                    BIcon.menu__item-icon(v-if="item.icon" :icon="item.icon")
                    span {{ item.label }}
                .menu__item(v-if="!item.path" :class="{active: isActive(item)}")
                    BIcon.menu__item-icon(v-if="item.icon" :icon="item.icon")
                    span {{ item.label }}

                //- level 2
                ul.submenu__level-1(v-if="item.children")
                    li(v-for="child in item.children")
                        NuxtLink.menu__item(v-if="child.path" :to="child.path") {{ child.label }}
                        .menu__item(v-if="!child.path"  :class="{active: isActive(item)}") {{ child.label }}

                            //Level 3
                            ul.submenu__level-2(v-if="child.children")
                                li(v-for="i in child.children"  :class="{active: isActive(item)}")
                                    NuxtLink.menu__item(v-if="i.path" :to="i.path") {{ i.label }}
</template>
<script>
import menu from "@/constants/menu";

export default {
    data() {
        return { menu };
    },
    mounted() {
        console.log(this.route);
    },
    computed: {
        route() {
            return this.$route;
        },
    },
    methods: {
        isActive(item) {
            if (!item) return;

            let childrenLinks = item.children
                ? item.children.map(({ path }) => path)
                : [];

            const { active } = item;

            if (!active) return false;

            childrenLinks = [...childrenLinks, ...active];

            const currentRoutePath = this.$route.fullPath;

            return childrenLinks.includes(currentRoutePath);
        },
    },
};
</script>

<style lang="scss">
.__logo {
    color: $gray-200;
    font-size: 4rem;
    font-weight: 900;
    text-align: center;
    display: block;
    margin-bottom: 3rem;

    span {
        font-size: 1.6rem;
    }
}

.sidebar__content {
    width: 100%;

    .btn__menu {
        position: absolute;
        right: -3rem;
        top: 0.5rem;

        svg {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    ul {
        list-style-type: none;
        padding-left: 0;
    }
}

.menu__list {
    .menu__item {
        color: $text-dark-color;
        padding: 0.5rem 1.5rem;
        display: block;

        &:hover,
        &.active {
            color: $white;
            text-decoration: none;
        }

        &.nuxt-link-exact-active {
            color: $white;
        }

        &-icon {
            margin-right: 0.5rem;
        }
    }

    .submenu__level-1 {
        > li {
            padding-left: 2rem;
        }
    }
}
</style>
