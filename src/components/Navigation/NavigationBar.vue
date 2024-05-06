<template>
    <view class="navigation-bar">
        <el-menu :default-active="activeIndex" id="nav-bar" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect" v-if="isShow">
            <div class="flex-grow"></div>
            <el-menu-item index="1" class="nav-item" @click="linkJump('/')">首页</el-menu-item>
            <el-menu-item index="2" class="nav-item" @click="linkJump('/search')">搜索</el-menu-item>
            <el-menu-item index="3" class="nav-item" @click="linkJump('/b')">占位符</el-menu-item>
            <el-menu-item index="4" class="nav-item" @click="linkJump('/user')">用户</el-menu-item>
        </el-menu>
    </view>
</template>

<script lang="ts">
import { ref, type PropType } from 'vue';



let activePage = window.location.pathname;
let activePageIndex: string;
switch (activePage) {
    case '/':
        activePageIndex = '1';
        break;
    case '/search':
        activePageIndex = '2';
        break;
    case '/b':
        activePageIndex = '3';
        break;
    case '/user':
        activePageIndex = '4';
        break;
    default:
        activePageIndex = '0';
}
let activeIndex = ref(activePageIndex)
const handleSelect = (key: string) => {
    activePageIndex = key;
}

export default {
    name: 'NavigationBar',
    setup(props, { emit }) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const toggleShow = () => {
            emit('update:isShow', !props.isShow);
        }

        return {
            activeIndex,
            handleSelect,
        }
    },

    methods: {
        linkJump(link: string) {
            this.$router.push(link);
            activeIndex.value = activePageIndex;
        },
    },
    props: {
        isShow: {
            type: Boolean as PropType<boolean>,
            default: true
        }
    }

}
</script>

<style lang="scss" scoped>
.navigation-bar {
    display: block;
    width: 100%;
    height: auto;
    background: linear-gradient(145deg, lightpink, #dfe95b6c, skyblue, lighten(#e26fe2, 10%));
    // background: linear-gradient(90deg,  skyblue, #A5D6A7,lightpink);
}

#nav-bar {
    background: rgba(255, 255, 255, .0);

    .nav-title {
        font-size: 2.5rem;
        font-style: italic;
        color: lightpink;
        font-weight: bold;
    }

    >.nav-item {
        width: 10%;
        font-size: 1.75rem;
        font-weight: 700;
        margin-right: calc(0%);
        transition: font-size 0.5s ease;

        &:last-child {
            margin-right: calc(0%);
        }
    }

    >.nav-item:hover {
        background: linear-gradient(90deg, skyblue, #A5D6A7, lightpink);
        color: #0006;
        font-size: 2.5rem;
    }
}
</style>