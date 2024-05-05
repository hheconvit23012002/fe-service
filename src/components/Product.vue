<script>
import productAxios from "@/utills/productAxios.js";
import Header from "@/components/Header.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {Header},
  data() {
    return {
      products: [],
      card: []
    }
  },
  mounted(){
    this.getAllProducts()
  },
  methods: {
    getAllProducts() {
      productAxios.get("/book")
          .then((res) => {
            this.products = res.data.data.data.map((value) => {
              return {
                id: value.id,
                title: value.title,
                price: value.price,
                quantity: value.quantity,
                author: value.author,
                category: value.category.name,
              }
            })
          }).catch((err) => {
            console.log(err)
      })

    },
    async addToCard(id) {
       this.card = JSON.parse(localStorage.getItem('card'));
       if(this.card === null || this.card === undefined || this.card === ""){
         this.card = []
       }
       let flag = false
       this.card = this.card.map((value) => {
         if(value.product_id === id){
           value.number++;
           flag = true
         }
         return value
       })
      if(flag === false){
        await productAxios.get(`/book/${id}`)
            .then((res) => {
              let productAdd = res.data.data[0]
              this.card.push({
                "product_id" : id,
                "number" : 1,
                "price" : productAdd.price,
                "name_product" : productAdd.title,
                "image_product" : "",
              })
            }).catch((err) => {
          console.log(err)
        })
      }
      localStorage.setItem("card", JSON.stringify(this.card))
      alert("success")

    }
  },
}
</script>

<template>
  <Header />
  <div class="container">
    <div class="form-group">
      <!--      <input class="form-control" v-model="q">-->
    </div>
    <h2>Products</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <th class="text-center">ID</th>
        <th class="text-center">title</th>
        <th class="text-center">price</th>
        <th class="text-center">quantity</th>
        <th class="text-center">author</th>
        <th class="text-center">category</th>
        <th class="text-center">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value,index) in products" :key="index">
        <td class="text-center">{{ index + 1 }}</td>
        <td class="text-center">{{ value.title }}</td>
        <td class="text-center">{{ value.price }}</td>
        <td class="text-center">{{ value.quantity }}</td>
        <td class="text-center">{{ value.author }}</td>
        <td class="text-center">{{ value.category }}</td>
        <td class="text-center">
          <button class="btn btn-primary" @click="addToCard(value.id)">Add to card</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>