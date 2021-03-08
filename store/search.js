import searchApi from '~/api/search'

export const state = () => ({
	autoComplete: [],
	unit: {}
})

export const mutations = {
	SET_AUTO_COMPLETE(state, data) {
		state.autoComplete = data
	},

	SET_UNIT(state, data) {
		state.unit = data
	}
}

export const actions = {
	async fetchAutoComplete({ commit }, configs) {
		const response = await searchApi.fetchAutoComplete(configs)
		const { data } = response.data
		commit('SET_AUTO_COMPLETE', data)
		return response
	},

	async fetchUnit({ commit }, configs) {
		const response = await searchApi.fetchUnit(configs)
		const { data } = response.data
		commit('SET_UNIT', data)
		return response
	},

	clearAutoComplete({ commit }) {
		commit('SET_AUTO_COMPLETE', [])
	}
}
