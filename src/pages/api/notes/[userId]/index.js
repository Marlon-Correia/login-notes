import connection from "../../../../services/db";
import { Aluno } from "../../../../models/user";
import { Matery } from "../../../../models/matery";

connection();

export default async function (req, res) {
  const { method } = req;
  const { userId } = req.query;

  switch (method) {
    case "GET":
      try {
        const materies = await Matery.find({ userId });
        res.status(200).json({ materies });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "erro" });
      }

      break;
    case "POST":
      const { name, note } = req.body;
      const newMatery = new Matery({ name, note, absences: 0, userId });
      try {
        const saveMatery = await newMatery.save();

        try {
          await Aluno.findByIdAndUpdate(userId, {
            $push: { materias: saveMatery._id },
          });

          res.status(201).json(saveMatery);
        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, error: "error" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "erro" });
      }

      break;
  }
}
