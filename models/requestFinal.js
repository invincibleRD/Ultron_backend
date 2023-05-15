import mongoose from "mongoose";

const requestFinalSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    emailID: {
      type: String,
      required: true,
    },
    requestID: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  });

const RequestFinal = mongoose.model('RequestFinal', requestFinalSchema);

export default  RequestFinal;