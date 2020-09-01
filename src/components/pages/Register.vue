<template>
    <div id="login" class="flex items-center">
        <div class="w-full max-w-xs mx-auto">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline
                        "
                        placeholder="example@example.com"
                    >
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline
                        "
                        placeholder="Username"
                    >
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline
                        "
                        placeholder="******************"
                        autocomplete="on"
                    >
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                            focus:outline-none focus:shadow-outline
                        "
                        type="button"
                        @click="register"
                    >
                        Register
                    </button>
                    <router-link to="/">
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Sign In
                        </a>
                    </router-link>
                </div>
            </form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Ecounter Inc. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            form: {
                email: '',
                username: '',
                password: '',
            },
            apiUrl: process.env.VUE_APP_BASE_API_URL,
            error: {
                message: '',
            }
        };
    },
    watch: {
        form: {
            handler(){
                this.removeError();
            },
            deep: true
        },
    },
    methods: {
        register() {
            axios.post(`${process.env.VUE_APP_BASE_API_URL}register`, this.form)
            .then((response) => {
                this.removeForm();
                this.$swal(
                    'Berhasil',
                    response.data.message,
                    'success'
                )
            })
            .catch(error => {
                this.$swal(
                    'Gagal',
                    error.response.data.errorMessage,
                    'error'
                )
            });
        },
        removeError() {
            this.error.message = '';
        },
        removeForm() {
            this.form.email = '';
            this.form.username = '';
            this.form.password = '';
        },
    },
}
</script>
<style scoped>
    #login {
        height: 100vh;
    }
</style>
