# Campus Lost & Found API Service

A secure backend API for managing lost and found items on campus. Built with Node.js, Express, MongoDB, and JWT authentication.

## Features
- Register and login for administrators
- JWT-based authentication and authorization
- CRUD operations for lost/found items
- Query-based filtering (status, category, location, date)
- Rate limiting for security
- Robust validation and error handling

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/scodez3-14/LF_API-backend-.git
   cd LF_API-backend-
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   PORT=3000
   ```
4. Start the server:
   ```bash
   node app.js
   ```

## API Endpoints

### Auth
- `POST /auth/register` — Register a new admin
- `POST /auth/login` — Login and receive JWT

### Items
- `GET /items` — List items (supports filters)
- `GET /items/:id` — Get item details
- `POST /items` — Create item (auth required)
- `PUT /items/:id` — Update item (auth required)
- `DELETE /items/:id` — Delete item (admin only)

### Filtering Example
```
GET /items?status=lost&category=electronics&location=Library&date=2025-09-01
```

## Example Item Data
```json
{
  "title": "Lost Laptop",
  "description": "Silver MacBook Pro, stickers on lid",
  "status": "lost",
  "category": "electronics",
  "location": "Library",
  "date": "2025-09-01",
  "contactInfo": "user@email.com",
  "imageURL": "https://example.com/image.jpg"
}
```

## License
MIT
