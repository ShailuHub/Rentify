import mongoose from "mongoose";
import { Schema } from "mongoose";

const HouseSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sellerName: { type: String, required: true },
  houseName: { type: String, required: true },
  houseType: { type: String, required: true },
  place: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  like: { type: Number, default: 0 },
  nearby: {
    hospitals: { type: Boolean, default: false },
    mall: { type: Boolean, default: false },
    schools: { type: Boolean, default: false },
    playgrounds: { type: Boolean, default: false },
    gyms: { type: Boolean, default: false },
    pools: { type: Boolean, default: false },
  },
});

const House = mongoose.models.House || mongoose.model("House", HouseSchema);

export default House;
