<template>
    <NavigationBar />
    <view v-if="cookie">
        登录了
    </view>
    <view v-else>
        未登录,需要登录
    </view>
</template>

<script type="ts">
import NavigationBar from '@/components/Navigation/NavigationBar.vue'
import { ref } from 'vue';

export default {
    name: "UserView",
    components: {
        NavigationBar,
    },
    setup() {
        const cookie = ref("");
        cookie.value = localStorage.getItem("cookie");
        if (!cookie.value) {
            window.location.href = "/user/login"
        }
        return {
            cookie,
        }
    }
}

</script>

<style lang="scss"></style>