<template>
    <NavigationBar />
    <view id="main">
        <view class="search-box">
            <view class="search-view">
                <select name="" id="engineChose" :value="chosenEngine" @change="selectChange">
                    <option value="google">Google</option>
                    <option value="bing">Bing(必应)</option>
                    <option value="baidu">百度</option>
                    <option value="Bili">Bilibili</option>
                </select>
                <input type="text" name="" placeholder="请输入搜索内容" :value="searchKeywords" id="searchInput"
                    @input="inputChange">
                <button @click="searched()" id="searchBtn">搜索</button>
            </view>
        </view>

    </view>
    <FootCom />
</template>


<script lang="ts">
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import FootCom from '@/components/Footer/Footer.vue';
import { ref } from 'vue';

const chosenEngine = ref(localStorage.getItem("chosenEngine") || "google");
const baseUrl = {
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    baidu: "https://www.baidu.com/s?wd=",
    Bili: "https://search.bilibili.com/all?keyword="
}
const searchKeywords = ref("");
export default {
    name: 'SearchView',
    components: {
        NavigationBar,
        FootCom
    },
    setup() {

        return {
            chosenEngine,
            searchKeywords
        }
    },
    methods: {
        searched: function () {
            if (searchKeywords.value == "") {
                return;
            }
            window.open(baseUrl[chosenEngine.value] + searchKeywords.value);
        },
        selectChange: function (event: any) {
            chosenEngine.value = event.target.value;
            localStorage.setItem("chosenEngine", chosenEngine.value);
        },
        inputChange: function (e: any) {
            searchKeywords.value = e.target.value;
        }
    }
}
</script>


<style lang="scss" scoped>
#main {
    display: block;
    width: 100%;
    height: auto;

    .search-box {
        display: block;
        width: 100%;
        min-height: 60vh;

        .search-view {
            display: block;
            width: 60%;
            height: 800px;
            margin: 0 auto;
            margin-top: 120px;
            padding-top: 320px;

            #engineChose,
            #searchInput,
            #searchBtn {
                border: 1px solid #000;
                outline: none;
                box-sizing: border-box;
            }

            #engineChose {
                width: 10%;
                height: 48px;
                border-radius: 12px;
                background-color: #f5f5f5;
                margin: 0 0 20px 0;
            }

            #searchInput {
                width: 60%;
                height: 48px;
                margin: 0 60px 0 60px;
                border-radius: 18px;
                background-color: #f5f5f5;
                font-size: 16px;
                padding-left: 24px;
            }

            #searchInput::before {
                content: url(@/assets/icons/search.png);
                position: absolute;
                left: 12px;
                top: 12px;
                width: 24px;
                height: 24px;
            }

            #searchBtn {
                width: 10%;
                height: 48px;
                border-radius: 48px;
                background-color: #409eff;
                color: #fff;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s;
                border: none;
            }

            #searchBtn:hover {
                background-color: #2e7fff;
            }
        }
    }
}
</style>