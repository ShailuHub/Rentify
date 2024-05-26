import { useRef } from "react";
import "./propertyForm.css";
import Button from "../button/Button";
import { baseURL } from "../../utils/constant";
import { useSelector } from "react-redux";

const PropertyForm = () => {
  const userToken = useSelector((store) => store.user.token);

  const placeRef = useRef();
  const areaRef = useRef();
  const bedroomsRef = useRef();
  const bathroomsRef = useRef();
  const priceRef = useRef();
  const hospitalRef = useRef();
  const schoolRef = useRef();
  const mallRef = useRef();
  const poolRef = useRef();
  const gymRef = useRef();
  const playgroundRef = useRef();
  const houseNameRef = useRef();
  const houseTypeRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const jsonData = {
      houseName: houseNameRef.current.value,
      houseType: houseTypeRef.current.value,
      place: placeRef.current.value,
      area: areaRef.current.value,
      bedrooms: bedroomsRef.current.value,
      bathrooms: bathroomsRef.current.value,
      price: priceRef.current.value,
      nearby: {
        hospitals: hospitalRef.current.checked,
        schools: schoolRef.current.checked,
        mall: mallRef.current.checked,
        pool: poolRef.current.checked,
        gyms: gymRef.current.checked,
        playgrounds: playgroundRef.current.checked,
      },
    };

    try {
      const response = await fetch(`${baseURL}/api/properties/seller/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Handle successful submission (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <div className="property-form-container form-container">
      <form id="propertyForm" onSubmit={handleOnSubmit}>
        <h2>Property Details</h2>
        <input type="text" placeholder="House Name" ref={houseNameRef} />
        <input
          type="text"
          placeholder="House Type (2 Bhk Apartment)"
          ref={houseTypeRef}
        />
        <input type="text" placeholder="Place" ref={placeRef} />
        <input type="text" placeholder="Area" ref={areaRef} />
        <input type="text" placeholder="Bedrooms" ref={bedroomsRef} />
        <input type="text" placeholder="Bathrooms" ref={bathroomsRef} />
        <input type="Number" placeholder="Price in lakhs" ref={priceRef} />
        <p id="nearby-heading">NearBy</p>
        <div id="nearby">
          <div>
            <input type="checkbox" id="hospital" ref={hospitalRef} />
            <label htmlFor="hospital">Hospital</label>
          </div>
          <div>
            <input type="checkbox" id="school" ref={schoolRef} />
            <label htmlFor="school">School</label>
          </div>
          <div>
            <input type="checkbox" id="mall" ref={mallRef} />
            <label htmlFor="mall">Mall</label>
          </div>
          <div>
            <input type="checkbox" id="pool" ref={poolRef} />
            <label htmlFor="pool">Pool</label>
          </div>
          <div>
            <input type="checkbox" id="gym" ref={gymRef} />
            <label htmlFor="gym">Gym</label>
          </div>
          <div>
            <input type="checkbox" id="playground" ref={playgroundRef} />
            <label htmlFor="playground">Playground</label>
          </div>
        </div>
        <Button value={"Submit"} onClick={handleOnSubmit} />
      </form>
    </div>
  );
};

export default PropertyForm;
