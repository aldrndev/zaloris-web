<script>
export default {
  name: 'Register',
  data() {
    return {
      dataRegister: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  emits: ['userRegister', 'navigate', 'autoLogin'],
  methods: {
    userRegisterHandler() {
      this.$emit('userRegister', this.dataRegister)
      this.$emit('autoLogin', {
        email: this.dataRegister.email,
        password: this.dataRegister.password
      })
    },
    goToPage(pageName) {
      this.$emit('navigate', pageName)
    }
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Registration</h2>
      <form v-on:submit.prevent="userRegisterHandler">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            v-model="dataRegister.username"
          />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            v-model="dataRegister.email"
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            v-model="dataRegister.password"
          />
        </div>
        <div class="input-group">
          <label for="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            v-model="dataRegister.phoneNumber"
          />
        </div>
        <div class="input-group">
          <label for="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Enter your address"
            v-model="dataRegister.address"
          ></textarea>
        </div>
        <div class="double-input">
          <button type="submit">Register</button>
        </div>
        <div class="link-register" v-on:click.prevent="goToPage('login')">
          <span>Already have account? </span><a href="">Login</a>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
