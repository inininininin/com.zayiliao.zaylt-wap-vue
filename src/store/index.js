import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
import shop from './moudle/date'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{ shop },
	plugins : [createVuexAlong({
	 	name: "hello-vuex-along",
	 	session: false,
	 	local : {list : shop},
	 })]
})
