'use client';
import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SafeListing } from "../types";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings }) => {
    const [localListings, setLocalListings] = useState(listings);
    const [deletingId, setDeletingId] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        price: number;
        contactPhone: string;
        contactEmail: string;
        address: string;
    }>({
        title: '',
        description: '',
        price: 1,
        contactPhone: '',
        contactEmail: '',
        address: '',
    });

    // Handle delete action
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Property deleted');
                setLocalListings(prevListings => prevListings.filter(listing => listing.id !== id));  // Optimistic UI update
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.error || "An unexpected error occurred. Please try again.";
                toast.error(errorMessage);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, []);

  // Handle edit button click
const onEdit = (listing: SafeListing) => {
    setEditingId(listing.id);
    setFormData({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        contactPhone: listing.contactPhone,
        address: listing.address,
    });
};

// Handle form change
const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
};

// Handle form submission for editing
const onSubmitEdit = async () => {
    if (editingId) {
        try {
            console.log("Sending request to update property", formData); // Log the request body
            const response = await axios.put(`/api/properties/${editingId}`, formData);
            const updatedListing = response.data;

            // Optimistic UI update
            setLocalListings(prevListings =>
                prevListings.map(listing =>
                    listing.id === updatedListing.id ? updatedListing : listing
                )
            );
            toast.success("Property updated successfully!");
            setEditingId(null); // Close the modal after saving
        } catch (error) {
            toast.error("Failed to update the property");
            console.error("Error updating property:", error); // More detailed error log
        }
    }
};

    return (
        <div>
            <div className="pt-5 px-6">
                <Heading title="Properties" subtitle="List of your properties" />
            </div>

            {/* Edit Property Modal */}
            {editingId && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
            {/* Close Button */}
            <button
                onClick={() => setEditingId(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmitEdit(); }}>
                {/* Title */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={onInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the property title"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={onInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a description for the property"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={onInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the price"
                    />
                </div>

                {/* Contact Phone */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Contact Phone</label>
                    <input
                        type="text"
                        name="contactPhone"
                        value={formData.contactPhone || ''}
                        onChange={onInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a contact phone number"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2 text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={onInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the address"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6 gap-4">
                    <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
)}


            {/* Property Listings */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 px-7">
                {localListings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={() => onCancel(listing.id)}  // Handle delete
                        onEdit={() => onEdit(listing)}  // Handle edit
                        disabled={deletingId === listing.id || editingId === listing.id}
                        actionLabel="Delete property"
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertiesClient;
