<script >
import { defineComponent} from "vue";
import auth from "@/utills/auth.js";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      submitting:false,
    }
  },
  methods : {
    login()
    {
      this.submitting = true
      auth.post("/login",{
        email : this.email,
        password : this.password
      }).then((res ) => {
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token)
        this.$notify({ type: "success",title: "Login success", text: "thanh cong", duration: 1000 });
        this.$router.push('/');
      }).catch((err) => {
        this.$notify({ type: "error",title: "Login error", text: "that bai" });
        console.log(err)
      })
    }
  }
})
</script>

<template >
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="mb-4">Đăng Nhập</h2>
        <form method="POST">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-primary mt-3" @click.prevent="login">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>