<template>
    <div class="not-found">
        <h1>404</h1>
        <h2>{{ i18n.message }}</h2>
        <p v-if="countdown >= 0">将在 {{ countdown > 0 ? countdown : 0 }} 秒后返回上一页...</p>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { createI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const messages = {
    en: {
        message: {
            notFound: 'This page is not found'
        }
    },
    zh: {
        message: {
            notFound: '这个页面跟着卡兹前往了宇宙'
        }
    }
};
const i18n = ref(createI18n({
    messages
}));
const lang = navigator.language;
i18n.value.message = messages[lang == "zh-CN" ? "zh" : "en"].message.notFound;
const countdown = ref(5);

export default {
    name: "NOTFOUND",
    data() {
        return {
            i18n,
            countdown
        };
    },
    setup() {
        const router = useRouter();
        let intervalId = setInterval(() => {
            if (countdown.value > 0) {
                countdown.value--; // 每秒减少1  
            } else {
                // 倒计时结束，清除倒计时并尝试返回上一页或跳转到首页  
                clearInterval(intervalId); // 清除倒计时  
                try {
                    router.go(-1); // 尝试返回上一页
                } catch (error) {
                    router.push('/'); // 如果无法返回上一页，则跳转到首页  
                }
            }
        }, 1000); // 每秒执行一次  
        onMounted(() => {
            intervalId;
        });
        onUnmounted(() => {
            countdown.value = 5; // 重置倒计时
            clearInterval(intervalId);
        })
    }
};
</script>

<style scoped lang="scss">
// 禁止用户选择页面文本  
* {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
}

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to right, skyblue, #A5D6A7);
    text-align: center; // 文本居中显示  
    color: #333; // 设置默认文本颜色为深灰色  
    font-family: 'Arial', sans-serif; // 使用通用的无衬线字体  

    h1 {
        font-size: 6rem; // 使用rem单位以便更好地响应式设计  
        margin: 0;
        color: white; // 设置标题颜色为白色  
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // 添加文本阴影以增强可读性  
    }

    h2 {
        font-size: 2rem; // 使用rem单位  
        margin: 1rem 0; // 上下外边距为1rem  
    }

    p {
        font-size: 1.2rem; // 字体稍大于默认大小  
        margin: 0;
    }
}
</style>