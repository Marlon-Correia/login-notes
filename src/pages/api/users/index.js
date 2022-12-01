import connection from "../../../services/db";
import { Aluno } from "../../../models/user";
import { createHash } from "../../../services/password";

connection();

export default async function (req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await Aluno.find();
        if (users.length > 0) {
          res.status(200).json({ success: true, data: users });
        } else {
          res.status(401).json({ error: "users not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        const { email, password, name } = req.body;
        if ((email, password, name)) {
          const passHash = await createHash(password);
          const newUser = await Aluno.create({
            materias: [],
            email,
            password: passHash,
            name,
          });
          res.status(201).json({ success: true, data: newUser });
        } else {
          res.status(400).json({ success: false, error: "inf não validas" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
