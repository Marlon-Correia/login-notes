import bcrypt from "bcryptjs";

export const createHash = (password) => bcrypt.hash(password, 8);

export const checkHash = async (password, user) =>
  await bcrypt.compareSync(password, user);
