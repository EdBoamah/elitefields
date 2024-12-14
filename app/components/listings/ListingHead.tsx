'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Image from "next/image";
import { IconType } from "react-icons"; 
import ListingInfo from "./ListingInfo";
import { useState } from "react";

interface Category {
    icon: IconType;
    label: string;
    description: string;
}

interface Listing {
    user: SafeUser;
    category?: Category;
    description: string;
    address: string;
    contactPhone: string;
    contactEmail: string;
    images: string[]; // Array of image URLs
}

interface ListingHeadProps {
    title: string;
    imageSrc: string[]; // Array of image URLs
    id: string;
    currentUser: SafeUser | null;
    listing: Listing;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc = ["/default-listing-image.jpg"],
    id,
    currentUser,
    listing
}) => {
    const {
        user,
        category = { icon: () => null, label: "No category", description: "" },
        description = "No description available",
        address = "Address not provided",
        contactPhone = "Phone not provided",
        contactEmail = "Email not provided"
    } = listing;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        if (imageSrc.length === 0) return;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length); // Wrap around to first image
    };

    const handlePrevImage = () => {
        if (imageSrc.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1 // Wrap around to last image
        );
    };

    return (
        <>
            {/* Header with Title and Location */}
            <div className="pt-6">
                <Heading
                    title={title}
                    subtitle={address}
                />
            </div>
            
            {/* Image Gallery */}
            <div className="w-full relative overflow-hidden rounded-xl">
                <div className="relative w-full h-[60vh]">
                    {/* Display the current image */}
                    <Image
                        alt={`Image of ${title}`}
                        src={imageSrc[currentImageIndex]}
                        width={800}
                        height={800}
                        className="object-cover w-full h-full"
                        blurDataURL="data:image/jpeg;base64,[base64_encoded_data]"
                    />
                    {/* Previous button */}
                    <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                    >
                        &lt;
                    </button>
                    {/* Next button */}
                    <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                    >
                        &gt;
                    </button>
                </div>
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                        aria-label="Add to favourites"
                    />
                </div>
            </div>
            
            {/* Listing Information */}
            <div
                className="
                    grid 
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                "
            >
                <ListingInfo
                    user={user}
                    category={category}
                    contactPhone={contactPhone}
                    contactEmail={contactEmail}
                    address={address}
                />
            </div>
        </>
    );
};

export default ListingHead;
