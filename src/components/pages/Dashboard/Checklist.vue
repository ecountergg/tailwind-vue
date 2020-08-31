<template>
    <div class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                >
                    Checklist
                </label>
                <input
                    id="grid-first-name"
                    v-model="form.name"
                    type="text"
                    class="
                        appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4
                        mb-3 leading-tight focus:outline-none focus:bg-white
                    "
                    placeholder="Sample"
                >
            </div>
        </div>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="save"
        >
            Button
        </button>
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
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3"
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
        };
    },
    mounted() {
        this.getChecklists();
    },
    methods: {
        save() {
            axios.post(`${process.env.VUE_APP_BASE_API_URL}checklist`, this.form)
            .then((response) => {
                console.log(response);
                this.removeForm();
                this.getChecklists();
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getChecklists() {
            axios.get(`${process.env.VUE_APP_BASE_API_URL}checklist`)
            .then((response) => {
                console.log(response);
                this.loading = false
                this.checklists = response.data.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        deleteChecklist(checkId) {
            axios.delete(`${process.env.VUE_APP_BASE_API_URL}checklist/${checkId}`)
            .then((response) => {
                console.log(response);
                this.getChecklists();
            })
            .catch((error) => {
                console.log(error);
            })
        },
        removeForm() {
            this.form.name = '';
        },
    },
}
</script>
