import ApiManager from "./ApiManager";
export const userLogin=async data =>{
    try {
        console.log("here");   
        const result=await ApiManager("/auth/Login",{
            method:"POST",
            headers:{
                'accept': "text/plain",
                'Content-Type':"application/json"
            },
            data:data
        });
        return result;
    } catch (error) {
        console.log(error);         
        return error; 
    }
}