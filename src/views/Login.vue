<template>
    <div>
        <div id="login__background" class="flex items-center justify-center">
            <h1 v-if="successful" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white animate__animated animate__fadeIn">登入成功、</h1>
            <form class="flex p-6 bg-tertiary rounded-40 h-[502px] animate__animated" :class="animate?'animate__bounceInRight':'animate__bounceOutLeft'" @keyup.enter="signin">
                <!-- form 左半部 -->
                <div class="flex flex-col justify-between w-[360px] p-[20px] pt-[40px]">
                    <div class="space-y-20">
                        <div class="flex items-center gap-[10px] w-full">
                            <i class="ri-hearts-line text-2xl text-secondary"></i>
                            <h1 class="text-2xl leading-8 font-bold text-secondary">登入您的帳號</h1>
                        </div>
                        <div class="space-y-2">
                            <input
                                type="email"
                                v-model="user.username"
                                class="pl-6 py-[10px] w-full text-secondary rounded-10 focus:outline-none focus:ring-2 focus:ring-secondary placeholder-secondary placeholder:text-xl placeholder:font-medium"
                                autocomplete="email"
                                required
                                placeholder="you@example.com"
                            />
                            <div class="relative">
                                <input
                                :type="isPassword?'text':'password'"
                                v-model="user.password"
                                class="pl-6 py-[10px] w-full text-secondary rounded-10 focus:outline-none focus:ring-2 focus:ring-secondary placeholder-secondary placeholder:text-xl placeholder:font-medium"
                                autocomplete="password"
                                required
                                placeholder="密碼"
                            />
                            <i v-if="isPassword" @click="showPassWord" class="ri-eye-line absolute right-2 font-bold top-1/2 text-2xl -translate-y-1/2 text-secondary"></i>
                            <i v-else @click="showPassWord" class="ri-eye-off-line absolute right-2 font-bold top-1/2 text-2xl -translate-y-1/2 text-secondary"></i>
                            </div>
                        </div>
                    </div>
                    <button @click.prevent="signin" class="flex justify-between px-8 py-[10px] bg-secondary text-white rounded-10">登入<i class="ri-arrow-right-s-fill"></i></button>
                </div>
                <div class="flex flex-col px-[20px] items-center w-[360px] pt-14 bg-primary rounded-40 relative">
                    <h2 class="text-3xl font-bold text-white">心心美味の早午餐</h2>
                    <img class="h-[360px] w-[360px] absolute -bottom-4" src="/src/assets/image/login_form_img.png" alt="" />
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
#login__background {
    height: 100vh;
    background: linear-gradient(179.43deg, #fdbb3a 30.01%, #f1deb1 103.73%);
}
</style>
<script>
import { login } from '../api/authApi';
export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            isPassword:false,
            animate:true,
            successful:false
        }
    },
    methods: {
        async signin(){
            const vm = this
            try{
                const {data} = await login(vm.user.username,vm.user.password)
                console.log(data)
                if(data.success){
                    vm.animate = false
                    setTimeout(() => {
                        vm.successful = true
                    }, 1000);
                    const token = data.token
                    const expired = data.expired
                    document.cookie = `heartToken=${token}; expires=${new Date(expired)};`
                    setTimeout(() => {
                        vm.$router.push({name:'Dashboard'})
                    }, 3000);
                }
            } catch(error){
                console.log(error.message)
            }
        },
        //控制密碼顯示
        showPassWord(){
            const vm = this
            vm.isPassword = !vm.isPassword
        }
    },
}
</script>
