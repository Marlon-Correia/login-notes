import connection from "../../../services/db";
import { Aluno } from "../../../models/user";
import jwt from "jsonwebtoken";
import { checkHash, createHash } from "../../../services/password";

connection();

export default async function (req, res) {
  const { method } = req;
  const { userId } = req.query;
  switch (method) {
    case "PATCH":
      try {
        const { email, password, name } = req.body;
        const user = await Aluno.findOne({ email });

        if (user) {
          const checkHashPass = await checkHash(password, user.password);
          if (checkHashPass) {
            await user.updateOne({
              email,
              password: user.password,
              name,
            });
            res.status(200).send("sucess");
          } else {
            res.status(404).json({ error: "email or password incorrect" });
          }
        } else {
          res.status(404).json({ error: "email or password incorrect" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }

      break;
    case "DELETE":
      try {
        const user = await Aluno.findById(userId);
        await user.deleteOne();
        res.status(202).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
