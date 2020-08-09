<template lang="pug">
    .image__preview
        img(:src="url")
        .icon__container
            button.btn.btn-transparent(@click="$emit('onDelete')")
                BIcon(icon="archive")
</template>
<script>
export default {
    props: {
        url: String,
    },
};
</script>

<style lang="scss">
.image__preview {
    max-width: 100%;
    position: relative;

    img {
        max-width: 100%;
        z-index: 0;
    }

    .icon__container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.5);
        transition: opacity 300ms ease-in;

        svg {
            width: 3rem;
            height: 3rem;
            fill: $gray-900;
        }
    }

    &:hover > .icon__container {
        opacity: 1;
    }
}
</style>
