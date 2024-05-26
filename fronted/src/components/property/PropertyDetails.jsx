import { useLocation } from "react-router-dom";
import "./propertyDetails.css";
const PropertyDetails = () => {
  const location = useLocation();
  const { property } = location.state || {};
  const { houseName, houseType, sellerName, place, area, price } = property;
  return (
    <div id="property-details-main-container">
      <div id="property-details-container">
        <div id="property-details-img">
          <img
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="house"
          />
        </div>
        <div id="property-description-container">
          <div id="property-description">
            <h3>{houseName}</h3>
            <p>by {sellerName}</p>
            <p>{houseType}</p>
            <p>Rs {price}L</p>
            <p>
              {place} , {area}
            </p>
          </div>
          <div id="seller-details">
            <p>{sellerName}</p>
            <p>
              Sellers details will be sent to your respective email. If you
              click on interested
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
