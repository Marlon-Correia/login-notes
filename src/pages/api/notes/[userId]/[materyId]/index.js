import connection from "../../../../../services/db";
import { Matery } from "../../../../../models/matery";

connection();

export default async function (req, res) {
  const { method } = req;
  const { userId } = req.query;

  switch (method) {
    case "GET":
      const { materyId } = req.query;
      const matery = await Matery.findById(materyId);
      if (matery) {
        res.status(200).json({ matery });
      } else {
        res.status(404).json({ success: false, error: "matery not found" });
      }
      break;

    case "PATCH":
      const { name, note, absences } = req.body;
      try {
        const { materyId } = req.query;
        const matery = await Matery.findById(materyId);

        if (matery) {
          const update = await matery.updateOne({
            name,
            note,
            absences,
            userId,
          });
          res.status(200).json({ matery: update });
        } else {
          res.status(500).json({ success: false, error });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;

    case "DELETE":
      try {
        const { materyId } = req.query;
        const matery = await Matery.findById(materyId);
        if (matery) {
          await matery.deleteOne();
          res.status(202).json({ success: true });
        } else {
          res.status(404).json({ error: "matery not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error });
      }
      break;
  }
}
