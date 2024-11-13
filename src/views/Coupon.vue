<script>
    import axios from 'axios';
    import CouponModal from '../components/Coupon/CouponModal.vue';
    import Loading from '../components/Loading/Loading.vue';
    export default{
        name:'Coupon',
        components:{
            CouponModal,
            Loading
        },
        data() {
            return{
                coupons:[],
                coupon:{},
                couponModal:false,
                isLoading:false,
                isNew:false,
                modalTitle:'',
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            async getCoupons(page = 1){
                const vm = this
                const {data} = await axios.get(`${vm.apiUrl}/api/${vm.apiPath}/admin/coupons?page=:${page}`)
                vm.coupons = data.coupons.map(item => {
                    const date = new Date (item.due_date*1000)
                    const year = date.getFullYear()
                    const month = date.getMonth()+1
                    const day = date.getDate()
                    item.due_date = `${year}-${month}-${day}`
                    return {
                        ...item
                    }
                })
                console.log(vm.coupons)
            },
            async deleteCoupon(couponId){
                const vm = this
                const {data} = await axios.delete(`${vm.apiUrl}/api/${vm.apiPath}/admin/coupon/${couponId}`)
                console.log(data)
                this.getCoupons()
            },
            openCouponModal(isNew,item){
                const vm = this
                if(isNew){
                    vm.coupon ={}
                    vm.isNew = true
                    vm.modalTitle = '新增優惠券'
                }else{
                    vm.coupon = Object.assign({},item)
                    vm.isNew = false
                    vm.modalTitle = '修改優惠券'
                }
                vm.couponModal = !vm.couponModal
            },
        },
        created() {
            this.getCoupons()
        }
    }
</script>
<template>
    <section class="h-[816px] bg-products w-full rounded-20 p-4 flex flex-col gap-4 animate__animated animate__fadeInRight relative">
        <div class="flex items-center justify-between bg-white rounded-10 w-full px-4 py-2 text-white">
            <button @click="openCouponModal(true)" class="bg-primary rounded-10 px-6 py-2 hover:bg-[#90622C] duration-100">加入商品</button>
            <h1 class="bg-primary rounded-10 px-6 py-2">產品列表</h1>
            <div class="flex items-center gap-2">
                <i class="ri-arrow-left-s-line bg-primary rounded-full text-3xl px-2 py-1 hover:bg-[#90622C]"></i>
                <button class="bg-primary rounded-10 px-6 py-2">1</button>
                <i class="ri-arrow-right-s-line bg-primary rounded-full text-3xl px-2 py-1 hover:bg-[#90622C]"></i>
            </div>
        </div>
        <div class="relative shadow-md rounded-lg h-full overflow-auto">
            <div class="w-full text-primary text-right sticky top-0 z-20"><p class="px-8 py-2 bg-primary rounded-10 text-white">現在優惠券數量 {{ coupons.length }}</p></div>
            <CouponModal v-if="couponModal" :modalCoupon="coupon" :isNewCoupon="isNew" :propsModalTitle="modalTitle" @openCouponModal="openCouponModal" @getCoupons="getCoupons"/>
            <div class="grid grid-cols-2 gap-4 p-6 bg-gray-300">
                <Loading v-if="isLoading"/>
                <div v-for="item in coupons" :key="item.id" class="col-span-1 bg-white flex items-center gap-4 group hover:ring-8 ring-primary relative duration-300" :class="item.is_enabled != 1 ?'hover:ring-notEnabled':''">
                    <i @click="deleteCoupon(item.id)" class="ri-delete-bin-7-fill absolute -top-4 -right-4 ring-2 hover:bg-notEnabled hover:text-white ring-notEnabled bg-white text-notEnabled hidden group-hover:block rounded-full px-2 p-1 group-hover:duration-300 z-10"></i>
                    <div class="relative w-40 h-40">
                        <img class="w-40 h-40" src="/src/assets/image/coupon_logo.png" alt="">
                        <p class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-opacity-70 bg-gray-600 w-full h-full text-white text-xl font-bold" :class="item.is_enabled == 1 ?'hidden':''">未啟用</p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <i @click="openCouponModal(false,item)"  class="ri-edit-box-line text-3xl font-bold text-gray-600"></i>
                        <div class="flex flex-col gap-2">
                            <h3 class="text-[#90622C] text-xl font-semibold"><span class="text-lg">優惠券名稱 : </span>{{item.title}}</h3>
                            <p class="text-lg">折扣內容: {{item.percent}}</p>
                            <p class="text-lg">截止期限: {{ item.due_date }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
