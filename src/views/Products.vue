<script>
    import axios from 'axios';
    import ProductModal from '../components/Products/ProductModal.vue';
    import Loading from '../components/Loading/Loading.vue';
    import PicModal from '../components/Products/PicModal.vue';
    export default{
        name:'Products',
        components:{
            ProductModal,
            Loading,
            PicModal
        },
        data() {
            return{
                product:{},
                productsModel:false,
                isLoading:false,
                picModal:false,
                pic:'',
                isNew:false,
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            getProducts(page = 1){
                this.$store.dispatch('getProducts',page)
            },
            openProductModal(isNew,item){
                const vm = this
                if(isNew){
                    vm.product = {}
                    vm.isNew = true
                }else{
                    vm.product = Object.assign({},item)
                    vm.isNew = false
                }
                vm.productsModel = !vm.productsModel
            },
            checkPic(pic){
                const vm = this
                console.log(pic)
                vm.pic = pic
                vm.picModal = true
            },
            closePicModal(){
                const vm = this
                vm.picModal =!vm.picModal
            },
            deleteProduct: async function(productId){
                const vm =this
                const {data} = await axios.delete(`${vm.apiUrl}/api/${vm.apiPath}/admin/product/${productId}`)
                console.log(data)
                this.$store.dispatch('getProducts')
            },
            async changeSelect(item){
                const vm = this
                const product = item
                const {data} = await axios.put(`${vm.apiUrl}/api/${vm.apiPath}/admin/product/${product.id}`,{data:product})
                console.log(data)
            },
        },
        computed:{
            productModal(){
                return this.$store.state.modal
            },
            products(){
                return this.$store.state.products
            },
            pagination(){
                return this.$store.state.pagination
            }
        },
        created() {
            this.$store.dispatch('getProducts')
        }
    }
</script>
<template>
    <section class="h-[816px] bg-products w-full rounded-20 p-4 flex flex-col gap-4 animate__animated animate__fadeInRight relative">
        <PicModal v-if="picModal" :pic="pic" @closePicModal="closePicModal"/>
        <ProductModal v-if="productsModel" :product="product" :isNewProduct="isNew" @productsModal="openProductModal" @getPorduct="getProducts"/>
        <div class="flex items-center justify-between bg-white rounded-10 w-full px-4 py-2 text-white">
            <button class="bg-primary rounded-10 px-6 py-2" @click="openProductModal(true)">加入商品</button>
            <h1 class="bg-primary rounded-10 px-6 py-2">產品列表</h1>
            <div class="flex items-center gap-2">
                <i :class="pagination.has_pre?'':'invisible'" @click="getProducts(pagination.current_page - 1)" class="ri-arrow-left-s-line bg-primary rounded-full text-3xl px-2 py-1"></i>
                <button class="bg-primary rounded-10 px-6 py-2">{{ pagination.current_page }}</button>
                <i :class="pagination.has_next?'':'invisible'" @click="getProducts(pagination.current_page + 1)" class="ri-arrow-right-s-line bg-primary rounded-full text-3xl px-2 py-1"></i>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-md rounded-lg w-full h-full">
            <Loading v-if="isLoading"/>
            <table class="w-full text-lg font-medium text-gray-500 text-center">
                <thead class="text-base text-white uppercase bg-primary sticky top-0 z-10">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            排序
                        </th>
                        <th scope="col" class="px-6 py-3">
                            類別
                        </th>
                        <th scope="col" class="px-6 py-3">
                            產品圖片
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
                        <th scope="col" class="px-6 py-3">
                            編輯
                        </th>
                        <th scope="col" class="px-6 py-3">
                            刪除
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in products" :key="item.id" class="odd:bg-white  even:bg-gray-50 border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-primary text-xl whitespace-nowrap">
                            {{ i + 1 }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.category }}
                        </td>
                        <td class="px-6 py-4 relative">
                            <img v-if="item.imageUrl" :src="item.imageUrl" class="rounded-5 h-[88px] w-[88px] mx-auto z-0" alt="">
                            <p v-else class="h-[88px] w-[88px] flex items-center justify-center rounded-5 hover:brightness-75 mx-auto text-center text-white bg-gray-400">查無圖片</p>
                            <i @click="checkPic(item.imageUrl)" class="ri-zoom-in-fill h-[88px] w-[88px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center bg-opacity-0 bg-black  text-gray-100 hover:bg-opacity-40 duration-200 hover:text-2xl"></i>
                        </td>
                        <td class="px-6 py-4">
                            {{item.title}}
                        </td>
                        <td class="px-6 py-4">
                            $ {{ item.price}}
                        </td>
                        <td class="px-6 py-4">
                            <select @change="changeSelect(item)" name="" id="" v-model="item.is_enabled" :class="item.is_enabled ? 'text-enabled':'text-notEnabled'">
                                <option :value="1">啟用</option>
                                <option :value="0">關閉</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            <i @click="openProductModal(false,item)" class="ri-edit-box-line text-2xl font-medium"></i>
                        </td>
                        <td class="px-6 py-4">
                            <i @click="deleteProduct(item.id)" class="ri-delete-bin-line text-2xl font-medium"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
