# Stock App (starter code)

Next.js 14
This app shows

1. MongoDB CRUD operations using Mongoose
2. Client Components interacting with APIs
3. Server Components Interacting with Server Actions

## Data Models

This application uses Mongoose schemas to define the following data models:

### Customer Model

```javascript
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  interests: {
    type: String,
    required: true,
  },
});
```

### Category Model

```javascript
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  order: Number,
});
```

### Product Model

```javascript
const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});
```

## API Documentation

For detailed Customer API endpoints and usage examples, see [Customer_API_Design.md](./Customer_API_Design.md).

# Setup

1. Define in .env the followings
   1.1 MONGODB_URI
   1.2 NEXT_PUBLIC_API_URL
