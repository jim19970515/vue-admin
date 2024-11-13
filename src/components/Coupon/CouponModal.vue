<script>
    import axios from 'axios';
    export default{
        name:'CouponModal',
        props:{
            modalCoupon:{
                type:Object
            },
            isNewOrder:{
                type:Boolean
            },
            propsModalTitle:{
                type:String
            },
        },
        data(){
            return{
                date:'',
                time:'',
                tempCoupon:Object.assign({},this.modalCoupon),
                isNew:this.isNewOrder,
                modalTitle:this.propsModalTitle,
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }   
        },
        methods:{
            async updateCoupon(){
                const vm = this
                const dateString = vm.date + vm.time;
                const formattedDateString = dateString.slice(0, 10) + " " + dateString.slice(10);
                const timestamp = new Date(formattedDateString).getTime() / 1000;
                vm.tempCoupon.due_date = timestamp
                let api = `${vm.apiUrl}/api/${vm.apiPath}/admin/coupon`
                let axiosMethod = 'post'
                if(!vm.isNew){
                    api = `${vm.apiUrl}/api/${vm.apiPath}/admin/coupon/${vm.tempCoupon.id}`
                    axiosMethod = 'put'
                }
                const {data} = await axios[axiosMethod](`${api}`,{data:vm.tempCoupon})
                console.log(data)
                this.closeModal()
                this.reNewCoupons()
            },
            closeModal(){
                this.$emit('openCouponModal',)
            },
            reNewCoupons(){
                this.$emit('getCoupons')
            }
        },
        created(){
            console.log(this.tempCoupon)
        }
    }
</script>
<template>
    <div @click.self="closeModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur z-30 rounded-20">
        <div class="bg-primary rounded-full rotate-45">
            <div class="pt-10 pb-6 px-8 space-y-10 relative transform -rotate-45">
                <div class="text-secondary bg-white px-4 py-2 inline-block rounded-10 relative">
                    {{modalTitle}}
                    <i class="ri-shining-2-fill absolute -top-16 -left-8 text-white text-3xl"></i>
                </div>
                <img class=" absolute -top-12 right-0  -translate-y-1/2 w-60" src="/src/assets/image/coupon_icon.png" alt="">
                <div class="flex flex-col gap-2 bg-white p-4 px-8 rounded-20">
                    <div class="flex gap-2 items-center">
                        <label for="" class="text-gray-700 font-medium">優惠券名稱 :</label>
                        <input v-model="tempCoupon.title" type="text" class="bg-products rounded-5 pl-2 p-1">
                    </div>
                    <div class="flex gap-2 items-center">
                        <label for="" class="text-gray-700 font-medium">優惠券代碼 :</label>
                        <input v-model="tempCoupon.code" type="text" class="bg-products rounded-5 pl-2 p-1">
                    </div>
                    <div class="flex gap-2 items-center">
                        <label for="" class="text-gray-700 font-medium">優惠券折扣 : </label>
                        <input v-model="tempCoupon.percent" type="text" class="bg-products rounded-5 pl-2 p-1">
                    </div>
                    <div class="flex gap-2 items-center">
                        <label for="start" class="text-gray-700 font-medium text-nowrap">優惠券日期 :</label>
                        <input v-model="date" type="date" class="w-full bg-products rounded-5 pl-2 p-1" id="start" name="trip-start" min="2024-01-01" max="2030-12-31" />
                    </div>
                    <div class="flex gap-2 items-center">
                        <label for="appt" class="text-gray-700 font-medium text-nowrap">優惠券時間:</label>
                        <input v-model="time" type="time" class="w-full bg-products rounded-5 pl-2 p-1" id="appt" name="appt" value="00:00" min="05:00" max="16:00" required />
                    </div>
                    <div class="flex items-center justify-end pt-6">
                        <input v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded">
                        <label  for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 pr-4">是否啟用</label>
                        <button @click="updateCoupon" class=" bg-[#D80000] rounded-10 px-6 py-2 text-white">送出</button>
                    </div>
                </div>
        </div>
        </div>
    </div>
</template>