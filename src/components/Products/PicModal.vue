<script>
    export default{
        props:{
            pic:{
                type:String
            }
        },
        data(){
            return{
                productImg:this.pic
            }
        },
        methods:{
            closePicModal(){
                this.$emit('closePicModal')
            }
        }
    }
</script>
<template>
    <div @click="closePicModal" class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-55 z-40 rounded-20">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
            <img class="w-72 h-72 z-50 opacity-100 rounded-20 outline-dashed outline-8 outline-primary p-2 bg-white" :src="productImg" alt="">
        </div>
    </div>
</template>