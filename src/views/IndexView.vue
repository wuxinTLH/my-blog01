<template>
    <NavigationBar />
    <view id="main">
        <view id="nav-list">
            <!-- <el-button type="primary" @click="sendTestRequest()">发送一个请求</el-button> -->
            <!-- <el-button type="primary" @click="calSha256()">计算SHA256并发送请求</el-button> -->
            <ul v-if="navList.length > 0">
                <li v-for="item in navList" :key="item">
                    <a :href="item.link">{{ item.name }}</a>
                </li>
            </ul>
        </view>
        <view id="content">
            <ul v-if="contentList.length > 0">
                <li class="content-item" v-for="( item) in contentList" :key="item.id"
                    @click="linkJumpPage(item.page_id)">
                    <div class="page-view">
                        <div class="page-title">
                            <div class="title-content">{{ item.content_title }}</div>
                        </div>
                        <div class="page-content">
                            <div class="page-content-content">
                                {{ item.content_content }}
                            </div>
                        </div>
                    </div>
                    <div class="page-cover">
                        <img :src="item.content_cover" alt="">
                    </div>
                </li>
            </ul>
        </view>
    </view>
    <FootCom />
</template>

<script type="ts">
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
// import axios from 'axios';
import CryptoJS from 'crypto-js';
import FootCom from '@/components/Footer/Footer.vue';
import { httpGet, httpPost } from "@/utils/httpRequests";
import { ref } from 'vue';
import { log } from '@/utils/logg'


export default {
    name: "IndexView",
    setup() {
        //左边导航
        const navList = ref([]);
        httpGet("/api/navlist", {}).then((res) => {

            navList.value = res.data;
        }).catch((err) => {
            log('error', err)
        });

        //右边内容
        const contentList = ref([]);
        httpGet("/api/content/randomList?length=10", {})
            .then((res) => {
                // log('info', "content内容:" + res);
                //console.log(res.data);
                contentList.value = res.data;
            }).catch((e) => {
                log('error', e);
            })

        return {
            navList,
            contentList
        };

    },
    components: {
        NavigationBar,
        FootCom,
    },
    methods: {

        // sendTestRequest() {
        //     let result = httpGet("/api/testGet", {});
        //     result.then((res) => {
        //         console.log(res);
        //     })
        // },

        // calSha256() {
        //     let pwd = 'SakuraMikku@2001';
        //     let sha256 = CryptoJS.SHA256(pwd).toString();
        //     // console.log(sha256);
        //     let data = {
        //         username: "SakuraMikku",
        //         password: sha256
        //     };
        //     let jsonData = JSON.parse(JSON.stringify(data));
        //     //axios携带data发送post请求
        //     let result = httpPost("/api/user/register", jsonData);
        //     result.then((res) => {
        //         console.log(res);
        //     })
        // },
        linkJumpPage: function (pageID) {
            window.location.href = `/artical/${pageID}`
        },
    },


}

</script>

<style lang="scss" scoped>
li {
    list-style: none;
}

a {
    text-decoration: none;
}

#main {
    display: grid;
    //设置两格一行
    grid-template-columns: 20% 80%;
    position: relative;
    width: 80%;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
    // background: #9baebc;

    #nav-list {
        width: 100%;
        height: auto;
        // background: #ccc;

        ul {
            width: calc(100% - 48px);
            height: 100%;
            padding-left: 24px;
            padding-top: 24px;


            li {
                display: block;
                width: 100%;
                min-height: 120px;
                margin-top: 24px;
                border: 2px solid #ccc;

                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 120px;
                    font-size: 48px;
                    font-weight: bolder;
                    color: #000;

                }
            }

            li:hover {
                background: skyblue;

                a {
                    color: lightcoral;
                }
            }

        }

    }

    #content {
        width: 100%;
        min-height: 1200px;
        border-radius: 24px;
        border: 2px solid #ccc;
        // background: #0085;

        .content-item {
            display: flex;
            margin: 0 auto;
            margin-top: 24px;
            width: 90%;
            border-radius: 24px;
            border: 1px solid #0005;
            height: 160px;

            .page-view {
                display: flex;
                flex-direction: column;
                width: 80%;
                height: 120px;
                border-radius: 12px;
                border: 1px solid #ccc;
                margin: 0 auto;
                // margin-left: 48px;
                margin-top: 20px;

                .page-title {
                    width: 100%;
                    height: 20px;
                }

                .title-content {
                    flex-grow: 1;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                    padding-left: 24px;
                }

                .page-content {
                    width: 100%;
                    height: 100px;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #666;
                    margin-bottom: 20px;
                    margin-top: 12px;
                    padding-left: 12px;
                    //超出部分显示省略为三个点
                    overflow: hidden;
                }


            }

            .page-cover {
                display: flex;
                flex-direction: column;
                width: 120px;
                height: 120px;
                border-radius: 12px;
                border: 1px solid #ccc;
                margin-left: 0px;
                margin-top: 20px;
                align-items: center;

                img {
                    width: 120px;
                    height: 120px;
                    border-radius: 12px;
                    margin-left: calc(50% - 60px);
                    margin-top: 0px;
                    object-fit: cover;
                    flex-grow: 1;
                }
            }
        }

        .content-item:last-child {
            margin-bottom: 24px;
        }
    }

}
</style>