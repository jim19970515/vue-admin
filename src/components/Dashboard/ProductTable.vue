<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "ProductTable",
  data() {
    return {
      products: [],
      apiUrl: import.meta.env.VITE_API_URL,
      apiPath: import.meta.env.VITE_API_PATH
    };
  },
  methods: {
    async getProducts() {
      const vm = this;
      try {
        const { data } = await axios.get(
          `${vm.apiUrl}/api/${vm.apiPath}/admin/products/all`
        );
        if (data.success) {
          console.log(data.products);
          for (let item in data.products) {
            console.log();
            // data.products資料結構為{{},{},{}}
            //透過for in 將資料解出來
            vm.products.push(data.products[item]);
            // vm.products = Object.values(data.products);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: data.message,
            text: "資料取得異常請聯絡工程師",
            confirmButtonColor: "#D8A034"
          });
        }
      } catch (err) {
        return false;
      }
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
<template>
  <div class="col-span-2 bg-white rounded-10 p-4">
    <h3 class="text-primary font-bold text-2xl pb-4">產品列表</h3>
    <div
      class="relative shadow-md rounded-lg overflow-auto h-[calc(816px-184px-48px-32px-40px-12px)]"
    >
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs uppercase bg-primary text-white sticky top-0">
          <tr>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">排序</th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">圖片</th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              餐點名稱/內容/售價
            </th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">是否啟用</th>
          </tr>
        </thead>
        <tbody class="overflow-y-auto max-h-auto">
          <tr
            v-for="(item, i) in products"
            :key="i"
            class="bg-gray-100 text-gray-900"
          >
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              {{ i + 1 }}
            </th>
            <td class="px-6 py-4">
              <img
                :src="item.imageUrl"
                class="h-20 w-20 object-cover rounded-10"
                alt=""
              />
            </td>
            <td class="px-6">
              <h3 class="text-xl font-bold">{{ item.title }}</h3>
              <p class="text-md font-normal text-gray-600">
                {{ item.content }}
              </p>
              <p class="text-xl text-primary font-semibold">{{ item.price }}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-semibold">
              <p v-if="item.is_enabled" class="text-xl text-enabled">已啟用</p>
              <p v-else class="text-xl text-notEnabled">未啟用</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
