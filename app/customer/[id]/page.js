"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function CustomerDetailPage({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (params.id) {
      fetchCustomer(params.id);
    }
  }, [params.id]);

  const fetchCustomer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/customer/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
        reset({
          name: data.name,
          dateOfBirth: data.dateOfBirth.split('T')[0],
          memberNumber: data.memberNumber,
          interests: data.interests
        });
      } else {
        setError("Customer not found");
      }
    } catch (error) {
      setError("Failed to fetch customer details");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerFormSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: customer._id,
          ...data,
          dateOfBirth: new Date(data.dateOfBirth)
        }),
      });
      
      if (response.ok) {
        setEditMode(false);
        fetchCustomer(params.id);
      } else {
        setError("Failed to update customer");
      }
    } catch (error) {
      setError("Failed to update customer");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(`${API_BASE}/customer/${params.id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          window.location.href = "/customer";
        } else {
          setError("Failed to delete customer");
        }
      } catch (error) {
        setError("Failed to delete customer");
      }
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 mb-4">{error}</div>
        <Link href="/customer" className="text-blue-600 underline">
          ← Back to Customers
        </Link>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-yellow-600 mb-4">Customer not found</div>
        <Link href="/customer" className="text-blue-600 underline">
          ← Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 underline">
          ← Home
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link href="/customer" className="text-blue-600 underline">
          ← Back to Customers
        </Link>
        <div>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>

      <h1 className="text-3xl text-violet-950 mb-6">Customer Details</h1>

      {editMode ? (
        <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 w-fit border border-gray-800 p-4">
            <div>Name:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Date of Birth:</div>
            <div>
              <input
                name="dateOfBirth"
                type="date"
                {...register("dateOfBirth", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Member Number:</div>
            <div>
              <input
                name="memberNumber"
                type="number"
                {...register("memberNumber", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>Interests:</div>
            <div>
              <input
                name="interests"
                type="text"
                {...register("interests", { required: true })}
                placeholder="e.g., movies, football, gym, gaming"
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="col-span-2 text-right">
              <input
                type="submit"
                className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                value="Update"
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-800 p-4">
            <h2 className="text-xl font-bold text-violet-700 mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">Member Number</div>
                <div className="text-2xl font-bold text-violet-600">#{customer.memberNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Full Name</div>
                <div className="text-lg font-medium">{customer.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Date of Birth</div>
                <div className="text-lg">
                  {new Date(customer.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Age</div>
                <div className="text-lg">{calculateAge(customer.dateOfBirth)} years old</div>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 p-4">
            <h2 className="text-xl font-bold text-violet-700 mb-4">Interests & Preferences</h2>
            <div>
              <div className="text-sm text-gray-600 mb-2">Interests</div>
              <div className="flex flex-wrap gap-2">
                {customer.interests.split(',').map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 border border-gray-800 p-4">
        <h2 className="text-xl font-bold text-violet-700 mb-4">System Information</h2>
        <div className="space-y-2">
          <div>
            <div className="text-sm text-gray-600">Customer ID</div>
            <div className="text-sm font-mono">{customer._id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
