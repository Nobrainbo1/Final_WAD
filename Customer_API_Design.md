# Customer Management API Design Document

## Overview

This document outlines the API design for Customer CRUD operations in the Stock Management System. The Customer feature extends the existing system with customer management capabilities.

## Customer Model Schema

```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  memberNumber: Number (required, unique),
  interests: String (required)
}
```

## API Endpoints

### 1. Read All Customers

**Route:** `GET /api/customer`  
**Payload (body):** -  
**Response:** `[{ "name": "John Doe", "dateOfBirth": "1990-01-15", "memberNumber": 1, "interests": "movies, football" }, ...]`  
**File:** `/app/api/customer/route.js`  
**Test curl:** `curl -X GET http://localhost:3000/api/customer`

### 2. Read Single Customer

**Route:** `GET /api/customer/[id]`  
**Payload (body):** -  
**Response:** `{ "name": "John Doe", "dateOfBirth": "1990-01-15", "memberNumber": 1, "interests": "movies, football", "_id": "..." }`  
**File:** `/app/api/customer/[id]/route.js`  
**Test curl:** `curl -X GET http://localhost:3000/api/customer/64f1a2b3c4d5e6f7g8h9i0j1`

### 3. Create New Customer

**Route:** `POST /api/customer`  
**Payload (body):** `{ "name": "Jane Smith", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym" }`  
**Response:** `{ "name": "Jane Smith", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym", "_id": "..." }`  
**File:** `/app/api/customer/route.js`  
**Test curl:** `curl -X POST http://localhost:3000/api/customer -H "Content-Type: application/json" -d '{"name":"Jane Smith","dateOfBirth":"1985-05-20","memberNumber":2,"interests":"gaming, gym"}'`

### 4. Update Existing Customer

**Route:** `PUT /api/customer`  
**Payload (body):** `{ "_id": "64f1a2b3c4d5e6f7g8h9i0j1", "name": "Jane Smith Updated", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym, movies" }`  
**Response:** `{ "name": "Jane Smith Updated", "dateOfBirth": "1985-05-20", "memberNumber": 2, "interests": "gaming, gym, movies", "_id": "64f1a2b3c4d5e6f7g8h9i0j1" }`  
**File:** `/app/api/customer/route.js`  
**Test curl:** `curl -X PUT http://localhost:3000/api/customer -H "Content-Type: application/json" -d '{"_id":"64f1a2b3c4d5e6f7g8h9i0j1","name":"Jane Smith Updated","dateOfBirth":"1985-05-20","memberNumber":2,"interests":"gaming, gym, movies"}'`

### 5. Delete Customer

**Route:** `DELETE /api/customer/[id]`  
**Payload (body):** -  
**Response:** `{ "message": "Customer deleted successfully" }`  
**File:** `/app/api/customer/[id]/route.js`  
**Test curl:** `curl -X DELETE http://localhost:3000/api/customer/64f1a2b3c4d5e6f7g8h9i0j1`

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "error": "Error message description"
}
```

## UI Components

The Customer management system includes the following UI components:

1. **Customer List Page** (`/customer`) - Displays all customers with options to view, edit, and delete
2. **Customer Detail Page** (`/customer/[id]`) - Shows detailed information for a specific customer
3. **Customer Form** - Modal or separate page for adding/editing customers

## Database Integration

- Uses MongoDB with Mongoose ODM
- Customer collection will be named "customer"
- Member numbers are unique and auto-incrementing
- Date of birth stored as JavaScript Date objects
- Interests stored as comma-separated strings

## Implementation Notes

- Follows existing project patterns for API routes and models
- Integrates with current Material-UI and Tailwind CSS styling
- Maintains consistency with existing Product and Category management
- Uses Next.js 13+ App Router structure
