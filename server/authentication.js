const jwt = require("jsonwebtoken");

module.exports = async (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) throw new Error("Header is not existed");

  // Bearer ...
  const token = authHeader.split("Bearer ")[1];

  if (!token) throw new Error("Token is not existed");

  try {
    // decoded ra user
    const user = await jwt.verify(token, process.env.SECRET_KEY);

    return user;
  } catch (err) {
    throw new Error("Invalid/Expired token");
  }
};
