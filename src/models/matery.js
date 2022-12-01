import mongoose from "mongoose";

const MaterySchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    absences: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Matery =
  mongoose.models.Matery || mongoose.model("Matery", MaterySchema);
