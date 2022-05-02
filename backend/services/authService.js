import { sendRequest } from "../kafka/kafka";

const register = async (data) => {
}

const login = async (data) => {
    const { email, password } = data
    sendRequest('auth', { email, password, action: 'LOGIN' }, (err, data) => {
        if (err) {
            return { success: false, code: 400, message: err }
        }
        return { success: true, code: 200, message: data }
    })
}

export { register, login }