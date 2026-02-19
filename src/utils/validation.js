// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};

// Voter ID validation
export const isValidVoterId = (voterId) => {
  // Example: VOTER-XXXX-XXXX format
  const voterIdRegex = /^VOTER-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return voterIdRegex.test(voterId);
};

// Date validation
export const isValidDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  return start < end && start >= now;
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove HTML tags and trim
  return input.replace(/<[^>]*>/g, '').trim();
};

// Vote validation
export const isValidVote = (vote) => {
  return vote && 
         vote.electionId && 
         vote.candidateId && 
         vote.voterId;
};