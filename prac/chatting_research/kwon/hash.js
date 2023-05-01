import cryto from "crypto";

const algorithm = "aes-256-cbc";
const key = "my-secret-key";
const iv = "my-iv-parameter";
// 암호화
function encrypt(text) {
  const cipher = cryto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// 복호화
function decrypt(encrypted) {
  const decipher = cryto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const originalText = "Hello, World!";

const encryptedText = encrypt(originalText);
console.log("Encrypted text:", encryptedText);

const decryptedText = decrypt(encryptedText);
console.log("Decrypted text:", decryptedText);
