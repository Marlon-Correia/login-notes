import jwt from "jsonwebtoken";

import connection from "../../../services/db";
import { Aluno } from "../../../models/user";

connection();

export default async function (req, res) {
  const { method } = req;
  const { token } = req.query;
  switch (method) {
    case "GET":
      try {
        let tokenId;
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
          if (err)
            return res
              .status(500)
              .json({ auth: false, message: "Failed to authenticate token." });
          tokenId = decoded.id;
        });
        const { email, name, id } = await Aluno.findById(tokenId);
        res.status(200).json({ success: true, user: { email, name, id } });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
