const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Respond with 401 if no token is present
    return res.status(401).json({ error: 'Unauthorized. Token missing.' });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Respond with 403 if the token is invalid
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;