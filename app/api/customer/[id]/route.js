import Customer from "@/models/Customer";

export async function GET(request, { params }) {
  try {
    const customer = await Customer.findById(params.id);
    if (!customer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return Response.json(customer);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch customer" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const customer = await Customer.findByIdAndDelete(params.id);
    if (!customer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return Response.json({ message: "Customer deleted successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete customer" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
