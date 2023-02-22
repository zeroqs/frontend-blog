import {Post} from "../types/types";
import axios from "axios";

const BASE = 'http://localhost:4444'


export const fetchPosts = async (req: string = ''): Promise<Post[]> => {
    const res = await axios.get(`${BASE}/${req}`)
    return res.data
}