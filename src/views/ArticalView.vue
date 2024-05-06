<template>
    <NavigationBar />
    <view>

    </view>
    <FootCom />
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { ref } from 'vue';
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import FootCom from '@/components/Footer/Footer.vue';

export default {
    name: "ArticalView",
    components: {
        NavigationBar,
        FootCom
    },
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    setup() {
    },
    created() {
        const id = this.$route?.params?.id;
        alert(id);
    },

}
</script>