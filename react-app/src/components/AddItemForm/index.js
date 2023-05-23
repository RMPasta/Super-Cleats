import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemThunk } from "../../store/item";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./AddItemForm.css";
import { getItemsThunk } from "../../store/item";

export default function AddItemForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [type, setType] = useState("cleats");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [teamId, setTeamId] = useState("1");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (!user) history.push("/");
    // fill the store so we can push new item to state
    dispatch(getItemsThunk());
  }, [dispatch, user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    setErrors({});

    if (!name) {
      setErrors((errors) => ({ ...errors, name: "Item name is required" }));
      hasErrors = true;
    }
    if (name.length < 5 || name.length >= 100) {
			setErrors((errors) => ({ ...errors, name: "Item name must be between 4 and 100 characters" }));
			hasErrors = true;
		  }
    if (!type) {
      setErrors((errors) => ({ ...errors, type: "Please choose a type" }));
      hasErrors = true;
    }
    if (!price) {
      setErrors((errors) => ({ ...errors, price: "Please enter a price" }));
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
    if (description.length <= 10 || description.length >= 300) {
      setErrors((errors) => ({ ...errors, description: "Description must be between 10 and 300 characters" }));
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
    await dispatch(addItemThunk(formData));
    await dispatch(getItemsThunk());
    setImageLoading(false);
    closeModal();
    return history.push("/user");
  };

  if (!user) return <div>Go Home</div>;

  return (
    <div className="form-modal-container">
      <form
        className="add-item-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="error-container">
          {errors.name && <p>{errors.name}</p>}
          {errors.type && <p>{errors.type}</p>}
          {errors.price && <p>{errors.price}</p>}
          {errors.description && <p>{errors.description}</p>}
          {errors.itemImg && <p>{errors.itemImg}</p>}
          {errors.teamId && <p>{errors.teamId}</p>}
        </div>
        <div className="add-item-inputs">
          <label>
            Name
            <input
              type="text"
              value={name}
              placeholder="Item Name..."
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Type
            <select
              value={type}
              placeholder="Type of item..."
              onChange={(e) => setType(e.target.value)}
            >
              <option value="cleats">Cleats</option>
              <option value="socks">Socks</option>
              <option value="ball">Ball</option>
            </select>
          </label>
          <label>
            Price
            <input
              type="text"
              value={price}
              placeholder="Price of item..."
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              placeholder="Description of item..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Image
            <input
              className="upload-item-img-input"
              type="file"
              accept="image/*"
              onChange={(e) => setItemImg(e.target.files[0])}
            />
          </label>
          <label>
            Team
            <select
              value={teamId}
              placeholder="Team associated with item..."
              onChange={(e) => setTeamId(e.target.value)}
            >
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
        {imageLoading && <p>Loading...</p>}
        <div>
          <button type="submit" className="submit-button cursor-pointer">CREATE ITEM</button>
        </div>
      </form>
      <button className="cancel-button cursor-pointer" onClick={() => closeModal()}>Cancel</button>
    </div>
  );
}
