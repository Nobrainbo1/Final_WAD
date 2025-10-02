# Customer Management API Design Document

## Customer Model Schema

**Fields:**

- name: String (required)
- dateOfBirth: Date (required)
- memberNumber: Number (required, unique)
- interests: String (required)

## API Endpoints

### 1. Read All Customers

| Route | GET /api/customer |
| ----- | ----------------- |

---

| Payload (body) | -   |
| -------------- | --- |

---

| Response | `[{ "name": "John Doe", "dateOfBirth": "1990-01-15T00:00:00.000Z", "memberNumber": 1, "interests": "movies, football", "_id": "..." }, ...]` |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |

---

| File | /app/api/customer/route.js |
| ---- | -------------------------- |

---

| Test | curl -X GET http://localhost:3000/api/customer |
| ---- | ---------------------------------------------- |

### 2. Read Single Customer

| Route | GET /api/customer/[id] |
| ----- | ---------------------- |

---

| Payload (body) | -   |
| -------------- | --- |

---

| Response | `{ "name": "John Doe", "dateOfBirth": "1990-01-15T00:00:00.000Z", "memberNumber": 1, "interests": "movies, football", "_id": "..." }` |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |

---

| File | /app/api/customer/[id]/route.js |
| ---- | ------------------------------- |

---

| Test | curl -X GET http://localhost:3000/api/customer/64f1a2b3c4d5e6f7g8h9i0j1 |
| ---- | ----------------------------------------------------------------------- |

### 3. Create New Customer

| Route | POST /api/customer |
| ----- | ------------------ |

---

| Payload (body) | `{ "name": "Jane Smith", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym" }` |
| -------------- | ------------------------------------------------------------------------------------------------------ |

---

| Response | `{ "name": "Jane Smith", "dateOfBirth": "1985-05-20T00:00:00.000Z", "memberNumber": 2, "interests": "gaming, gym", "_id": "..." }` |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- |

---

| File | /app/api/customer/route.js |
| ---- | -------------------------- |

---

| Test | curl -X POST http://localhost:3000/api/customer -H "Content-Type: application/json" -d '{"name":"Jane Smith","dateOfBirth":"1985-05-20","memberNumber":2,"interests":"gaming, gym"}' |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

### 4. Update Existing Customer

| Route | PUT /api/customer |
| ----- | ----------------- |

---

| Payload (body) | `{ "_id": "64f1a2b3c4d5e6f7g8h9i0j1", "name": "Jane Smith Updated", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym, movies" }` |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |

---

| Response | `{ "name": "Jane Smith Updated", "dateOfBirth": "1985-05-20T00:00:00.000Z", "memberNumber": 2, "interests": "gaming, gym, movies", "_id": "64f1a2b3c4d5e6f7g8h9i0j1" }` |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

---

| File | /app/api/customer/route.js |
| ---- | -------------------------- |

---

| Test | curl -X PUT http://localhost:3000/api/customer -H "Content-Type: application/json" -d '{"\_id":"64f1a2b3c4d5e6f7g8h9i0j1","name":"Jane Smith Updated","dateOfBirth":"1985-05-20","memberNumber":2,"interests":"gaming, gym, movies"}' |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### 5. Delete Customer

| Route | DELETE /api/customer/[id] |
| ----- | ------------------------- |

---

| Payload (body) | -   |
| -------------- | --- |

---

| Response | `{ "message": "Customer deleted successfully" }` |
| -------- | ------------------------------------------------ |

---

| File | /app/api/customer/[id]/route.js |
| ---- | ------------------------------- |

---

| Test | curl -X DELETE http://localhost:3000/api/customer/64f1a2b3c4d5e6f7g8h9i0j1 |
| ---- | -------------------------------------------------------------------------- |

## UI Components

The Customer management system includes the following UI components:

1. **Customer List Page** (/customer) - Displays all customers with options to view, edit, and delete
2. **Customer Detail Page** (/customer/[id]) - Shows detailed information for a specific customer
3. **Customer Form** - Modal or separate page for adding/editing customers
