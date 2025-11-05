export const verifyConfig = {
  secret: process.env.VERIFY_TOKEN_SECRET || process.env.JWT_SECRET,
  expiry: process.env.VERIFY_TOKEN_EXPIRES_IN || '30d',
};

export const resetConfig = {
  secret: process.env.RESET_TOKEN_SECRET || process.env.JWT_SECRET,
  expiry: process.env.RESET_TOKEN_EXPIRES_IN || '15m',
};

export const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI, 
};


