// Central error-handling middleware
// Express 5 automatically catches async errors thrown in route handlers,
// so we only need this final handler to format them consistently.
function errorHandler(err, _req, res, _next) {
  console.error("❌", err.stack || err.message || err);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
