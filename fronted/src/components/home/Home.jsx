import { useEffect } from "react";
import Card from "../card/Card";
import { baseURL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { addProperty } from "../../store/propertySlice";
import Notification from "../notification/Notification";

const Home = () => {
  const userToken = useSelector((store) => store.user.token);
  const properties = useSelector((store) => store.properties.properties);
  const message = useSelector((store) => store.properties.message);
  const showNotification = useSelector(
    (store) => store.properties.showNotification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${baseURL}/api/properties/home`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      dispatch(addProperty(jsonData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {showNotification && <Notification message={message} />}
      {properties.map((property) => (
        <Card key={property._id} property={property} isPost={false} />
      ))}
    </main>
  );
};

export default Home;
