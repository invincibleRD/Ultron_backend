import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('Request', requestSchema);

export default  Request;