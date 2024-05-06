<template>
    <view id="footer">
        <span>Powered By
            <span style="font-weight: bold;">
                <a href="https://space.bilibili.com/29058270" target="_blank">SakuraMikku</a>
            </span>
        </span>
        <span>
            备案号:
            <span style="font-weight: bold;">
                <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2022008511号</a>
            </span>
        </span>
    </view>
</template>

<script>

export default {
    name: 'FootCom',
}
</script>

<style lang="scss" scoped>
#footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 50px;
    background: linear-gradient(-145deg, lightpink, #dfe95b6c, skyblue, lighten(#e26fe2, 10%));
    bottom: 0;
    margin-top: 120px;

    a {
        font-size: 16px;
        text-decoration: none;
        color: #000;
    }

    span {
        font-size: 12px;
        color: coral;
        user-select: none;

    }
}
</style>