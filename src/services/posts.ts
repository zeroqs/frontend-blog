import {PostI, PostsI} from "../types/types";
import axios from "axios";

const ALL_POSTS = 'http://localhost:4444/posts'
const BASE = 'http://localhost:4444'

export const fetchPosts = async (): Promise<PostsI[]> => {
    const res = await axios.get(ALL_POSTS)
    return res.data
}
export const fetchByPost = async (req: string): Promise<PostI[]> => {
    const res = await axios.get(`${BASE}/${req}`)
    return [res.data]
}