import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItemThunk } from '../../store/item';
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getItemsThunk } from "../../store/item";
import './EditItemForm.css'

export default function EditItemForm({item, setSlidePosition, index}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState(item.name);
    const [type, setType] = useState(item.type);
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [itemImg, setItemImg] = useState(item.item_img);
    const [imageLoading, setImageLoading] = useState(false);
    const [teamId, setTeamId] = useState(item.team_id);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    if (!user) history.push("/");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        setErrors({})

        if (!name) {
        setErrors(errors => ({...errors, name: "Item name is required"}));
        hasErrors = true;
        }
        if (!type) {
        setErrors(errors => ({...errors, type: "Please choose a type"}))
        hasErrors = true;
        }
        if (!price) {
        setErrors(errors => ({...errors, price: "Please enter a price"}));
        hasErrors = true;
        }
        if (!description) {
        setErrors(errors => ({...errors, description: "Please enter a description"}))
        hasErrors = true;
        }
        if (!teamId) {
        setErrors(errors => ({...errors, teamId: "Please choose an associated team"}))
        hasErrors = true;
        }
        if (isNaN(price) || price < 1 || price > 10000) {
            setErrors((errors) => ({
              ...errors,
              price: "Please enter a valid price",
            }));
            hasErrors = true;
          }
          if (!description) {
            setErrors((errors) => ({
              ...errors,
              description: "Please enter a description",
            }));
            hasErrors = true;
          }
          if (description.length <= 10 || description.length >= 900) {
            setErrors((errors) => ({ ...errors, description: "must be between 10 and 900 characters" }));
            hasErrors = true;
            }
          if (!itemImg) {
            setErrors((errors) => ({ ...errors, itemImg: "Please upload an image" }));
            hasErrors = true;
          }
          if (!teamId) {
            setErrors((errors) => ({
              ...errors,
              teamId: "Please choose an associated team",
            }));
            hasErrors = true;
          }
        if (hasErrors) return;

        const formData = new FormData();

        if (name) formData.append("name", name);
        if (type) formData.append("type", type);
        if (price) formData.append("price", Number(price));
        if (description) formData.append("description", description);
        if (itemImg) formData.append("item_img", itemImg);
        if (teamId) formData.append("team_id", Number(teamId));

        setImageLoading(true);
        await dispatch(editItemThunk(formData, item.id));
        await dispatch(getItemsThunk());
        setImageLoading(false);
        closeModal();
        setSlidePosition(index);
        return history.push("/user");
    }

    return(
        <div className="edit-item-container">
            <img className="edit-img-tag" src={item.item_img} alt={item.name} />
            <form
            className="edit-item-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
                    <div className="edit-item-inputs">
                        <label>
                        <div className="label-error">
                            Name
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                            <input
                                type="text"
                                value={name}
                                placeholder="Item Name..."
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            <div className="label-error">
                                Type
                                {errors.type && <p className="error-text">{errors.type}</p>}
                            </div>
                            <select
                                value={type}
                                placeholder="Type of item..."
                                onChange={(e) => setType(e.target.value)}>
                                    <option value="cleats">Cleats</option>
                                    <option value="socks">Socks</option>
                                    <option value="ball">Ball</option>
                            </select>
                        </label>
                        <label>
                        <div className="label-error">
                                Price
                                {errors.price && <p className="error-text">{errors.price}</p>}
                            </div>
                            <input
                                type="text"
                                value={price}
                                placeholder="Price of item..."
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <label>
                        <div className="label-error">
                                Description
                                {errors.description && <p className="error-text">{errors.description}</p>}
                            </div>
                            <input
                                type="text"
                                value={description}
                                placeholder="Description of item..."
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                        <div className="label-error">
                                Image
                                {errors.itemImg && <p className="error-text">{errors.itemImg}</p>}
                            </div>
                            <input
                                className="upload-item-img-input cursor-pointer"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setItemImg(e.target.files[0])}
                            />
                        </label>
                        <label>
                        <div className="label-error">
                                Team
                                {errors.teamId && <p className="error-text">{errors.teamId}</p>}
                            </div>
                            <select
                                value={teamId}
                                placeholder="Team associated with item..."
                                onChange={(e) => setTeamId(e.target.value)}>
                                    <option value="1">Fulham</option>
                                    <option value="2">Brentford</option>
                                    <option value="3">Brighton</option>
                                    <option value="4">Manchester City</option>
                                    <option value="5">Manchester United</option>
                                    <option value="6">Wolverhampton</option>
                                    <option value="7">Liverpool</option>
                                    <option value="8">Crystal Palace</option>
                                    <option value="9">Chelsea</option>
                                    <option value="10">Newcastle United</option>
                                    <option value="11">Leicester</option>
                                    <option value="12">Everton</option>
                                    <option value="13">Arsenal</option>
                                    <option value="14">Aston Villa</option>
                                    <option value="15">Leeds United</option>
                                    <option value="16">West Ham</option>
                                    <option value="17">Tottenham Hotspur</option>
                                    <option value="18">Bournemouth</option>
                            </select>
                        </label>
                    </div>
                <div>
                    <button className="submit-button cursor-pointer" type="submit">EDIT</button>
                </div>
                <button className="cancel-button cursor-pointer" onClick={() => closeModal()}>Cancel</button>
                <div className="text-cushion">{(imageLoading)&& <p>Submitting...</p>}</div>
            </form>
        </div>
    )
}
