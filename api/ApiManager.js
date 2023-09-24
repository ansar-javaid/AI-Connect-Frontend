import axios from "axios";
const ApiManager = axios.create({
    baseURL: "https://cuconnectapitest.azurewebsites.net/api",
    responseType:'json',
    withCredentials:true,
});
export default ApiManager;