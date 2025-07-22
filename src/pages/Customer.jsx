import React, { useState, useEffect } from "react";
import { apiCall } from "../services/api.calls";
import { HttpConstants } from "../utils/stores";

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [customerProfile, setCustomerProfile] = useState({});

    const [form, setForm] = useState({
        customerName: "",
        acctBalance: "",
        currency: "Naira",
        accountType: "Savings",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddCustomer = async () => {
        try {
            setForm({
                customerName: "",
                acctBalance: "",
                currency: "Naira",
                accountType: "Savings",
            });
            setShowModal(false);
            const response = await apiCall(HttpConstants.POST,form,undefined);
            setTimeout(() => window.location.reload(), 200);
           return response.data;

        } catch (err) {
            console.error("err from create new customer>>", err);
        }
    };

    const handleUpdate = async (e, customer) => {
        e.preventDefault();
        try{
            setShowUpdateModal(true);
            setCustomerProfile(customer);
        }catch(err){
            console.error("err from update customer>>", err);
        }
    }

       const UpdateCustomer = async (e) => {
        e.preventDefault();
        try{
            const response = await apiCall(HttpConstants.PATCH,form,customer.id);
               //console.log("reponse>>", response);
               setShowUpdateModal(true);
               setTimeout(() => window.location.reload(), 200);
               return response.data;

        }catch(err){
            console.error("err from update customer>>", err);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    async function fetchCustomers() {
        try {
            const fetchRequests = await apiCall(HttpConstants.GET,undefined,undefined);
            setCustomers(fetchRequests?.data);
            return fetchRequests?.data;
        } catch (err) {
            console.error("err from GET request>>", err);
        }
    }




    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Customer Accounts</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Customer
                    </button>
                </div>

                <table className="w-full table-auto border border-gray-200">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-2">Customer Name</th>
                            <th className="p-2">Account Balance</th>
                            <th className="p-2">Currency</th>
                            <th className="p-2">Account Type</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No customer added yet.
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2">{customer.customerName}</td>
                                    <td className="p-2">{customer.acctBalance}</td>
                                    <td className="p-2">{customer.currency}</td>
                                    <td className="p-2">{customer.accountType}</td>
                                    <td className="p-2">
                                        <button onClick={(e) =>handleUpdate(e,customer)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
                                        &nbsp;
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Customer Name</label>
                            <input
                                type="text"
                                name="customerName"
                                value={form.customerName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Account Balance</label>
                            <input
                                type="number"
                                name="acctBalance"
                                value={form.acctBalance}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Currency</label>
                            <select
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option>Naira</option>
                                <option>USD</option>
                                <option>Pounds</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-medium">Account Type</label>
                            <select
                                name="accountType"
                                value={form.accountType}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option>Savings</option>
                                <option>Current</option>
                                <option>Fixed</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCustomer}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

                {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Customer Name</label>
                            {/* form.customerName */}
                            <input
                                type="text"
                                name="customerName"
                                value={ customerProfile.customerName}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Account Balance</label>
                            {/* form.acctBalance */}
                            <input
                                type="number"
                                name="acctBalance"
                                value={customerProfile.acctBalance}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Currency</label>
                            {/* form.currency */}
                            <select
                                name="currency"
                                value={customerProfile.currency}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option>Naira</option>
                                <option>USD</option>
                                <option>Pounds</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-medium">Account Type</label>
                            {/* form.accountType */}
                            <select
                                name="accountType"
                                value={customerProfile.accountType}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option>Savings</option>
                                <option>Current</option>
                                <option>Fixed</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={UpdateCustomer}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customer;