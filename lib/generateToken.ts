import crypto from "crypto";

export default function generateToken(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomByte = crypto.randomBytes(1)[0];
    token += characters[randomByte % charactersLength];
  }
  return token;
}
