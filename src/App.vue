<script setup>
import PasswordGenerator from './modules/password-generator/PasswordGenerator.vue'

const customLength = 24
</script>

<template>
    <div class="container py-5">
        <h1 class="text-center mb-5 text-white">Testing My Module</h1>

        <PasswordGenerator :initialLength="customLength"/>

    </div>
</template>

<style lang="scss">
body {
    background-color: #1a1a1a;
    min-height: 100vh;
}
</style>
