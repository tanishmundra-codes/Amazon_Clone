const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "amazon-clone-jwt-secret-change-me";
const COOKIE_NAME = "token";

// Middleware that REQUIRES a valid token – rejects 401 if missing/invalid
function requireAuth(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    const err = new Error("Authentication required");
    err.status = 401;
    throw err;
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    const err = new Error("Invalid or expired token");
    err.status = 401;
    throw err;
  }
}

// Middleware that OPTIONALLY attaches user – never rejects
function optionalAuth(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      // ignore invalid tokens for optional auth
    }
  }
  next();
}

module.exports = { requireAuth, optionalAuth };
