<template lang="pug">
    .filter__bar
        .filter__bar--left
            button.btn.btn-light.btn-block(@click="openFilter = !openFilter")
                BIcon(icon="filter")
                span.button__label Thêm điều kiện lọc
            slot(name="filter__dropdown" v-if="openFilter")
        .filter__bar--center
            .search__input
                .search__input--icon-container
                    BIcon.icon(icon="search")
                input.form-control(v-model="inputVal" @change="$emit('change')")
        .filter__bar--right
            NuxtLink.btn.btn-primary.btn-block(:to="createLink")
                BIcon(icon="plus")
                span.button__label {{ addLabel || 'Thêm mới' }}


</template>

<script>
export default {
    name: "FilterBarComponent",
    props: {
        addLabel: {
            type: String,
            default: null,
        },
        createLink: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            openFilter: false,
        };
    },
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
};
</script>

<style lang="scss">
.filter__bar {
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;

    &--left {
        width: 15rem;
        position: relative;

        button {
            font-size: 1.2rem;
            height: 100%;
            border: 1px solid $gray-400;
        }

        .filter__dropdown {
            position: absolute;
            left: 0;
            top: 100%;
            z-index: 3;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
    }

    &--center {
        flex: 1;
        margin: 0 1.5rem;

        .search__input {
            position: relative;

            &--icon-container {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                display: flex;
                align-items: center;
                width: 3rem;
                justify-content: center;

                .icon {
                    fill: $gray-500;
                }
            }

            input {
                padding-left: 3rem;

                &:focus {
                    border: 1px solid $main-dark-color;
                    outline: none;
                }
            }
        }
    }

    &--right {
        width: 12rem;
    }

    .button__label {
        margin-left: 0.5rem;
    }
}

@include media-breakpoint-down(sm) {
    .button__label {
        display: none;
    }

    .filter__bar {
        &--left {
            width: 3.5rem;
        }

        &--right {
            width: 3.5rem;
        }
    }
}
</style>
