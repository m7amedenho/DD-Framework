# Installation

Install the packages:

```bash
npm install
```

Create `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

Start the server:

```bash
node --env-file=.env.local server.js
```

The server runs at `http://localhost:3000`.
