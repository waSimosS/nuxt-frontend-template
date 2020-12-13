import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/auth/login/'

class AuthService {
  login (user) {
    return axios
      .post(API_URL, {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        if (response.data.access) {
          const currentUser = {
            username: user.email,
            accessToken: response.data.access
          }
          localStorage.setItem('user', JSON.stringify(currentUser))
        }

        return user.email
      })
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
