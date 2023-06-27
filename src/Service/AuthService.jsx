import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

class AuthService {
	static async register(user) {
		try {
			const response = await instance.post('/register', user)
			return response.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	static async login(email, password) {
		const student = { email, password }

		try {
			const response = await instance.post('/login', student)
			if (response.data.token) {
		
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('user', JSON.stringify(response.data)) // konwersja na string JSON
			}
			return response.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	static logout() {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
	}

	static getCurrentUser() {
		return localStorage.getItem('user')
	}
}

export default AuthService
