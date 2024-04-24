import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {loginRoute} from "../utils/APIRouts"
import axios from "axios";
export default function Login(){

      const navigate = useNavigate();

      const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


      const [values,setValues] = useState({
        username:"",
        password:""
      })

      useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
           navigate("/");
        }
    },[])

 const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
     const handleSubmit=async(e)=>{
          e.preventDefault();
          if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data);
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
         "chat-app-user",
          JSON.stringify(data.newUser)
        );

        navigate("/");
      }
    }
          setValues({
            username:"",
            password:""
          })

     }

     const handleChange=(e)=>{
          
          setValues({...values,[e.target.name]:e.target.value})
     }
  return (
    <div class="flex justify-center items-center min-h-screen">
         <form onSubmit={handleSubmit}  class=" bg-yellow-500 rounded-md p-8 m-5 max-w-lg  w-full">
           <label class="block" >username</label>
           <input text = "text" class="w-full p-2 rounded-md mt-1 block " name="username" placeholder='username' value={values.username} onChange={(e)=>{handleChange(e)}}/>
            <label class="block">password</label>
           <input text = "text"  class="w-full p-2 rounded-md mt-1 block" name="password" placeholder='password'value={values.password} onChange={(e)=>{handleChange(e)}}/>
           <div class="flex justify-center">
           <button type='submit' class="block text-white bg-gray-500 m-2 p-2 rounded-md w-48 ">LOGIN</button>
            </div>
           <span class="flex justify-center m-2">New User <Link to="/register" class="block text-white ml-2 bg-gray-800 p-2 rounded-md">register</Link></span>
          

{/* 
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span> */}
          
         </form>
         <ToastContainer/>
    </div>
  )
}


//value={value.name} is JSX syntax used in React for setting props or attributes based on JavaScript expressions.
//value: value.name (correcting the placement of the curly braces) is used in JavaScript object literals to assign a value to a property named value.
