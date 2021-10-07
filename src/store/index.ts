import Vue from "vue";
import Vuex from "vuex";
import TodoStoreModule from "@/store/todo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    TodoStoreModule,
  },
});
