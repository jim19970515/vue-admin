<script>
    import axios from 'axios';
    export default{
        name:'OrderTable',
        data(){
            return{
                orders:[],
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            async getOrders(){
                const vm = this
                const {data} = await axios.get(`${vm.apiUrl}/api/${vm.apiPath}/admin/orders?page=${1}`)
                vm.orders = data.orders
                
            },
        },
        created(){
            this.getOrders()
        }
    }
</script>
<template>
    <div class="row-span-1 bg-white rounded-10 p-4 overflow-x-auto">
        <h3 class=" text-primary font-bold text-2xl pb-4 ">訂單列表</h3>
        <div class="relative overflow-x-auto shadow-md rounded-lg h-[calc(228px-16px-24px)]">
            <table class="text-sm text-center text-gray-500 w-full">
                <thead class="text-xs text-white uppercase bg-primary sticky top-0">
                    <tr>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            桌號
                        </th>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            姓名
                        </th>
                        <th scope="col" class="px-4 py-3 whitespace-nowrap">
                            金額
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orders" :key="item.id" class="bg-gray-100 border-b text-gray-900 group hover:bg-[#90622C] hover:text-white w-full">
                        <th scope="row" class="px-4 py-4 text-[#90622C] group-hover:text-white text-xl  font-bold whitespace-nowrap">
                            <h3 v-if="item.user.address">{{item.user.address}}</h3>
                            <h3 v-else>沒桌號</h3>
                        </th>
                        <td class="px-4 py-4 font-normal whitespace-nowrap">
                            {{item.user.name}}
                        </td>
                        <td class="px-4 py-4 font-bold  text-primary group-hover:text-white text-xl whitespace-nowrap">
                            $ {{item.total}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>