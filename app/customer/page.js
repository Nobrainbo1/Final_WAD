"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomerPage() {
  const columns = [
    { field: 'memberNumber', headerName: 'Member #', width: 120 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150 },
    { field: 'interests', headerName: 'Interests', width: 200 },
    {
      field: 'Action', headerName: 'Action', width: 250,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center h-full">
            <button 
              onClick={() => startEditMode(params.row)} 
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteCustomer(params.row)} 
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Delete
            </button>
            <Link 
              href={`/customer/${params.row._id}`} 
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm text-center"
            >
              View
            </Link>
          </div>
        )
      }
    },
  ]

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCustomers() {
    const data = await fetch(`${API_BASE}/customer`);
    const c = await data.json();
    const c2 = c.map((customer) => {
      return {
        ...customer,
        id: customer._id,
        dateOfBirth: new Date(customer.dateOfBirth).toLocaleDateString()
      }
    })
    setCustomers(c2);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  function handleCustomerFormSubmit(data) {
    if (editMode) {
      // Updating a customer
      fetch(`${API_BASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        stopEditMode();
        fetchCustomers();
      });
      return;
    }

    // Creating a new customer
    fetch(`${API_BASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth)
      }),
    }).then(() => fetchCustomers());
  }

  function startEditMode(customer) {
    reset({
      _id: customer._id,
      name: customer.name,
      dateOfBirth: customer.dateOfBirth.split('T')[0],
      memberNumber: customer.memberNumber,
      interests: customer.interests
    });
    setEditMode(true);
  }

  function stopEditMode() {
    reset({
      name: '',
      dateOfBirth: '',
      memberNumber: '',
      interests: ''
    });
    setEditMode(false);
  }

  async function deleteCustomer(customer) {
    if (!confirm(`Are you sure to delete [${customer.name}]`)) return;

    const id = customer._id;
    await fetch(`${API_BASE}/customer/${id}`, {
      method: "DELETE"
    });
    fetchCustomers();
  }

  return (
    <main>
      <div className="m-4 mb-6">
        <Link href="/" className="text-blue-600 underline">
          ← Home
        </Link>
      </div>
      <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-800 p-2">
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
            {editMode ? (
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  value="Update"
                />
                {' '}
                <button
                  onClick={() => stopEditMode()}
                  className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Add"
                className="w-20 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            )}
          </div>
        </div>
      </form>

      <div className="mx-4">
        <DataGrid
          rows={customers}
          columns={columns}
        />
      </div>
    </main>
  );
}
