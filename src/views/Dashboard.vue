<script>
import ProductsTable from "../components/Dashboard/ProductTable.vue";
import CouponTable from "../components/Dashboard/CouponTable.vue";
import OrderTable from "../components/Dashboard/OrderTable.vue";
import ICountUp from "vue-countup-v2";
export default {
  name: "dashboard",
  components: {
    ProductsTable,
    CouponTable,
    OrderTable,
    ICountUp,
    options: {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      prefix: "",
      suffix: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<template>
  <div
    class="h-[816px] bg-products w-full rounded-20 p-4 flex flex-col gap-4 animate__animated animate__fadeInRight"
  >
    <div class="grid grid-cols-3 gap-4">
      <div
        class="bg-[#90622C] col-span-2 rounded-10 px-14 flex gap-12 items-center"
      >
        <h1 class="text-white font-bold text-4xl">welcome to xixi admin</h1>
        <img
          class="h-[184px] w-[184px] object-cover"
          src="@/assets/image/admin_img.jpg"
          alt=""
        />
      </div>
      <div class="col-span-1 flex flex-col gap-2">
        <div
          class="bg-[#90622C] h-1/2 rounded-10 flex items-center justify-between px-8 text-white text-2xl text-bold"
        >
          <h2 class="text-2xl font-medium">今日營收</h2>
          <div class="flex items-center gap-4">
            <i
              class="ri-exchange-dollar-line bg-[#D8A034] px-1 rounded-full"
            ></i>
            <p class="text-2xl font-medium">
              <ICountUp
                :delay="delay"
                :endVal="9999"
                :options="options"
                @ready="onReady"
              />
            </p>
          </div>
        </div>
        <div
          class="bg-[#D8A034] h-1/2 rounded-10 flex items-center justify-between px-8 text-white text-2xl text-bold"
        >
          <h2 class="text-2xl font-medium">昨日營收</h2>
          <div class="flex items-center gap-4">
            <i
              class="ri-exchange-dollar-line bg-[#90622C] px-1 rounded-full"
            ></i>
            <p class="text-2xl font-medium">
              <ICountUp
                :delay="delay"
                :endVal="9999"
                :options="options"
                @ready="onReady"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <ProductsTable />
      <div class="col-span-1 rounded-10 grid grid-rows-2 space-y-4">
        <CouponTable />
        <OrderTable />
      </div>
    </div>
  </div>
</template>
