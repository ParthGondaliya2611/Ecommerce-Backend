import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  streetAddress: { type: String, required: true },
  country: { type: String ,required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postcode: { type: String, required: true },
});

const Address = mongoose.model("Address", AddressSchema);

export default Address;