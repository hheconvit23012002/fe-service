<script>
import Header from "@/components/Header.vue";
import checkout from "@/utills/checkout.js";

import {onMounted} from "vue";

// onMounted(() => {
//   Echo.channel('checkout')
//       .listen('CheckoutEvent', e => {
//         console.log(e)
//       })
// })
export default {
  name: "Checkout",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {Header},
  data() {
    return {
      card : [],
      address : "",
      email : "",
      phone_number : "",
      des : "",
    }
  },
  mounted() {
    this.getCard();
    this.setupEcho();
  },
  methods: {
    setupEcho() {
      Echo.channel("checkout").listen("CheckoutEvent", e => {
        console.log(1)
        console.log(e);
      });
    },
    getCard() {
      this.card = JSON.parse(localStorage.getItem("card"))
      if(this.card === null || this.card === undefined || this.card === ""){
        this.card = []
      }
    },
    removeInCard(product_id){
      this.card = this.card.filter((value) => {
        if(product_id !== value.product_id){
          return value
        }
      })
      localStorage.setItem("card", JSON.stringify(this.card))
    },
    async checkout(){
      if(this.card === []){
        alert("Card empty")
        return;
      }
      await checkout.post("/checkout",{
        address : this.address,
        email : this.email,
        phone_number : this.phone_number,
        description : this.description,
        item : this.card
        // eslint-disable-next-line no-unused-vars
      }).then((res ) => {
        alert("success")
        localStorage.setItem("card", JSON.stringify([]))
        // this.$router.push('/');
      }).catch((err) => {
        alert("error")
        console.log(err)
      })
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
    <h2>Card</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="text-center">ID</th>
        <th class="text-center">title</th>
        <th class="text-center">price</th>
        <th class="text-center">number</th>
        <th class="text-center">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,index) in card" :key="index">
        <td class="text-center">{{ index + 1 }}</td>
        <td class="text-center">{{ value.name_product }}</td>
        <td class="text-center">{{ value.price }}</td>
        <td class="text-center">{{ value.number }}</td>
        <td class="text-center">
          <button class="btn btn-primary" @click="removeInCard(value.product_id)">Remove card</button>
        </td>
      </tr>
      </tbody>
    </table>
    <form method="POST">
      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" class="form-control" v-model="address" id="address" aria-describedby="address" placeholder="address" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" v-model="email" id="email" aria-describedby="email" placeholder="email" required>
      </div>
      <div class="form-group">
        <label for="phone_number">Phone number</label>
        <input type="text" class="form-control" v-model="phone_number" id="phone_number" aria-describedby="phone number" placeholder="phone_number" required>
      </div>
      <div class="form-group">
        <label for="des">Des</label>
        <textarea class="form-control" v-model="des" id="des"></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-3" @click.prevent="checkout">Checkout</button>
    </form>
  </div>
</template>

<style scoped>

</style>