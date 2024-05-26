import Button from "../button/Button";
import { useEffect } from "react";
import Card from "../card/Card";
import { baseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addsellerProperties } from "../../store/propertySlice";
const PropertyPost = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((store) => store.user.token);
  const sellerProperties = useSelector(
    (store) => store.properties.sellerProperties
  );
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${baseURL}/api/properties/seller/home`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      dispatch(addsellerProperties(jsonData));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      {sellerProperties.map((property) => (
        <Card key={property._id} property={property} isPost={true} />
      ))}
    </main>
  );
};

export default PropertyPost;
