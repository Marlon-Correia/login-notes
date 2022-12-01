import { connect } from "mongoose";
const connection = () => {
  try {
    connect(
      `mongodb+srv://marlocorreia:marloncorreia@cluster0.zdigy70.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("conectado ao mongodb");
  } catch (error) {
    throw error;
  }
};
export default connection;
