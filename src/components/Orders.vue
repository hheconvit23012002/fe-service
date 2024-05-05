<script>
import Header from "@/components/Header.vue";
import order from "@/utills/order.js";
import DetailOrder from "@/components/DetailOrder.vue";


export default {
  name: "Orders",
  components: {DetailOrder, Header},
  data() {
    return {
      orders : [],
      isModalOpened : false,
      order : {}
    }
  },
  mounted() {
    this.getALlOrder();
  },
  methods : {
    async getALlOrder(){
      await order.get('/orders').then((res) => {
        this.orders = res.data.data
        console.log(this.orders)
      }).catch((err) => {
        console.log(err)
      })
    },
    openModal(id) {
      this.orders.map((value) => {
        if(value.id === id){
          this.order = value
        }
      })
      this.isModalOpened = true;
    },
    closeModal () {
      this.isModalOpened = false;
    }
  }
}
</script>

<template>
  <Header />
  <div class="container">
    <div class="form-group">
      <!--      <input class="form-control" v-model="q">-->
    </div>
    <DetailOrder :isOpen="isModalOpened" :order="order" @modal-close="closeModal"  name="first-modal">
    </DetailOrder>
    <h2>Orders</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="text-center">ID</th>
        <th class="text-center">address</th>
        <th class="text-center">email</th>
        <th class="text-center">pay_status</th>
        <th class="text-center">phone_number</th>
        <th class="text-center">created_at</th>
        <th class="text-center">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,index) in orders" :key="index">
        <td class="text-center">{{ value.id }}</td>
        <td class="text-center">{{ value.address }}</td>
        <td class="text-center">{{ value.email }}</td>
        <td class="text-center">{{ value.pay_status }}</td>
        <td class="text-center">{{ value.phone_number }}</td>
        <td class="text-center">{{ value.created_at }}</td>
        <td class="text-center">
          <button class="btn btn-primary" @click="openModal(value.id)">View</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>