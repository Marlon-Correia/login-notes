import jwt from "jsonwebtoken";

import connection from "../../../services/db";
import { Aluno } from "../../../models/user";
import { checkHash } from "../../../services/password";

connection();

export default async function (req, res) {
  const { method } = req;
  const { email, password } = req.body;
  switch (method) {
    case "POST":
      try {
        const user = await Aluno.findOne({ email });
        const hashPass = await checkHash(password, user.password);
        if (user && hashPass) {
          const { id, name, email } = user;
          const token = jwt.sign({ id }, process.env.JWT_KEY, {
            expiresIn: "7d",
          });
          res.status(200).json({
            token,
            user: {
              name,
              email,
              id,
            },
          });
        } else {
          res.status(401).json();
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
