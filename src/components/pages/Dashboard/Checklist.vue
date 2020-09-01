<template>
    <div class="w-full max-w-lg">
        <ValidationObserver ref="createChecklist" v-slot="{ handleSubmit }">
            <div class="bg-white shadow-md rounded p-6 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        name="checklistName"
                        class="w-full"
                        :custom-messages="validationMessage.checklistName"
                    >
                        <div class="w-full px-3 mb-6 md:mb-0">
                            <label
                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="checlistName"
                            >
                                Checklist
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
                <template v-else-if="!loading && checklists.length === 0">
                    <tr>
                        <td colspan="3" class="border px-4 py-2 text-center">Tidak Ada Data</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="(checklist, index) in checklists" :key="index">
                        <td class="border px-4 py-2">{{ index+1 }}</td>
                        <td class="border px-4 py-2">{{ checklist.name }}</td>
                        <td class="border px-4 py-2">
                            <button
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3 mb-2"
                                @click="deleteChecklist(checklist.id)"
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
    name: 'Checklist',
    data() {
        return {
            form: {
                name,
            },
            checklists: [],
            loading: true,
            validationMessage: {
                checklistName: {
                    required: 'Checklist harus diisi',
                },
            },
        };
    },
    mounted() {
        this.getChecklists();
    },
    methods: {
        save() {
            axios.post(`${process.env.VUE_APP_BASE_API_URL}checklist`, this.form)
            .then((response) => {
                this.removeForm();
                this.$refs['createChecklist'].reset()
                this.getChecklists();
                this.$swal(
                    'Berhasil',
                    response.data.message,
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
        getChecklists() {
            axios.get(`${process.env.VUE_APP_BASE_API_URL}checklist`)
            .then((response) => {
                this.loading = false
                this.checklists = response.data.data;
            })
            .catch((error) => {
                this.$swal(
                    'Gagal',
                    `${error.data.message}`,
                    'error'
                )
            })
        },
        deleteChecklist(checkId) {
            axios.delete(`${process.env.VUE_APP_BASE_API_URL}checklist/${checkId}`)
            .then((response) => {
                this.$swal(
                    'Berhasil',
                    response.data.message,
                    'success'
                )
                this.getChecklists();
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
        },
    },
}
</script>
