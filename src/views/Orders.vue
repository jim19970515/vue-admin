
<script>
    import axios from 'axios';
    import Loading from '../components/Loading/Loading.vue';
    export default{
        name:'Order',
        components:{
            Loading
        },
        data() {
            return{
                orders:[],
                order:{},
                orderModal:false,
                pagination:{},
                products:[],
                isLoading:false,
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            async getOrder(page = 1){
                const vm = this
                vm.isLoading = true
                const {data} = await axios.get(`${vm.apiUrl}/api/${vm.apiPath}/admin/orders?page=${page}`)
                vm.orders = data.orders
                vm.pagination = data.pagination
                console.log(data.pagination)
                vm.isLoading = false
            },
            async reviseOrder(){
                const vm =this
                console.log(vm.order)
                const data = vm.order
                vm.order.create_at = new Date(vm.order.create_at).getTime() / 1000;
                const {res} = await axios.put(`${vm.apiUrl}/api/${vm.apiPath}/admin/order/${vm.order.id}`,data)
                console.log(res);
            },
            closeModal(){
                const vm =this
                vm.orderModal = !vm.orderModal
            }
        },
        created() {
            this.getOrder()
        }
    }
</script>
<template>
    <section class="h-[816px] bg-products w-full rounded-20 p-4 flex flex-col gap-4 animate__animated animate__fadeInRight relative">
        <!-- 修改彈窗 -->
        <div v-if="orderModal" @click.self="closeModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur z-30 rounded-20 ">
            <div @click.self="closeModal" class="flex flex-col items-center gap-16">
                <h1 class="text-center mx-auto bg-primary p-1 text-white mb-16 text-3xl rounded-10">訂單修改</h1>
                    <header class=" text-primary flex items-center justify-center gap-2 bg-primary px-16 rounded-full transform rotate-45">
                        <div class="bg-white p-8 rounded-20 transform -rotate-45">
                            <div class="flex flex-col gap-2">
                            <h1 class="text-lg font-medium">訂單時間  ： {{ order.create_at}}</h1>
                            <span class="text-lg font-medium">訂單號碼 ：{{ order.user.email }}</span>
                            <span class="text-lg font-medium">訂單總金額 ：{{ order.total }}</span>
                            <div class="flex items-center gap-2">
                                <label for="" class="bg-white font-semibold text-primary py-1 px-2 rounded-5">姓名 :</label>
                                <input type="text" class="p-1 pl-2 ring-2 ring-primary focus:outline-none focus:ring-2 focus:ring-[#90622C] rounded-5 text-primary font-semibold" v-model="order.user.name">
                            </div>
                            <div class="flex items-center gap-2">
                                <label for="" class="bg-white font-semibold text-primary py-1 px-2 rounded-5">電話 :</label>
                                <input type="text" class="p-1 pl-2 ring-2 ring-primary focus:outline-none focus:ring-2 focus:ring-[#90622C] rounded-5 text-primary font-semibold" v-model="order.user.tel">
                            </div>
                            <div class="flex items-center gap-2">
                                <label for="" class="bg-white font-semibold text-primary py-1 px-2 rounded-5">桌號 :</label>
                                <input type="text" class="p-1 pl-2 ring-2 ring-primary  focus:outline-none focus:ring-2 focus:ring-[#90622C] rounded-5 text-primary font-semibold" v-model="order.user.address">
                            </div>
                        </div>
                        </div>
                    </header>
                    <!-- <main>
                        <div class="relative overflow-y-auto max-h-[300px] p-4 bg-white rounded-20">
                            <Loading v-if="isLoading"/>
                            <h2 class="pl-2 pb-2 text-xl text-primary font-bold">訂單內容</h2>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 mb-2">
                                <thead class="text-xs text-white uppercase bg-primary sticky top-0">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            圖片
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            商品名稱
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            數量
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            價格
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in order.products" :key="item.id" class="bg-white border-b">
                                        <td scope="row" class="px-6 py-4 whitespace-nowrap">
                                            <img class="w-20 h-20" :src="item.product.imageUrl" alt="">
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ item.product.title }}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{ item.qty }}
                                        </td>
                                        <td class="px-6 py-4">
                                            $ {{ item.total }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </main> -->
                <footer class="w-full text-center py-4">
                        <button @click="reviseOrder" class="px-8 py-2 bg-white text-2xl font-bold rounded-10 text-primary hover:text-white hover:bg-primary duration-300">修改</button>
                </footer>
            </div>
        </div>
        <header class="flex items-center justify-between bg-white rounded-10 w-full px-4 py-2 text-white">
            <button class="bg-primary rounded-10 px-6 py-2 invisible">xxxx</button>
            <h1 class="bg-primary rounded-10 px-6 py-2">優惠券</h1>
            <div class="flex items-center gap-2">
                <i :class="pagination.has_pre?'':'invisible'" @click="getOrder(pagination.current_page - 1)" class="ri-arrow-left-s-line bg-primary rounded-full text-3xl px-2 py-1"></i>
                <button class="bg-primary rounded-10 px-6 py-2">{{ pagination.current_page }}</button>
                <i :class="pagination.has_next?'':'invisible'" @click="getOrder(pagination.current_page + 1)" class="ri-arrow-right-s-line bg-primary rounded-full text-3xl px-2 py-1"></i>
            </div>
        </header>
        <main class="relative overflow-x-auto shadow-md rounded-lg">
            <Loading v-if="isLoading"/>
            <table class="w-full text-lg font-medium text-gray-500 text-center">
                <thead class="text-base text-white uppercase bg-primary sticky top-0">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            排序
                        </th>
                        <th scope="col" class="px-6 py-3">
                            桌號
                        </th>
                        <th scope="col" class="px-6 py-3">
                            產品名稱
                        </th>
                        <th scope="col" class="px-6 py-3">
                            原價
                        </th>
                        <th scope="col" class="px-6 py-3">
                            是否啟用
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in orders" :key="item.id" class="odd:bg-white  even:bg-gray-50 border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-primary text-xl whitespace-nowrap">
                            {{ i + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.user.address }}
                        </td>
                        <td class="px-6 py-4">
                            {{item.user.name}}
                        </td>
                        <td class="px-6 py-4">
                            $ {{ item.total}}
                        </td>
                        <td class="px-6 py-4">
                            <p v-if="item.is_paid" class="text-enabled">已付款</p>
                            <p v-else class="text-notEnabled">未付款</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </section>
</template>
