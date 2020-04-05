<template>
    <div id="app" class="container">
        <router-view></router-view>
    </div>
</template>

<script>

    import Home from "./pages/Home";
    import Task from "./pages/Task";

    export default {
        data() {
            return {}
        },
        components: {
            Task,
            Home,
        },
        mounted() {
            if ( localStorage.getItem('tasks') === null ) {
                localStorage.setItem('tasks',JSON.stringify([]));
            }
        }
    }
</script>

<style lang="scss">
    *{
        font-family: SansSerif, sans-serif;
    }
</style>
