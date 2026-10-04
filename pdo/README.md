# Personal Deadline Organizer

Full-stack task/deadline manager: **React + Vite**, **Node/Express**, **MongoDB (Mongoose)**, **JWT + bcrypt**.

## Features
Register/login (JWT), task CRUD, mark complete, search, filters (status/overdue/priority), sorting, automatic deadline states (Upcoming / Due soon / Due today / Overdue / Completed), dashboard stats, in-app reminders, profile update, responsive UI, dark mode (saved in localStorage).

## Setup
**Backend** (terminal 1)
```bash
cd backend
cp .env.example .env     # fill PORT=5000, MONGODB_URI, JWT_SECRET, CLIENT_URL=http://localhost:5173
npm install
npm run dev
```
**Frontend** (terminal 2)
```bash
cd frontend
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```
Open http://localhost:5173

## API
| Method | Route | Auth |
|---|---|---|
| POST | /api/auth/register | – |
| POST | /api/auth/login | – |
| GET | /api/auth/me | ✓ |
| GET/PUT | /api/users/profile | ✓ |
| GET/POST | /api/tasks | ✓ |
| GET/PUT/DELETE | /api/tasks/:id | ✓ |
| PATCH | /api/tasks/:id/complete | ✓ |

## Postman testing
1. `POST /api/auth/register` body `{"name":"Asha","email":"asha@test.com","password":"secret123"}` → 201 `{token,user}`
2. `POST /api/auth/login` body `{"email":"asha@test.com","password":"secret123"}` → 200 `{token,user}`
3. For all other requests add header `Authorization: Bearer <token>`.
4. `GET /api/users/profile` → 200 `{user}`
5. `POST /api/tasks` body `{"title":"Complete project","description":"Final report","category":"College","deadline":"2026-10-10","priority":"High","status":"Pending"}` → 201 `{task}`
6. `GET /api/tasks` → 200 `{tasks:[...]}` · `GET /api/tasks/:id` → 200 `{task}`
7. `PUT /api/tasks/:id` (same body shape as create) → 200 · `PATCH /api/tasks/:id/complete` → 200 status "Completed"
8. `DELETE /api/tasks/:id` → 200 `{message:"Task deleted"}`
Errors: 400 validation, 401 bad/missing token or credentials, 404 not found.

## GitHub
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/personal-deadline-organizer.git
git push -u origin main
```
`.env` is git-ignored — never commit it.

## Deployment
1. **MongoDB Atlas**: create free cluster, DB user, allow network access (0.0.0.0/0 for testing), copy connection string.
2. **Backend (Render/Railway)**: root dir `backend`, build `npm install`, start `npm start`. Env vars: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL=<your Vercel URL>`.
3. **Frontend (Vercel)**: root dir `frontend`, framework Vite. Env var `VITE_API_URL=https://<your-backend>/api`. Add a rewrite of all routes to `/index.html` (`vercel.json`: `{"rewrites":[{"source":"/(.*)","destination":"/"}]}`) so React Router works on refresh.

## Screenshots
_Add screenshots here._
