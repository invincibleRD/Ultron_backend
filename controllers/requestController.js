import Request from "../models/request.js";

export const generateRequestId = async (req, res) => {

  try {
    if (req.session.requestID) {
      console.log("saved in sessioin req.id",req.session.requestID)
      res.status(200).send({ requestID: req.session.requestID });
    }
    else{
      const imageUrl = null;
      const newRequest = new Request({ imageUrl });
      await newRequest.save();
  
      req.session.requestID = newRequest._id;
      console.log("newreqid",newRequest._id)
      res.status(200).send({ requestID: req.session.requestID });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const checkRequestId = async (req, res) => {
  try {
    const sessionData = req.session;
    res.status(200).json({ requestID: sessionData.requestId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
