<template>
    <main class="flex items-center px-60 w-full bg-primary gap-4 overflow-hidden">
        <sidebar/>
        <router-view></router-view>
    </main>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
    name: 'admin',
    components: {
        Sidebar,
    },
    created() {
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)heartToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
        console.log('myCookie', myCookie)
        this.$http.defaults.headers.common.Authorization = myCookie
    },
}
</script>
