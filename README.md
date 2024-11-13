# Next.js Project with PostgreSQL

This project is a Next.js application initialized with create-next-app, set up to use a PostgreSQL database.

## Prerequisites

- **Node.js:** Ensure you have Node.js 18.x installed. You can download it here:
  `https://nodejs.org/en/download/package-manager`
- **PostgreSQL Database:** Have a PostgreSQL database set up, and update the connection string in your environment variables.

## Getting Started

### 1. Install Dependencies

Clone this repository and navigate into your project folder. Then, install the required packages:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment Variables

Create a .env file in the root of your project with the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your PostgreSQL credentials.

### 3. Generate Prisma Client

This project uses Prisma as an ORM. After configuring your .env file, run the following command to generate the Prisma client:

```bash
npx prisma generate
```

If you make changes to your database schema (in `prisma/schema.prisma`), run this command again to update the client.

### 4. Run the Development Server

Start the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` to view your app in the browser. The page will auto-update as you make edits.

### 5. Running with Docker

To run this project in a Docker container:

Build the Docker image:

```bash
docker build -t nextjs-postgres-app .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env nextjs-postgres-app
```

This setup will expose the app at `http://localhost:3000`.

## Database Migrations

If you make changes to the database schema, use Prisma to create and apply migrations:

```bash
npx prisma migrate dev --name migration_name
```

This command will update the database with the new schema and generate a new migration file.
