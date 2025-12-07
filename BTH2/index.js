import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import * as Sentry from "@sentry/node";

import * as Middlewares from "./middlewares/index.js";
import apiRoutes from "./routes/api.js";
import webRoutes from "./routes/web.js";
import repositories from "./repositories/index.js";

dotenv.config();

const app = express();

// --- Sentry setup (optional)
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
  app.use(Sentry.Handlers.requestHandler());
}

// --- Middlewares
if (["dev", "development"].includes(process.env.NODE_ENV)) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(helmet());
app.use(
  cors({ origin: "*", allowedHeaders: ["Content-Type", "Authorization"] })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

// Custom middlewares
app.use(Middlewares.middlewareErrorWrapper);
app.use(Middlewares.responseTime);

// Inject repositories
await repositories(app);

// --- Routes
app.use("/api", apiRoutes);
app.use("/", webRoutes);

// 404 handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message || "Something went wrong",
  });
});

if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// --- Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
