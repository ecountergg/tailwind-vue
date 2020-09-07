import { getToken } from '@/utils/auth';

const state = {
    token: getToken(),
};

const getters = {
    GET_TOKEN: state => state.token
};

const actions = {};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
