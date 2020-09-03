<template>
    <div class="w-full max-w-lg">
        <ValidationObserver ref="createCategory" v-slot="{ handleSubmit }">
            <div class="bg-white shadow-md rounded p-6 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        name="categoryName"
                        class="w-full"
                        :custom-messages="validationMessage.categoryName"
                    >
                        <div class="w-full px-3 mb-6 md:mb-0">
                            <label
                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="checlistName"
                            >
                                Category
                            </label>
                            <input
                                id="checlistName"
                                v-model="form.name"
                                type="text"
                                class="
                                    appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4
                                    leading-tight focus:outline-none focus:bg-white
                                "
                                placeholder="Sample"
                            >
                            <span class="text-red-500">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            class="resize-none border rounded focus:outline-none focus:shadow-outline
                                w-full h-32 px-4 py-3
                            "
                            placeholder="Description"
                        ></textarea>
                    </div>
                </div>
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="handleSubmit(save)"
                >
                    Button
                </button>
            </div>
        </ValidationObserver>
        <table class="table-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2">No</th>
                    <th class="px-4 py-2">Title</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="loading">
                    <tr>
                        <td colspan="3" class="border px-4 py-2 text-center">Loading ...</td>
                    </tr>
                </template>
                <template v-else-if="!loading && categories.length === 0">
                    <tr>
                        <td colspan="3" class="border px-4 py-2 text-center">Tidak Ada Data</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(category, index) in categories" :key="index">
                        <td class="border px-4 py-2">{{ index+1 }}</td>
                        <td class="border px-4 py-2">{{ category.name }}</td>
                        <td class="border px-4 py-2">
                            <button
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3 mb-2"
                                @click="deleteCategory(category.id)"
                            >
                                Delete
                            </button>
                            <button
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Details
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Category',
    data() {
        return {
            form: {
                name: '',
                description: '',
            },
            categories: [],
            loading: true,
            validationMessage: {
                categoryName: {
                    required: 'Kategori harus diisi',
                },
            },
        };
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        save() {
            axios.post(`${process.env.VUE_APP_BASE_API_URL}category`, this.form)
            .then(() => {
                this.removeForm();
                this.getCategories();

                this.$refs['createCategory'].reset()

                this.$swal(
                    'Berhasil',
                    'Simpan kategori berhasil',
                    'success'
                )
            })
            .catch((error) => {
                this.$swal(
                    'Gagal',
                    `${error.data.message}`,
                    'error'
                )
            })
        },
        getCategories() {
            axios.get(`${process.env.VUE_APP_BASE_API_URL}category`)
            .then(() => {
                this.loading = false
                // this.categories = response.data.data;
            })
            .catch((error) => {
                this.$swal(
                    'Gagal',
                    `${error.data.message}`,
                    'error'
                )
            })
        },
        deleteCategory(checkId) {
            axios.delete(`${process.env.VUE_APP_BASE_API_URL}category/${checkId}`)
            .then((response) => {
                this.$swal(
                    'Berhasil',
                    response.data.message,
                    'success'
                )
                this.getCategories();
            })
            .catch((error) => {
                this.$swal(
                    'Gagal',
                    `${error.data.message}`,
                    'error'
                )
            })
        },
        removeForm() {
            this.form.name = '';
            this.form.description = '';
        },
    },
}
</script>
