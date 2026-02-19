import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-here'; // In production, use environment variable

// Encrypt vote data
export const encryptVote = (voteData) => {
  const jsonString = JSON.stringify(voteData);
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

// Decrypt vote data (for admin viewing results)
export const decryptVote = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

// Hash voter ID for anonymity
export const hashVoterId = (voterId) => {
  return CryptoJS.SHA256(voterId + SECRET_KEY).toString();
};