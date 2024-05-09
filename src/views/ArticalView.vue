<template>
    <NavigationBar />
    <view id="main">
        <view id="content" v-if="data.contentTitle">
            <div class="content-title">
                <h1>{{ data.contentTitle }}</h1>
            </div>
            <div class="content-content">
                <div class="content-auth">
                    <span class="content-author">{{ data.contentAuthor }}</span>
                    <span class="content-create-time">{{ data.contentCreateTime.split("T")[0] }}</span>
                </div>
                <div class="content-text">
                    {{ data.contentContent }}
                </div>
            </div>
        </view>
        <view style="display:block;text-align: center;margin-top:24px;font-weight: bolder;font-size: 48px;" v-else>
            没有该文章id的内容,请检查id
        </view>

    </view>
    <FootCom />
</template>

<style lang="scss" scoped>
#main {
    display: block;
    width: 100%;
    height: auto;

    #content {
        display: block;
        width: 100%;
        min-height: 76vh;
        background-color: #fff;

        .content-title {
            display: block;
            width: 100%;
            height: 100px;
            margin: 0 auto;
            ;

            h1 {
                font-size: 36px;
                font-weight: bold;
                font-style: italic;
                line-height: 30px;
                padding-top: 24px;
                text-align: center;
                user-select: none;

            }
        }

        .content-content {
            display: block;
            width: 100%;
            height: auto;

            .content-auth {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .content-auth span {
                font-size: 14px;
                color: #999;
            }

            .content-auth {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 48px;
            }

            .content-auth span {
                font-size: 14px;
            }

            .content-text {
                width: 60%;
                margin: 0 auto;
                margin-top: 24px;
                word-wrap: break-word;
                white-space: normal;
            }
        }
    }
}
</style>

<script lang="ts">
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import FootCom from '@/components/Footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { httpGet } from '@/utils/httpRequests';
import { log } from '@/utils/logg';

export default {
    name: "ArticalView",
    components: {
        NavigationBar,
        FootCom,
    },
    props: {
        pageId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    methods: {
    },
    setup(props) {

        const data = ref({});
        onMounted(() => {
            const regex = /^https?:\/\/[^?#]*\/artical\/([^?#]*)/;
            let url = window.location.href;
            const match = url.match(regex);
            let pageID = '';
            if (match && match[1]) {
                pageID = match[1];
            }
            // console.log(pageID);
            httpGet('/api/content/pageByPageID?pageID=' + pageID, {})
                .then((res) => {
                    // console.log(res.data);
                    data.value = res.data;
                }).catch((e) => {
                    log('error', e);
                })
        })

        // httpGet('/api/content/pageByPageID?pageID=ac4d233a-0b84-11ef-90e7-80fa5b556e57', {})
        //     .then((res) => {
        //         // data.value = res.data;
        //         console.log(res.data);
        //     }).catch((e) => {
        //         log('error', e);
        //     })

        return {
            data,
        }
    },
    created() {

    },
    mounted() {

    },

}
</script>