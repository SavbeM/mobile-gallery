import axios from "axios";
import {ImageItemI} from "../types";

export const instance = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        "Authorization": "Client-ID ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9"
    }
});

export const  getAllImages = async () => await instance.get<[ImageItemI]>('/photos/?per_page=20').then(response => response.data).catch(err => {
    return err
})
