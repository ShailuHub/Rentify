import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../utils/constant";
import Button from "../button/Button";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  incrementLike,
  setMessage,
  setshowNotification,
} from "../../store/propertySlice";

const Card = ({ property, isPost }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const properties = useSelector((store) => store.properties.properties);
  const userToken = useSelector((store) => store.user.token);
  const { houseName, price, houseType, like, sellerName, _id, liked } =
    property;
  const handleOnInterested = async (propertyId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/properties/user/interested/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const result = await response.json();
      dispatch(setMessage(result.message));
      dispatch(setshowNotification(true));
      setTimeout(() => {
        dispatch(setshowNotification(false));
        dispatch(setMessage(""));
      }, 3000);
    } catch (error) {
      console.error("Error in sending Mail:", error);
    }
  };

  const handleOnDelete = async (propertyId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/properties/seller/home/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await response.json();
      dispatch(setMessage(result.message));
      dispatch(setshowNotification(true));
      setTimeout(() => {
        dispatch(setshowNotification(false));
        dispatch(setMessage(""));
      }, 3000);
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  };

  const handleOnDetails = (propertyId) => {
    const data = properties.find((property) => property._id === propertyId);
    navigate("/property-details", { state: { property: data } });
  };

  const handleOnLike = async (propertyId, likeIncrement) => {
    dispatch(incrementLike(propertyId));
    try {
      const response = await fetch(
        `${baseURL}/api/properties/home/update/${propertyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ like: likeIncrement }),
        }
      );

      const result = await response.json();
      dispatch(setMessage(result.message));
      dispatch(setshowNotification(true));
      setTimeout(() => {
        dispatch(setshowNotification(false));
        dispatch(setMessage(""));
      }, 3000);

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  return (
    <div id="card-container">
      <div id="card-img">
        <img
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="house"
        />
      </div>
      <div id="card-description-container">
        <div id="description-left">
          <h3>{houseName}</h3>
          <p>by {sellerName}</p>
          <p>{houseType}</p>
        </div>
        <div id="description-left">
          <p>Rs {price}L</p>
          {!isPost && (
            <p id="like">
              <button
                onClick={() => handleOnLike(_id, 1)}
                disabled={liked ? true : false}
              >
                Like
              </button>{" "}
              {like}
            </p>
          )}
        </div>
        <div id="description-buttons">
          <Button value={"More Details"} onClick={() => handleOnDetails(_id)} />
          <Button
            value={`${isPost ? "Delete" : "I'm interested"}`}
            onClick={
              isPost ? () => handleOnDelete(_id) : () => handleOnInterested(_id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
