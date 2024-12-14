'use client';

import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingCardProps {
    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    onEdit?: (listing: SafeListing) => void; // Add onEdit prop
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    onEdit, // Destructure onEdit prop
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}) => {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) return;
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    const price = useMemo(() => {
        return reservation ? reservation.totalPrice : data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    // Move to next image, with cycling behavior
    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from propagating to the parent div
        if (data.imageSrc.length === 0) return;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.imageSrc.length); // Wrap around to first image
    };

    // Move to previous image, with cycling behavior
    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from propagating to the parent div
        if (data.imageSrc.length === 0) return;
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1 // Wrap around to last image
        );
    };

    const currentImageSrc = data.imageSrc[currentImageIndex]; // Only set the current image URL

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)} // This will be triggered only when the listing card itself is clicked
            className="col-span-1 cursor-pointer group"
        >
            <div className="pt-1">
                <div className="flex flex-col gap-2 w-full pt-10">
                    <div
                        className="
                            aspect-square
                            w-full
                            relative
                            overflow-hidden
                            rounded-xl
                            
                        "
                    >
                        {/* Only render Image if a valid URL exists */}
                        {currentImageSrc ? (
                            <div className="relative w-full h-full">
                                <Image
                                    alt={`Listing Image`}
                                    src={currentImageSrc} // Show current image based on index
                                    width={800}
                                    height={800}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                {/* Previous button */}
                                <button
                                    onClick={handlePrevImage} // Stop event propagation
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                                >
                                    &lt;
                                </button>
                                {/* Next button */}
                                <button
                                    onClick={handleNextImage} // Stop event propagation
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                                >
                                    &gt;
                                </button>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex justify-center items-center">
                                <span>No Images Available</span>
                            </div>
                        )}

                        <div className="absolute top-3 right-3">
                            <HeartButton
                                listingId={data.id}
                                currentUser={currentUser}
                            />
                        </div>
                    </div>
                </div>
                <div className="font-semibold text-lg">{data.address}</div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">${price.toFixed(2)}</div>
                </div>
                {/* Conditionally render Edit button */}
                {onEdit && (
                    <Button
                        disabled={disabled}
                        small
                        label="Edit Property"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click from propagating to the parent div
                            onEdit(data); // Trigger edit function passed from parent
                        }}
                    />
                )}
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default ListingCard;
