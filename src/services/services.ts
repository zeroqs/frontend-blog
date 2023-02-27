import {FormRegistrationValues, FormValues, PostI, PostsI, User} from "../types/types";
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:4444',
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export const fetchPosts = async (): Promise<PostsI[]> => {
    const res = await instance.get('/posts')
    return res.data
}
export const fetchByPost = async (req: string): Promise<PostI[]> => {
    const res = await instance.get(`/${req}`)
    return [res.data]
}

export const userData = async (params: FormValues): Promise<User> => {
    const res = await instance.post(`/log-in`, params)
    return res.data
}

export const authMe = async (): Promise<User> => {
    const res = await instance.get('/user')
    return res.data
}

export const signUpMe = async (params : FormRegistrationValues): Promise<User> => {
    const res = await instance.post('/sign-up',params)
    return res.data
}