<script>
    import axios from 'axios';
    export default{
        name:'ProductModal',
        props:{
            product:{
                type:Object
            },
            isNewProduct:{
                type:Boolean
            }
        },
        data() {
            return{
                productsModel:false,
                tempProduct:Object.assign({},this.product),
                isNew:this.isNewProduct,
                apiUrl: import.meta.env.VITE_API_URL,
                apiPath: import.meta.env.VITE_API_PATH,
            }
        },
        methods:{
            productsModalHandler:function(){
                const vm = this
                this.$emit('productsModal')
            },
            reNewPorduct:function(){
                this.$emit('getPorduct')
            },
            updateProduct: async function(){
                const vm = this
                let api = `${vm.apiUrl}/api/${vm.apiPath}/admin/product`
                let axiosMethod = 'post'
                if(!vm.isNew){
                    api = `${vm.apiUrl}/api/${vm.apiPath}/admin/product/${vm.product.id}`
                    axiosMethod ='put'
                }
                const {data} = await axios[axiosMethod](`${api}`,{data: vm.tempProduct})
                console.log(data)
                this.productsModalHandler()
                this.reNewPorduct()
            },
            async updloadFile(){
                const uploadedFile = this.$refs.files.files[0]
                const vm = this
                const formData = new FormData()
                formData.append('file-to-upload',uploadedFile)
                const {data} = await axios.post(`${vm.apiUrl}/api/${vm.apiPath}/admin/upload`,formData,{
                    headers:{
                        "Content-Type":'multipart/form-data'
                    }
                })
                if(data.success){
                    vm.$set(vm.tempProduct,'imageUrl',data.imageUrl)
                }
            },
        },
    }
</script>
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur z-30 rounded-20">
        <div class="flex flex-col pt-6 gap-8 p-4 bg-[#D8A034] rounded-20 relative">
                <i @click="productsModalHandler" class="ri-close-line absolute -top-3 -right-3 bg-white text-[#D80000] py-1 px-2 rounded-[20px] hover:bg-[#D80000] hover:text-white"></i>
                <img class="absolute right-[10px] top-[-160px] w-[250px] h-[250px]" src="/src/assets/image/products_model_img.png"  alt="" />
                <h1 class="text-[#BF8616] bg-white p-2 w-fit rounded-lg font-bold">新增新商品</h1>
                <div class="flex flex-col gap-8 bg-white px-4 pt-8 pb-4 rounded-b-[20px]">
                    <div class="flex justify-center gap-4">
                        <div class="relative">
                            <img class="w-40 h-40 bg-[#D9D9D9] rounded-xl" :src="tempProduct.imageUrl" alt="" />
                            <div v-if="!tempProduct.imageUrl" class="bg-gray-200 opacity-40 absolute top-0 w-full h-full rounded-xl">
                                <div class="flex justify-center h-full items-center">請上傳圖片</div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-2 flex-1">
                                <label for="" class="text-lg leading-7 font-bold">商品名稱:</label>
                                <input
                                    type="text"
                                    class="bg-[#D9D9D9] h-full w-[136px] rounded-[5px] pl-3 focus:border-2 focus:border-[#D8A034] focus:ring-2 focus:ring-[#D8A034] focus:outline-none"
                                    placeholder="請輸入商品名稱"
                                    v-model="tempProduct.title"
                                />
                            </div>
                            <div class="flex items-center gap-2 flex-1">
                                <label for="category" class="text-lg leading-7 font-bold">商品分類:</label>
                                <select name="category" id="category" class="bg-[#D9D9D9] h-full w-[136px] rounded-[5px] pl-3" v-model="tempProduct.category">
                                    <option disabled selected>---請選擇---</option>
                                    <option value="套餐">套餐</option>
                                    <option value="吐司">吐司</option>
                                    <option value="漢堡">漢堡</option>
                                    <option value="蛋餅">蛋餅</option>
                                    <option value="炸物">炸物</option>
                                    <option value="炒麵">炒麵</option>
                                    <option value="飲品">飲品</option>
                                </select>
                            </div>
                            <div class="flex items-center gap-2 flex-1">
                                <label for="" class="text-lg leading-7 font-bold">商品原價:</label>
                                <input
                                    type="text"
                                    class="bg-[#D9D9D9] h-full w-[136px] rounded-[5px] pl-3 focus:border-2 focus:border-[#D8A034] focus:ring-2 focus:ring-[#D8A034] focus:outline-none"
                                    placeholder="請輸入商品原價"
                                    v-model="tempProduct.price"
                                />
                            </div>
                            <div class="flex items-center gap-2 flex-1">
                                <label for="" class="text-lg leading-7 font-bold">商品特價:</label>
                                <input
                                    type="text"
                                    class="bg-[#D9D9D9] h-full w-[136px] rounded-[5px] pl-3 focus:border-2 focus:border-[#D8A034] focus:ring-2 focus:ring-[#D8A034] focus:outline-none"
                                    placeholder="請輸入商品特價"
                                    v-model="tempProduct.origin_price"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 justify-end">
                            <div class="flex flex-col gap-2 w-[222px]">
                                <label for="image" class="text-lg leading-7 font-bold">圖片連結:</label>
                                <input
                                    type="file"
                                    ref="files"
                                    @change="updloadFile"
                                    accept="image/png, image/jpeg"
                                    class="file:bg-[#D9D9D9] file:w-24 file:h-6 file:rounded-[5px] file:text-sm file:border-0 file:hover:bg-[#D8A034] file:hover:text-white"
                                />
                            </div>
                            <div class="flex flex-col flex-1">
                                <label for="" class="text-lg leading-7 font-bold">商品描述:</label>
                                <textarea
                                    name=""
                                    id=""
                                    class="bg-[#D9D9D9] rounded-[5px] h-full pl-3 pt-1 focus:border-2 focus:border-[#D8A034] focus:ring-2 focus:ring-[#D8A034] focus:outline-none"
                                    placeholder="請輸入商品描述"
                                    v-model="tempProduct.content"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 justify-end">
                        <div class="flex items-center gap-2">
                            <input
                                type="checkbox"
                                class="text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-[#D8A034]"
                                id="is_enabled"
                                v-model="tempProduct.is_enabled"
                                :true-value="1"
                                :false-value="0"
                            />
                            <label for="is_enabled" class="text-base leading-6 font-bold">是否啟用</label>
                        </div>
                        <button class="bg-[#D80000] hover:bg-[#9c3b3b] text-white text-base leading-6 font-bold py-2 px-6 rounded-[10px]" @click="updateProduct()">送出</button>
                    </div>
                </div>
            </div>
        </div>
</template>