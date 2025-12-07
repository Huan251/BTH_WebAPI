# AI Coding Agent Instructions - LaptrinhwebAPI

## Architecture Overview

This is an **Express.js REST API** built with a layered architecture using modern Node.js (ES modules). The data layer is transitional—currently using mock data (`model/user.js`), but designed to support both MongoDB and MySQL via service connectors.


### Core Layers
- **Routes** (`routes/api.js`): Express Router defining API endpoints
- **Controllers** (`controllers/*.js`): Request handlers that parse input and call services
- **Services** (`services/`): Database connection providers (mongo.js, mysql.js) - currently unused in active code
- **Repositories** (`repositories/`): Data access layer placeholders (mongo implementation exists but unused)
- **Model** (`model/user.js`): Mock data store with hardcoded user array
- **Middlewares** (`middlewares/index.js`): Global error handling, response timing, JSON validation
- **Helpers** (`helpers/response.js`): Standard response formatters


### Current State
The app is in **development/learning phase**: Controllers directly use mock data from `model/user.js` instead of calling repository/service layer. Future refactoring should wire controllers to actual database repositories.

## Key Patterns & Conventions

### Response Format
All responses must follow the helper-defined structure:
```javascript
// Success (from helpers/response.js)
{ status: 200, message: "...", data: {...} }

// Error
{ status: 400, message: "...", validation: {}, data: {} }
```
Import `successResponse` and `errorResponse` from `helpers/response.js` when sending responses.

### Controller Pattern
Controllers receive `(req, res)` and directly manipulate the response. See `controllers/userController.js`:
- Parse params from `req.params` (lowercase for case-insensitive matching)
- Return `.json()` with status code
- Return 404 when resource not found, 200 on success

### Middleware Error Handling
Global error wrapper in `middlewares/index.js` catches unhandled errors. Avoid throwing errors in controllers—use `res.status().json()` instead. Custom middlewares available:
- `middlewareErrorWrapper`: Global try-catch wrapper
- `shouldJSON`: Validates Content-Type header
- `responseTime`: Adds X-Response-Time header (tracks latency)

### Database Abstraction (Incomplete)
- MongoDB service exists (`services/mongo.js`) and user repository pattern (`repositories/user.js`) with JSDoc type hints
- MySQL service exists (`services/mysql.js`) with promise-based connection
- Neither is currently connected in `index.js` or controllers—would need to initialize in `repositories/index.js` and inject into app context

## Development Workflow

### Getting Started
```bash
npm install
cp .env.example .env          # Configure environment variables
npm start                     # Runs nodemon (auto-restart on file changes)
```

### Code Quality
- Linting uses **StandardJS** format (configured in package.json)
- Run before committing:
  ```bash
  npm run lint       # Check code style
  npm run lintfix    # Auto-fix style issues
  ```

### Git Flow
- Feature branches: `feature/*` → create PR to `dev` branch
- Hotfixes: `hotfix/*` → PR to `master` AND `dev`
- Deployment: `master` (production), `staging`, `dev` (pre-production)
- **Important**: Never PR from dev/staging directly to production; always from feature branch

## Dependencies to Know

### Core
- **express** (v5.1.0): Router and middleware framework
- **nodemon**: Auto-restart on file changes (dev only)
- **jsonwebtoken**: JWT auth (available but unused in current routes)
- **bcrypt**: Password hashing (available but unused)

### Middleware/Security
- **helmet**: Sets security headers
- **cors**: Cross-origin requests (currently allows all origins with `*`)
- **compression**: Gzip response compression
- **morgan**: HTTP request logging (dev format in development, combined in production)
- **express-validator**: Validation helpers (available but unused)

### Database (Unused but Configured)
- **sequelize** + **sequelize-cli**: ORM for relational databases
- **redis**: Caching client (configured but not initialized)

### Monitoring
- **@sentry/node**: Error tracking (optional, enabled if `SENTRY_DSN` env var present)

## Environment Variables

Key variables (see `.env.example`):
- `NODE_ENV`: `dev`, `development`, or production (controls morgan log format)
- `SENTRY_DSN`: Optional error tracking service URL
- `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017/dbname`)
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_DBNAME`: MySQL config

## Common Tasks

### Adding a New Endpoint
1. Create/update controller in `controllers/userController.js` with response format
2. Add route in `routes/api.js` with import
3. Test manually or via API tools (Postman, curl)

### Connecting Database (Future Work)
1. Initialize service in `repositories/index.js` (call `mongo.js` or `mysql.js`)
2. Attach to `app.locals.db` so controllers can access
3. Refactor controllers to call repository methods instead of using mock data
4. Example pattern exists in `repositories/user.js` (MongoDB with findOne)

### Adding Validation
1. Use `express-validator` middleware before controller
2. Example: `body('email').isEmail()` in route definition
3. Pass validation results to controller and format error response

## Files to Reference

- **Startup**: `index.js` (middleware setup, route registration)
- **Routes**: `routes/api.js` (endpoint definitions)
- **Controllers**: `controllers/userController.js` (request handlers)
- **Responses**: `helpers/response.js` (standard format)
- **Error Handling**: `middlewares/index.js` (global wrapper)
- **Config**: `package.json` (scripts, dependencies)

## Notes for Agents

- **Test mode**: Run `npm start` and use curl/Postman to test API at `http://localhost:3000/api`
- **Mock data limitation**: Current implementation doesn't persist data; all changes are in-memory only
- **ES modules**: This project uses `"type": "module"` in package.json—use `import`/`export` syntax, not `require()`
- **Old code**: Some files contain commented-out Koa.js patterns (legacy)—ignore those; focus on active Express code
