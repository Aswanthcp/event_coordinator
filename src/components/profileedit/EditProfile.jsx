// import React, { useEffect, useState } from "react";

// import { useForm } from "react-hook-form";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useSelector, useDispatch } from "react-redux";
// import Navbar from "../navbar/Navbar";
// import Sidebar from "../sidebar/Sidebar";
// import "./editprofile.scss";
// import { coordinatorsURL } from "../../utils/Constants";

// const EditProfile = () => {
//   const generateError = (error) =>
//     toast.error(error, {
//       position: "top-right",
//     });

//   const token = useSelector((state) => state.token);
//   const cord = useSelector((state) => state.cord);
//   const [imageSelected, setImageSelected] = useState(null);
//   const [coordinator, setCoordinator] = useState();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const onSubmit = async (data) => {
//     const datas = {
//       email: data.email || coordinator.email,
//       username: data.username || coordinator.username,
//       phone_number: data.phone_number || coordinator.phone_number,
//     };
    
//     axios
//       .put(
//         coordinatorsURL + `${cord.id}`,
//         {
//           datas,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(async (response) => {
        
//         setCoordinator(response.data);

//         if (response.data) {
//           toast.success(
//             `Events info added Succsessfully`,
//             { theme: "light" },
//             {
//               position: "top-right",
//             }
//           );
//           navigate("/application");
//         } else {
//           generateError(response.error.message);
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           generateError(error.response.data.message);
//         } else {
//           generateError("Network error. Please try again later.");
//         }
//       });
//   };
//   useEffect(()=>{
//     axios
//       .get(
//         `${coordinatorsURL}${cord.id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCoordinator(response.data);
//       })
//       .catch((error) => {
//         if (
//           error.response &&
//           error.response.status >= 400 &&
//           error.response.status <= 500
//         ) {
//           console.log(error.response.data.message);
//         }
//       });
//   },[])

//   return (
//     <div className="new-profile">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>EDIT PROFILE</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               className="edit-img"
//               src="data:image/jpeg;base64,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"
//               //   src={
//               //     imageSelected
//               //       ? URL.createObjectURL(imageSelected)
//               //       : .application.imageUrl
//               //   }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               encType="multipart/form-data"
//               id="form"
//             >
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   accept="image/jpeg, image/png"
//                   type="file"
//                   id="file"
//                   // onChange={(e) => setImageSelected(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>
//               <div className="formInput">
//                 <label>USER NAME</label>
//                 <input
//                   type="text"
//                   placeholder="ENTER USER NAME"
//                   defaultValue={coordinator?.username}
//                   //   onChange={(event) => setname(event.target.value)}
//                   {...register("username")}
//                 />
//               </div>
//               <div className="formInput">
//                 <label>EMAIL</label>
//                 <input
//                   type="text"
//                   defaultValue={coordinator?.email}
//                   //   onChange={(event) => setState(event.target.value)}
//                   placeholder="ENTER EMAIL"
//                   {...register("email")}
//                 />
//               </div>
//               <div className="formInput">
//                 <label>PHONE NUMBER</label>
//                 <input
//                   type="text"
//                   defaultValue={coordinator?.phone_number}
//                   //   onChange={(event) => setPlace(event.target.value)}
//                   placeholder="ENTER PHONE NUMBER "
//                   {...register("phone_number", {})}
//                 />
//               </div>
//               {/* <div className="formInput">
//                 <label>DISCRPTION</label>
//                 <input
//                   type="text"
//                   //   defaultValue={.application.discription}
//                   //   onChange={(event) => setDiscription(event.target.value)}
//                   placeholder="ENTER DISCRPTION "
//                   {...register("discription")}
//                 />
//               </div>
//               <div className="formInput">
//                 <label>CITY</label>
//                 <input
//                   type="text"
//                   //   defaultValue={.application.city}
//                   //   onChange={(event) => setCity(event.target.value)}
//                   placeholder="ENTER CITY "
//                   {...register("city")}
//                 />
//               </div> */}

//               <button type="submit">SAVE</button>
//             </form>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";

import "./editprofile.scss";
import { coordinatorsURL } from "../../utils/Constants";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const EditProfile = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const token = useSelector((state) => state.token);
  const cord = useSelector((state) => state.cord);
  const [imageSelected, setImageSelected] = useState(null);
  const [coordinator, setCoordinator] = useState(); 
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let imageUrl = coordinator?.imageUrl;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        reset();

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwkom79iv/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) throw response.error.message;

        imageUrl = response.data.secure_url;
      }

      const eventData = {
        id: coordinator.id,
        email: data.email || coordinator.email,
        username: data.username || coordinator.username,
        phone_number: data.phone_number || coordinator.phone_number,
        imageUrl: imageUrl || "",
        
      };

      await axios.put(coordinatorsURL + `${cord.id}`, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Edit successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/application");
      }, 1000);
      
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        if (error.response.data) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${coordinatorsURL}${cord.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCoordinator(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  return (
    <div className="new-profile">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>EDIT PROFILE</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : coordinator?.imageUrl
              }
              alt=""
            />
          </div>
          <div className="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              id="form"
            >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  id="file"
                  onChange={(e) => setImageSelected(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>USER NAME</label>
                <input
                  type="text"
                  placeholder="ENTER USER NAME"
                  defaultValue={coordinator?.username}
                  {...register("username")}
                />
              </div>
              <div className="formInput">
                <label>EMAIL</label>
                <input
                  type="text"
                  defaultValue={coordinator?.email}
                  placeholder="ENTER EMAIL"
                  {...register("email")}
                />
              </div>
              <div className="formInput">
                <label>PHONE NUMBER</label>
                <input
                  type="text"
                  defaultValue={coordinator?.phone_number}
                  placeholder="ENTER PHONE NUMBER"
                  {...register("phone_number", {})}
                />
              </div>
             
              <button type="submit">SAVE</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;
