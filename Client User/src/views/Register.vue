<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

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
  methods: {
    ...mapActions(useUserStore, ['registerUser']),
    registerHandler() {
      this.registerUser(this.dataRegister).then((success) => {
        if (success) {
          this.$router.push('/login')
        }
      })
    },
    changePage(page) {
      this.$router.push({ name: page })
    }
  }
}
</script>

<template>
  <section>
    <div class="registration">
      <h2>Registration</h2>
      <form @submit.prevent="registerHandler">
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
          <button type="submit" class="mt-5 px-10 py-3 bg-blue-600 text-white rounded">
            Register
          </button>
        </div>
        <div class="link-register mt-4">
          <span>Already have account? </span
          ><a href="" @click.prevent="changePage('login')" class="underline transition duration-300"
            >Login</a
          >
        </div>
      </form>
    </div>
  </section>
</template>
