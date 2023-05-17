import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemThunk } from '../../store/item';
import { useHistory } from "react-router-dom";
import './AddItemForm.css'

export default function AddItemForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [itemImg, setItemImg] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [teamId, setTeamId] = useState("1");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        const formData = new FormData();

        if (name) formData.append("name", name);
        if (type) formData.append("type", type);
        if (price) formData.append("price", Number(price));
        if (description) formData.append("description", description);
        if (itemImg) formData.append("item_img", itemImg);
        if (location) formData.append("location", location);
        if (teamId) formData.append("team_id", Number(teamId));

        setImageLoading(true);
        await dispatch(addItemThunk(formData))
        setImageLoading(false)
        history.push("/user")
    }

    return(
        <form
        className="add-item-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
                <div className="add-item-inputs">
                    <input
                        type="text"
                        value={name}
                        placeholder="Item Name..."
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={type}
                        placeholder="Type of item..."
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={price}
                        placeholder="Price of item..."
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={description}
                        placeholder="Description of item..."
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        className="upload-item-img-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setItemImg(e.target.files[0])}
                    />
                    <input
                        type="text"
                        value={location}
                        placeholder="Location of item..."
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <input
                        type="text"
                        value={teamId}
                        placeholder="Team Id of item..."
                        onChange={(e) => setTeamId(e.target.value)}
                        required
                    />
                </div>
            {(imageLoading)&& <p>Loading...</p>}
            <div>
                <button type="submit">CREATE ITEM</button>
            </div>
        </form>
    )
}
