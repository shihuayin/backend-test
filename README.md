````markdown
# Junior Full Stack Backend Test

This project provides a backend CRUD API for the Hult Ashridge admin dashboard, enabling CRUD operations on the `Programs` table. It includes automated tests and example data import scripts.

## Project Overview

- Express backend with Node.js + TypeScript
- Uses DynamoDB Local for data storage
- Exposes `GET`, `POST`, `PUT`, and `DELETE` endpoints for the `Programs` table
- Automated tests: Jest + Supertest covering all CRUD scenarios
- Example data: Imported from `data/example-programs.json`

---

## Requirements

- Node.js v14+
- npm
- Docker (for running DynamoDB Local)

---

## Full Workflow Commands (run in order)

```bash
# 1. Install dependencies (project root)
npm install

# 2. Start local DynamoDB (run in background)
docker run -d --name dynamodb-local -p 8000:8000 amazon/dynamodb-local

# 3. Initialize the table (create Programs table)
npm run init-table

# 4. Import example data
npm run import-programs

# 5. **Open a new terminal window**, start the backend server and keep it running
npm run dev

# 6. In the original window, run automated tests (ensure CRUD logic passes)
npm test
```
````

---

## Manual CRUD Testing (run in the original window)

Use the following `curl` commands in the **original terminal window** (where you ran `npm test`). Ensure the service started in window 2 (`npm run dev`) is still running.

1. **Read All Programs**

   ```bash
   curl -X GET http://localhost:3000/programs
   ```

   Expected: Returns an array containing the example data.

2. **Create a New Program**

   ```bash
   curl -X POST http://localhost:3000/programs \
     -H "Content-Type: application/json" \
     -d '{
       "id": 999,
       "title": "Manual Test Program",
       "topic": "demo",
       "learningFormats": ["video"],
       "bestseller": false,
       "startDate": "2025-07-01"
     }'
   ```

   Expected: Response `{ "message": "Program added successfully" }`.

3. **Verify Creation**

   ```bash
   curl -X GET http://localhost:3000/programs
   ```

   Expected: The returned list includes the record with `id: 999`.

4. **Update a Program**

   ```bash
   curl -X PUT http://localhost:3000/programs/999 \
     -H "Content-Type: application/json" \
     -d '{ "bestseller": true }'
   ```

   Expected: The response contains an `updated` object with `bestseller: true`.

5. **Delete a Program**

   ```bash
   curl -X DELETE http://localhost:3000/programs/999
   ```

   Expected: Response `{ "message": "Program with id 999 deleted." }`.

---

## Manual Testing with Postman

You can also manually create and execute the four requests in Postman:

1. **GET /programs**

   - Method: GET
   - URL: `http://localhost:3000/programs`  
     Click **Send**, expect status **200** and an array in the response.

2. **POST /programs**

   - Method: POST
   - URL: `http://localhost:3000/programs`
   - Headers: `Content-Type: application/json`
   - Body: (raw JSON)

     ```json
     {
       "id": 999,
       "title": "Manual Test Program",
       "topic": "demo",
       "learningFormats": ["video"],
       "bestseller": false,
       "startDate": "2025-07-01"
     }
     ```

   Click **Send**, expect status **201** and response `{ "message": "Program added successfully" }`.

3. **PUT /programs/:id**

   - Method: PUT
   - URL: `http://localhost:3000/programs/999`
   - Headers: `Content-Type: application/json`
   - Body: (raw JSON)

     ```json
     { "bestseller": true }
     ```

   Click **Send**, expect status **200** and a response containing an `updated` object with `bestseller: true`.

4. **DELETE /programs/:id**

   - Method: DELETE
   - URL: `http://localhost:3000/programs/999`  
     Click **Send**, expect status **200** and response `{ "message": "Program with id 999 deleted." }`.

```

```
