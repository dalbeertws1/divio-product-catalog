import axios from 'axios'
export const register = async (obj: any) => {

    await axios.post(`http://0.0.0.0:8000/register/`, obj)
        .then((response) => {
            window.location.href = '/';
        })
        .catch((err) => {
            console.log(err)
        })
}

export async function handleedit(item:any){
    console.log("ok chk");
    const token=localStorage.getItem("token")
const config = {
   
    headers: { Authorization: `Bearer ${token}` }
};
let body={
    id:item.id
}
await axios.post(`http://0.0.0.0:8000/`, body,config)
.then((response) => {
   console.log("success");
  
})
.catch((err) => {
   
})
}
export  async function login(obj: any) {

   return await axios.post(`http://0.0.0.0:8000/api/token/`, obj)
        .then((response) => {
           
           
            localStorage.setItem("token", response.data.access)
            localStorage.setItem("email", obj.email)
            window.location.href = '/home';
           return "success"
        })
        .catch((err) => {
            console.log(err)
           return err
        })
}

export const debounce = (func: any) => {
    let timer: any;
    let cont: any = this;
    return function (...args: any) {
        const context = cont;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args);
        }, 2000);
    }
}
