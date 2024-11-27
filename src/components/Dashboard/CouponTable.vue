<script>
    import axios from 'axios';
    export default{
        name:'CouponTable',
        data(){
            return{
                coupons:[],
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            async getCoupon(){
                const vm = this
                const {data} = await axios.get(`${vm.apiUrl}/api/${vm.apiPath}/admin/coupons?page=${1}`)
                vm.coupons = data.coupons
                console.log(vm.coupons)
            },
        },
        created(){
            this.getCoupon()
        }
    }
</script>
<template>
    <div class="row-span-1 bg-white rounded-10 p-4 overflow-x-auto">
        <h3 class=" text-primary font-bold text-2xl pb-4">優惠券</h3>
        <div class="relative overflow-x-auto shadow-md rounded-lg h-[calc(228px-16px-24px)]">
            <table class="text-sm text-center text-gray-500 w-full">
                <thead class="text-xs text-white uppercase bg-primary sticky top-0">
                    <tr>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            優惠券名稱
                        </th>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            折抵金額
                        </th>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            狀態
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in coupons" :key="item.id" class="bg-gray-100 border-b text-gray-900  group hover:bg-[#90622C] hover:text-white">
                        <th scope="row" class="px-4 py-4 text-[#90622C] group-hover:text-white font-bold whitespace-nowrap">
                            {{item.title}}
                        </th>
                        <td class="px-4 py-4 font-normal whitespace-nowrap">
                            {{item.percent}}
                        </td>
                        <td class="px-4 py-4 font-normal whitespace-nowrap">
                            <span v-if="item.is_enabled" class="bg-enabled text-white p-1 rounded-5 group-hover:bg-white group-hover:text-enabled group-hover:font-bold">啟用中</span>
                            <span v-else class="bg-notEnabled text-white p-1 rounded-5 group-hover:bg-white group-hover:text-notEnabled group-hover:font-bold">關閉中</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>