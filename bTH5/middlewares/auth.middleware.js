import jwt from "jsonwebtoken";

const SECRET_KEY = "JWT_SECRET_KEY";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded;
    next();
  });
}
