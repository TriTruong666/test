import axios from "axios";

export const getAllProduct = async (data) =>{
    try{
        const url = `https://reqres.in/api/unknown`;
        const res = await axios.get(url);
        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}