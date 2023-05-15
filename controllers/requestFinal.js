import RequestFinal from "../models/requestFinal.js";

export const requestHandler = async (req, res) => {
  const imageUrl = req.file.path;
  const username = req.body.username;
  const emailID = req.body.emailID;
  const requestID = req.body.requestID;
  // console.log(imageUrl);
  try {
    const newFinalRequest = new RequestFinal({
      username,
      emailID,
      requestID,
      imageUrl,
    });
    await newFinalRequest.save();

    console.log("newfinalreqid", newFinalRequest._id);
    res.status(200).send({ requestID: newFinalRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
