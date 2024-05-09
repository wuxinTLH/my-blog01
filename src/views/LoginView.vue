<template>
    <NavigationBar />
    <div id="login-container">
        <div id="login-box">
            <h2>登录</h2>
            <form action="javascript:;">
                <div class="input-group">
                    <label for="username">用户名</label>
                    <input type="text" id="username" name="username" v-model="userLoginName" required />
                </div>
                <div class="input-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" name="password" v-model="userLoginPassword" required />
                </div>
                <el-button type="primary" @click="userLogin()" :disabled="!loginLock">登录</el-button>
            </form>
        </div>

    </div>
    <!-- <FootCom /> -->
</template>

<script lang="ts">
import NavigationBar from '@/components/Navigation/NavigationBar.vue';

import { ref } from 'vue';
import { httpPost } from '@/utils/httpRequests';
import CryptoJS from 'crypto-js';

const userLoginName = ref("");
const userLoginPassword = ref("");
const loginLock = ref(true);


export default {
    name: 'LoginView',
    components: {
        NavigationBar,
    },
    setup() {

        return {
            userLoginName,
            userLoginPassword,
            loginLock,
        }
    },
    methods: {
        userLogin: function () {
            if (userLoginName.value === '' || userLoginPassword.value === '') {
                alert("用户名或密码不能为空");
                return;
            }
            loginLock.value = false;
            setTimeout(() => {
                loginLock.value = true;
            }, 5000)
            let data = {
                "username": userLoginName.value,
                "password": CryptoJS.SHA256(userLoginPassword.value).toString(),
            }
            httpPost('/api/user/login', {
                "username": data.username,
                "password": data.password,
            }).then((res) => {
                if (res.code == 10001) {
                    localStorage.setItem("cookie", res.data.cookie);
                    alert("登录成功");
                    window.location.href = "/user";
                } else {
                    alert("用户或密码错误")
                }
            }).catch((e) => {
                alert("登录失败")
            })
        }
    }
}
</script>


<style lang="scss" scoped>
#login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

#login-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>