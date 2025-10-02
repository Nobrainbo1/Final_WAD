import Customer from "@/models/Customer";

export async function GET() {
  try {
    const customers = await Customer.find().sort({ memberNumber: 1 });
    return Response.json(customers);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch customers" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Auto-generate member number if not provided
    if (!body.memberNumber) {
      const lastCustomer = await Customer.findOne().sort({ memberNumber: -1 });
      body.memberNumber = lastCustomer ? lastCustomer.memberNumber + 1 : 1;
    }
    
    const customer = new Customer(body);
    await customer.save();
    return Response.json(customer, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return new Response(JSON.stringify({ error: "Member number already exists" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Failed to create customer" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return new Response(JSON.stringify({ error: "Customer ID is required" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
    if (!customer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return Response.json(customer);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update customer" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
