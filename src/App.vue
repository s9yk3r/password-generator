<script setup>
import PasswordGenerator from './modules/password-generator/PasswordGenerator.vue'

const customLength = 24
</script>

<template>
    <div class="container py-5">
        <h1 class="text-center mb-5 text-white">A simple password generator powered by Vue.js</h1>

        <PasswordGenerator :initialLength="customLength"/>

    </div>
</template>

<style lang="scss">
body {
    background-color: #1a1a1a;
    min-height: 100vh;
    user-select: none;

    h1 {
        -webkit-text-fill-color: transparent;
        background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
        background-clip: border-box;
        -webkit-background-clip: text;
        background-clip: text;
        letter-spacing: -1.5px;
        margin: 0 auto;
        font-size: 76px;
        font-weight: 900;
        line-height: 1.25;
    }
}
</style>
