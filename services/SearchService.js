import axios from 'axios'

const apiClient = axios.create({
	baseURL: `https://private-94343-roommetest.apiary-mock.com/`,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export default {
	getRequest(path, configs) {
		return apiClient.get(path, configs)
	}
}
