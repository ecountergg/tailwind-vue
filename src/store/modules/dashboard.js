const state = {
    sideBarOpen: false,
};

const getters = {
    sideBarOpen: state => state.sideBarOpen,
};

const actions = {
    toggleSidebar(context) {
        context.commit('toggleSidebar');
    },
};

const mutations = {
    toggleSidebar (state) {
        state.sideBarOpen = !state.sideBarOpen;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
