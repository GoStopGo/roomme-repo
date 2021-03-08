import searchService from '~/services/SearchService'

import config from '~/config'

export default {
	fetchAutoComplete(configs) {
		return searchService.getRequest(config.api.search.autoComplete, configs)
	},
	fetchUnit(configs) {
		return searchService.getRequest(config.api.search.unit, configs)
	}
}
