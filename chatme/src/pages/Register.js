import React,{useState,useEffect} from 'react'
import { useNavigate, Link,} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios'
import { registerRoute } from "../utils/APIRouts";
export default function Register(){
    
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

    const[values,setValues] = useState({
         username:"",
         email:"",
         password:"",
         cnfpassword:""
    }); 

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
           navigate("/");
        }
    },[])
    const handleChange=async(e)=>{

         setValues({...values,[e.target.name]:e.target.value}) // every input given by use get store in name which is username,email,password
         //...values jo input me dalte hai each section me agar ...values hata de to only last input ka data console hoga
    }

     const handleValidation =()=>{
         
     
        const {username,email,password,cnfpassword} = values;
        if(password!==cnfpassword){
          console.log(password);
          console.log(cnfpassword);
           toast.error("password and confirmpassword should be same",toastOptions);
           return false;
        }else if(username.length<3){
           toast.error("username should be greater than 3");
           return false;
        }else if(password.length<8){
          toast.error("password should be greater than 8");
          return false;
        }else if(email === ""){
          toast.error("email is required");
          return false;
        }
        return true;
     };


    const handleSubmit=async (e)=>{
        e.preventDefault();
       // console.log(values);
        if(handleValidation()){
            const {email,username,password} = values;
            console.log("kS")
           const  {data} = await axios.post(registerRoute,{
             username,email,password
             
           })
            console.log(data); //data return newUser object see in the controller
          
            if(data.status === false){
              toast.error(data.message,toastOptions);
            }else if (data.status === true) {
                    console.log(data);
                    localStorage.setItem(
                  "chat-app-user",
                JSON.stringify(data.newUser)
              );
              navigate('/');
            }
          
        }


        setValues({
            username: "",
            email: "",
            password: "",
            cnfpassword: ""
          });
    }
  return (
    <div class="flex justify-center items-center min-h-screen">
         <form onSubmit={(e)=>handleSubmit(e)} class="w-90 p-10 m-10 rounded-md bg-yellow-400 w-1/3">
            <label for="username" class="block  text-base mb-2">username</label>
            <input type="text" class="rounded-md w-full p-3" placeholder='username' value = {values.username} name='username' onChange={(e)=>handleChange(e)}/>
          
             <label for="email" class="block text-base mb-2">email</label>
            <input type="text" class="rounded-md w-full p-3" placeholder='email' name='email' value={values.email} onChange={(e)=>handleChange(e)}/>
            <label class="block">password</label>
            <input type="text" class="rounded-md w-full p-3" placeholder='password' name='password' value={values.password}onChange={(e)=>handleChange(e)}/>
            <label class="block">confirmpassword</label>
            <input type="text" class="rounded-md w-full p-3" placeholder='conformpassword' name='cnfpassword' value={values.cnfpassword} onChange={(e)=>handleChange(e)}/>
          
            <div class="flex justify-center p-2 m-2 ">
            <button type='submit'  class=" block bg-yellow-600 text-white rounded-md p-2 w-48">Create User</button>
            </div>
           <span class="flex justify-center">
            Already have an account ? <Link to="/login" class="block w-20 bg-yellow-600 text-white rounded-md p-2 m-3 ">Login.</Link>
          </span>
         </form>
         <ToastContainer/>
    </div>
  )
}
