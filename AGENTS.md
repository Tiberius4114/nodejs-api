# Agent Instructions

## Project overview

This repository is a Node.js REST API (a course platform with courses, episodes, users, roles, and media uploads). Keep changes focused on the requested task and preserve existing behavior unless a change is explicitly required.

## Tech stack

- Express 5 (CommonJS, entry point: `server.js`)
- MongoDB via Mongoose 9 (+ `mongoose-paginate-v2`)
- Auth: JWT (`jsonwebtoken`) + `bcrypt`
- Validation: Zod (`modules/validations/`)
- File uploads: Multer (`middlewares/upload/`)
- Env files: `.env.development` (see `.env.example`)

## Project structure

- `server.js` — app entry point
- `config.js` — configuration
- `modules/routes/` — routes, versioned under `api/v1`, `api/v1.2`, `api/v2`, plus `api/admin`
- `modules/controllers/` — controllers, mirroring the route structure
- `modules/models/` — Mongoose models (`Course`, `Episode`, `Media`, `Role`, `User`)
- `modules/transforms/` — response transformers (shape API output)
- `modules/validations/` — Zod validation schemas
- `middlewares/` — `authenticate`, `permissions`, `upload`
- `constants/`, `utils/` — shared helpers

## Conventions

- New API endpoints follow the versioned pattern: route in `modules/routes/api/<version>/...`, controller in `modules/controllers/api/<version>/...`, validation in `modules/validations/`, transform in `modules/transforms/`.
- CommonJS (`require`/`module.exports`), not ESM.

## Working guidelines

- Inspect the relevant files before editing.
- Keep file operations inside the project directory.
- Preserve unrelated changes in the working tree.
- Follow the existing JavaScript and project conventions.
- Do not commit, push, or modify remote repositories unless explicitly requested.
- Do not add dependencies unless they are necessary and approved by the task.

## Validation

- There are no automated tests configured. The only npm script is `npm start` (nodemon).
- Verify changes with a focused manual check (e.g. run the server and hit the affected endpoint).
- Report what changed and how it was validated.

## Recent changes

Add a short dated line here when the user asks to "update AGENTS.md". Keep newest entries at the top.

- 2026-09-05: Renamed `agent.md` to `AGENTS.md`; documented tech stack, project structure, and conventions.
