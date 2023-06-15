import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemThunk } from "../../store/item";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getFavoritesThunk, addFavoriteThunk } from "../../store/favorite";
import "./AddFavoriteForm.css";

export default function AddFavoriteForm({type, name, teams, img}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [typeState, setTypeState] = useState(type || "");
  const [nameState, setNameState] = useState(name || "");
  const [imgState, setImgState] = useState(img || "");
  const [story, setStory] = useState("");
  const [teamsState, setTeamsState] = useState(teams || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (!user) history.push("/");
    // fill the store so we can push new item to state
    dispatch(getFavoritesThunk());
  }, [dispatch, user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    setErrors({});

    if (!story) {
      setErrors((errors) => ({ ...errors, price: "Please submit a story" }));
      hasErrors = true;
    }
    if (story.length <= 10 || story.length >= 900) {
      setErrors((errors) => ({ ...errors, story: "Story must be between 10 and 900 characters" }));
      hasErrors = true;
    }
    if (hasErrors) return;

    const formData = new FormData();

    if (nameState) formData.append("name", name);
    if (typeState) formData.append("type", type);
    if (story) formData.append("story", story);
    if (teamsState) formData.append("teams", teamsState);

    await dispatch(addFavoriteThunk(formData));
    await dispatch(getFavoritesThunk());
    closeModal();
  };

  if (!user) return <div>Go Home</div>;

  return (
    <div className="form-modal-container">
      <form
        className="add-item-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="add-favorites-inputs">
        <img src={img} alt={nameState} className="card-img" />
        <div>{nameState}</div>
        <div>{typeState}</div>
          {/* <label>
            Name
            <input
              type="text"
              value={nameState}
              placeholder="Favorite Name..."
              onChange={(e) => setNameState(e.target.value)}
              disabled={true}
            />
          </label>
          <label>
            Type
            <input
              type="text"
              value={typeState}
              placeholder="Favorite Name..."
              onChange={(e) => setTypeState(e.target.value)}
              disabled={true}
            />
          </label> */}
          <label>
            <div className="error-container-story">
            {errors.story && <p>{errors.story}</p>}
            </div>
            Story
            <textarea
              className="textarea"
              type="text"
              value={story}
              placeholder="How was your experience with this product?"
              onChange={(e) => setStory(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="submit-button cursor-pointer">Add Favorite</button>
        </div>
      </form>
      <button className="cancel-button cursor-pointer" onClick={() => closeModal()}>Cancel</button>
    </div>
  );
}
