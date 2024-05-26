import House from "../models/houseModel.js";
import User from "../models/userModel.js";
import { emailTransporter } from "../utils/helper.js";

const createProperty = async (req, res) => {
  const user = req.user;
  const {
    houseName,
    houseType,
    place,
    area,
    bedrooms,
    bathrooms,
    nearby,
    price,
  } = req.body;
  const { hospitals, schools, mall, pools, gyms, playgrounds } = nearby;
  try {
    const newHouse = await House.create({
      user: user._id,
      sellerName: user.firstName,
      houseName,
      houseType,
      place,
      area,
      bedrooms: +bedrooms,
      bathrooms: +bathrooms,
      price: +price,
      nearby: {
        hospitals,
        schools,
        mall,
        pools,
        gyms,
        playgrounds,
      },
    });
    await newHouse.save();
    res.status(201).json({ message: "Posted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await House.find();
    res.status(201).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserProperty = async (req, res) => {
  const user = req.user;
  try {
    const properties = await House.find({ user: user._id });
    res.status(201).json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const putUserProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearby } = req.body;
  const propertyFields = { place, area, bedrooms, bathrooms, nearby };
  try {
    let property = await House.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property = await House.findByIdAndUpdate(
      req.params.id,
      { $set: propertyFields },
      { new: true }
    );

    res.status(201).json({ message: "Post updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteUserProperty = async (req, res) => {
  const _id = req.params.id;
  try {
    await House.findByIdAndDelete(_id);
    res.status(201).json({ message: "Property removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchProperty = async (req, res) => {
  const _id = req.params.id;
  const like = +req.body.like;

  try {
    const property = await House.findById(_id);
    if (!property) {
      return res.status(404).json({ message: "Invalid property" });
    }
    if (isNaN(like)) {
      return res.status(400).json({ message: "Invalid 'like' value" });
    }

    property.like += like;
    await property.save();

    res.status(200).json({ message: "Property Updated", property });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const sendEmail = async (req, res) => {
  const id = req.params.id;
  const { email, firstName, lastName, phone } = req.user;

  try {
    const property = await House.findById(id);
    const user = await User.findById(property.user);

    if (!user || !property) {
      return res.status(404).json({ message: "User or property not found" });
    }

    let transport = emailTransporter();

    // Send email to the property owner
    transport.sendMail({
      from: "Rentify",
      to: user.email,
      subject: "Buyer's Details",
      html: `<p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Name: ${firstName} ${lastName}</p>`,
    });

    // Send email to the buyer
    transport.sendMail({
      from: "Rentify",
      to: email,
      subject: "Seller's Details",
      html: `<p>Email: ${user.email}</p>
             <p>Phone: ${user.phone}</p>
             <p>Name: ${user.firstName} ${user.lastName}</p>`,
    });

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createProperty,
  getProperties,
  getUserProperty,
  deleteUserProperty,
  putUserProperty,
  patchProperty,
  sendEmail,
};
