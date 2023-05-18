// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addItemThunk } from '../../store/item';
// import { useHistory } from "react-router-dom";
// import './AddItemForm.css'
// import { getItemsThunk } from "../../store/item";

// export default function EditItemForm(item) {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const user = useSelector(state => state.session.user);
//     console.log(item)
//     const [name, setName] = useState(item.name);
//     const [type, setType] = useState(item.type);
//     const [price, setPrice] = useState(item.price);
//     const [description, setDescription] = useState(item.description);
//     const [itemImg, setItemImg] = useState(item.item_img);
//     const [imageLoading, setImageLoading] = useState(false);
//     const [location, setLocation] = useState(item.location || "");
//     const [teamId, setTeamId] = useState(item.team_id);
//     const [errors, setErrors] = useState({});

//     if (!user) history.push("/");

//     useEffect(() => {
//         // fill the store so we can push new item to state
//         dispatch(getItemsThunk())
//     }, [dispatch]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let hasErrors = false;
//         setErrors({})

//         if (!name) {
//         setErrors(errors => ({...errors, name: "Item name is required"}));
//         hasErrors = true;
//         }
//         if (!type) {
//         setErrors(errors => ({...errors, type: "Please choose a type"}))
//         hasErrors = true;
//         }
//         if (!price) {
//         setErrors(errors => ({...errors, price: "Please enter a price"}));
//         hasErrors = true;
//         }
//         if (!description) {
//         setErrors(errors => ({...errors, description: "Please enter a description"}))
//         hasErrors = true;
//         }
//         if (!itemImg) {
//         setErrors(errors => ({...errors, itemImg: "Please upload an image for your item"}));
//         hasErrors = true;
//         }
//         if (!teamId) {
//         setErrors(errors => ({...errors, teamId: "Please choose an associated team"}))
//         hasErrors = true;
//         }
//         if (hasErrors) return;

//         const formData = new FormData();

//         if (name) formData.append("name", name);
//         if (type) formData.append("type", type);
//         if (price) formData.append("price", Number(price));
//         if (description) formData.append("description", description);
//         if (itemImg) formData.append("item_img", itemImg);
//         if (location) formData.append("location", location);
//         if (teamId) formData.append("team_id", Number(teamId));

//         setImageLoading(true);
//         await dispatch(addItemThunk(formData))
//         await dispatch(getItemsThunk())
//         setImageLoading(false)
//         return history.push("/user")
//     }

//     return(
//         <form
//         className="add-item-form"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data">
//                  <div className="error-container">
//                     {errors.name && <p>{errors.name}</p>}
//                     {errors.type && <p>{errors.type}</p>}
//                     {errors.price && <p>{errors.price}</p>}
//                     {errors.description && <p>{errors.description}</p>}
//                     {errors.itemImg && <p>{errors.itemImg}</p>}
//                     {errors.teamId && <p>{errors.teamId}</p>}
//                 </div>
//                 <div className="add-item-inputs">
//                     <input
//                         type="text"
//                         value={name}
//                         placeholder="Item Name..."
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <select
//                         value={type}
//                         placeholder="Type of item..."
//                         onChange={(e) => setType(e.target.value)}>
//                             <option value="cleats">Cleats</option>
//                             <option value="socks">Socks</option>
//                             <option value="ball">Ball</option>
//                     </select>
//                     <input
//                         type="text"
//                         value={price}
//                         placeholder="Price of item..."
//                         onChange={(e) => setPrice(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         value={description}
//                         placeholder="Description of item..."
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     <input
//                         className="upload-item-img-input"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setItemImg(e.target.files[0])}
//                     />
//                     <input
//                         type="text"
//                         value={location}
//                         placeholder="Location of item..."
//                         onChange={(e) => setLocation(e.target.value)}
//                     />
//                     <select
//                         value={teamId}
//                         placeholder="Team associated with item..."
//                         onChange={(e) => setTeamId(e.target.value)}>
//                             <option value="1">Fulham</option>
//                             <option value="2">Brentford</option>
//                             <option value="3">Brighton</option>
//                             <option value="4">Manchester City</option>
//                             <option value="5">Manchester United</option>
//                             <option value="6">Wolverhampton</option>
//                             <option value="7">Liverpool</option>
//                             <option value="8">Crystal Palace</option>
//                             <option value="9">Chelsea</option>
//                             <option value="10">Newcastle United</option>
//                             <option value="11">Leicester</option>
//                             <option value="12">Everton</option>
//                             <option value="13">Arsenal</option>
//                             <option value="14">Aston Villa</option>
//                             <option value="15">Leeds United</option>
//                             <option value="16">West Ham</option>
//                             <option value="17">Tottenham Hotspur</option>
//                             <option value="18">Bournemouth</option>
//                     </select>
//                 </div>
//             {(imageLoading)&& <p>Loading...</p>}
//             <div>
//                 <button type="submit">CREATE ITEM</button>
//             </div>
//         </form>
//     )
// }
