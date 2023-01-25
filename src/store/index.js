const store = new Vuex.Store({
    namespaced: true,
    state: {
        S_UPDATE_TABLE_MAIN: false,
    },
    mutations: {
        UPDATE_TABLE_MAIN(){
            state.S_UPDATE_TABLE_MAIN = params;
        }
    },
    actions: {
        A_UPDATE_TABLE_MAIN({commit}, data){
            commit("UPDATE_TABLE_MAIN",data);
        }
    },
    getters: {
        G_UPDATE_TABLE_MAIN(state){
            return state.S_UPDATE_TABLE_MAIN;
        } 
    }
});
export default store;