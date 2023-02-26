import {FormValues, PostsI, User} from "../types/types";
import axios from "axios";

const BASE = 'http://localhost:4444'

export const userData = async (params : FormValues): Promise<User> => {
    const res = await axios.post(`${BASE}/log-in`,params)
    return res.data
}