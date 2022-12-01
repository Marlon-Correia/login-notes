import mongoose from "mongoose";

const AlunoSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    materias: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Aluno =
  mongoose.models.Aluno || mongoose.model("Aluno", AlunoSchema);
