
// import React, { useEffect, useState } from "react";
// // import styled from "styled-components";
// import axios from "axios";
// import { Buffer } from "buffer";
// // import loader from "../assets/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { setAvatarRoute } from "../utils/APIRouts";


// export default function SetAvatar (){
 

   
//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 8000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const navigate = useNavigate();
//   const api = `https://api.multiavatar.com/4645646`;

//     const[avtar,SetAvatar] = useState([]);
//      const[loading,setLoading] = useState(true);
//      const [selectedAvatar, setSelectedAvatar] = useState(undefined);
 

//      useEffect(async () => {
//       if (!localStorage.getItem("chat-app-user"))
//         navigate("/login");
//     }, []);
    

//     const setProfilePicture = async()=>{
         
//        if(selectedAvatar === undefined){
//          toast.error("Please select an avatar");
//        }else{

//           const user = await JSON.parse( localStorage.getItem("chat-app-user"));

//            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
//             image: avtar[selectedAvatar],
//           });

//           if (data.isSet) {
//             user.isAvatarImageSet = true;
//             user.avatarImage = data.image;
//             localStorage.setItem(
//               process.env.REACT_APP_LOCALHOST_KEY,
//               JSON.stringify(user)
//             );
//             navigate("/");
//           } else {
//             toast.error("Error setting avatar. Please try again.", toastOptions);
//           }
          
//        }
//     }


//      useEffect(()=>{

//        const imagedata = async()=>{
//       const data =[];
//       // console.log("dd");
//       for(let x=0;x<4;x++)
//        {
//          const image = await axios.get( `${api}/${Math.round(Math.random() * 1000)}`);
//           const buffer = new Buffer(image.data);
//           data.push(buffer.toString("base64"));
//         }

//         SetAvatar(data);
//         setLoading(false);
//       };
//       imagedata();
//     },[])


   


//   return (
//     <>
//         <div>   
//             <h1 class="flex justify-center items-center">Pick an Avatar as your profile pictur</h1>
//         </div>
        
//         <div>
           
//            {avtar.map((avtar,index)=>{
//                  return(
//                      <img src={`data:image/svg+xml;base64,${avtar}`}
//                         alt="avtar"
//                         key={avtar}
//                         onClick={()=> setSelectedAvatar(index)}
                        
//                       />
                      
//                  );
//            })}
    


//         </div>

//         <button onClick={setProfilePicture} >Set as Profile Picture</button>
//         <ToastContainer/>
//     </>
//   )
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
 import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRouts";

export default function SetAvatar() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;

  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let x = 0; x < 4; x++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = Buffer.from(image.data); // Changed to Buffer.from
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      console.log("d")
      const userdata= localStorage.getItem("chat-app-user");
      console.log(userdata);
      const user = JSON.parse(userdata);
      
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  if (loading) return <p>Loading...</p>; // Handle loading state

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-800">
    {/* flex flex-col justify-center items-center min-h-screen bg-orange-800 */}
      <div className=" mt-4">
        <h1 className="text-2xl font-bold text-white">Pick an Avatar as your profile picture</h1>
      </div>

      <div className="flex flex-wrap justify-center items-center">
      {avatar.map((avatar, index) => (
        <div 
          key={index}
          className={`w-48 h-48 p-5 ${
            selectedAvatar === index ? "border-4 border-blue-500" : ""
          }`}
          onClick={() => setSelectedAvatar(index)}
        >
          <img
            src={`data:image/svg+xml;base64,${avatar}`}
            alt={`Avatar ${index}`}
            className="max-w-full max-h-full" // Ensure image fits within the container
          />
        </div>
      ))}
    </div>

      <div className="p-2 rounded-md text-white bg-black">
      <button onClick={setProfilePicture}>Set as Profile Picture</button>
      </div>
      <ToastContainer />
    </div>
  );
}
