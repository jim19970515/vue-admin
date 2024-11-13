<template>
    <div>
        <div class="flex items-center h-screen w-full">
            <div class="flex flex-col h-[816px] pt-[104px] pb-8 bg-secondary text-white rounded-r-20 shadow-xl shadow-orange-100">
                <div class="flex flex-col justify-between h-full">
                    <div class="flex flex-col gap-16">
                        <router-link to="/admin/dashboard" class="flex items-center gap-2 w-[210px] ml-2 pl-14 py-2 text-base leading-6 font-bold hover:bg-[#90622C]">
                            <i class="ri-building-2-line text-2xl"></i>
                            <span>首頁</span>
                        </router-link>
                        <router-link to="/admin/products" class="flex items-center gap-2 w-[210px] ml-2 pl-14 py-2 text-base leading-6 font-bold hover:bg-[#90622C]">
                            <i class="ri-restaurant-line text-2xl"></i>
                            <span>產品列表</span>
                        </router-link>
                        <router-link to="/admin/order" class="flex items-center gap-2 w-[210px] ml-2 pl-14 py-2 text-base leading-6 font-bold hover:bg-[#90622C]">
                            <i class="ri-shopping-cart-line text-2xl"></i>
                            <span>訂單列表</span>
                        </router-link>
                        <router-link to="/admin/coupon" class="flex items-center gap-2 w-[210px] ml-2 pl-14 py-2 text-base leading-6 font-bold hover:bg-[#90622C]">
                            <i class="ri-coupon-2-line text-2xl"></i>
                            <span>優惠券</span>
                        </router-link>
                    </div>
                    <button @click.prevent="logout" class="flex items-center gap-2 w-[210px] pl-14 py-2 text-base leading-6 font-bold hover:bg-[#90622C]">
                        <i class="ri-logout-box-r-line text-2xl"></i>
                        <span class="text">登出</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        logout() {
            const api = `https://vue-course-api.hexschool.io/logout`
            const vm = this
            this.$http.post(api, vm.user).then((res) => {
                console.log(res)
                if (res.data.success) {
                    vm.$router.push('/')
                }
            })
        },
    },
}
</script>
