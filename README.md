# Cortex — Event Management SaaS

A multi-tenant event management platform that enables organizations to create and manage events, handle ticket bookings, and verify attendees at entry.

🔗 **Live Demo:** https://cortex-sage-seven.vercel.app

---

## The Problem

Event organizers need a unified platform to manage their organization, create events, sell tickets, and verify attendees at the venue — all with proper role-based access control.

## The Solution

Cortex provides a complete event management workflow:

- Organizations with role-based team management
- Event creation with capacity management and pricing
- QR code generation per booking for venue entry
- Real-time ticket verification by volunteers at the door

---

## Features

**Authentication**

- Multi-provider OAuth — Google, LinkedIn
- Credentials-based auth with secure password hashing
- Session management via NextAuth.js

**Organization Management**

- Create organizations with unique slugs
- Invite team members and assign roles — Admin or Volunteer
- Admin dashboard with organization statistics
- Revenue tracking, tickets sold, attendance rate

**Event Management**

- Create events with venue, date, time, pricing, and capacity
- Trending events ranked by sold/capacity ratio
- Individual event pages with real-time availability

**Ticket Booking**

- Wallet system — add funds, track balance and transactions
- Book tickets with automatic wallet deduction
- Capacity enforcement — prevents overbooking

**QR Verification**

- Unique QR code generated per booking
- Volunteer scanner page using device camera
- Real-time ticket validation and entry marking
- Prevents duplicate entry — marks ticket as used

**User Dashboard**

- My Bookings with QR codes
- Booked events calendar view
- Transaction history

**UI/UX**

- Dark/light mode with system preference detection
- Responsive design
- Professional landing page

---

## Tech Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| Framework      | Next.js 15 (App Router) |
| Language       | TypeScript              |
| Authentication | NextAuth.js v4          |
| Database       | PostgreSQL (Neon)       |
| ORM            | Prisma                  |
| Styling        | Tailwind CSS            |
| Deployment     | Vercel                  |

---

## Architecture Decisions

**Multi-tenancy via Organization scoping**
Every database query is scoped by `orgId` to ensure complete data isolation between organizations. An admin of Org A cannot access Org B's data under any circumstances.

**Role-based access control**
Middleware enforces role permissions at the route level. Admins have full control — event creation, member management, statistics. Volunteers only access the QR scanner. Users only see public events and their own bookings.

**QR verification flow**
Each booking generates a unique `qrCode` string stored in the database. On scan, the system validates the code, checks if already used (`isUsed`), marks it as used with a timestamp (`usedAt`), and returns entry status. This prevents duplicate entry at the venue.

---

## Database Schema

Key models: `User`, `Organization`, `UserRole`, `Event`, `Booking`, `Wallet`, `Transaction`

Role enum: `ADMIN` | `MODERATOR` | `VOLUNTEER`

Notable constraints:

- `@@unique([userId, orgId])` on UserRole — prevents duplicate roles per user per org
- `@@unique([bookerId, eventId])` on Booking — prevents duplicate bookings
- Cascade deletes throughout for data integrity
- Indexes on all foreign keys for query performance

---

## Local Setup

### Option 1: Without Docker

1. ```bash
   git clone https://github.com/quirbyte/Cortex-v2
   cd Cortex-v2
   npm install
   ```

2. On Linux, macOS, or Git Bash:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   copy .env.example .env
   ```

   > **Note:** If running without Docker, edit DATABASE_URL in .env and replace cortex-db with localhost (or your own Postgres host), e.g.:
   > DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/postgres

3. ```bash
   npx prisma migrate dev
   npm run dev
   ```

### Option 2: With Docker

1. **Start the Docker Engine.**

2. **Navigate to the project root folder and copy the environment file.**

   On Linux, macOS, or Git Bash:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell:

   ```powershell
   copy .env.example .env.local
   ```

   > **Note:** Ensure `DATABASE_URL` inside `.env.local` is set exactly to:
   >
   > ```
   > DATABASE_URL="postgres://postgres:mysecretpassword@cortex-db:5432/postgres"
   > ```
   >
   > The application container uses the container name `cortex-db` to communicate over the shared network.

3. **Create the Docker network.**

   ```bash
   docker network create cortex-network
   ```

4. **Create the Docker volume.**

   ```bash
   docker volume create cortex-volume
   ```

5. **Remove any stale Postgres container and run a fresh instance.**

   ```bash
   # Remove any stale instances if they exist
   docker rm -f cortex-db 2>/dev/null

   # Run the Postgres container instance
   docker run --network cortex-network --name cortex-db -p 5432:5432 \
     -e POSTGRES_PASSWORD=mysecretpassword \
     -v cortex-volume:/var/lib/postgresql \
     -d postgres
   ```

6. **Push the Prisma schema to the database.**

   Windows Command Prompt (CMD):

   ```cmd
   set DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres
   npx prisma db push
   ```

   Windows PowerShell:

   ```powershell
   $env:DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   npx prisma db push
   ```

   Linux / macOS / Git Bash:

   ```bash
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres" npx prisma db push
   ```

7. **Remove any stale application container and launch the app.**

   ```bash
   # Remove any stale application server instances if they exist
   docker rm -f cortex 2>/dev/null

   # Launch the application container
   docker run --network cortex-network --name cortex -p 3000:3000 \
     --env-file .env.local \
     quirbyte/cortex
   ```

### Option 3: With Docker Compose

1. **Start the Docker Engine.**

2. **Clone The repository.**

3. **Navigate to the project root folder and copy the environment file.**

   On Linux, macOS, or Git Bash:

   ```bash
   cp .env.example .env.local
   ```

   On Windows PowerShell:

   ```powershell
   copy .env.example .env.local
   ```

   > **Note:** Ensure `DATABASE_URL` inside `.env.local` is set exactly to:
   >
   > ```
   > DATABASE_URL="postgres://postgres:mysecretpassword@cortex-db:5432/postgres"
   > ```
   >
   > The application container uses the container name `cortex-db` to communicate over the shared network.

4. **Start docker compose**

   ```bash
   docker compose up
   ```

   To stop docker compose

   ```bash
   docker compose down
   ```

---

## Upcoming Features

- Wallet-based ticket booking system
- Redis caching for event listings
- Razorpay payment gateway integration
- AI-powered event recommendations using RAG + pgvector
- CI/CD pipeline

---

## Author

**Soumyadip Mondal** — [@quirbyte](https://github.com/quirbyte)

> Built from scratch as part of a learning journey in full-stack development. Every line written and understood independently.
