'use client';

import { SafeUser } from "@/app/types";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
    user?: SafeUser; // Host user information
    description: string; // Description of the listing
    contactPhone?: string; // Host contact phone number
    contactEmail?: string; // Host contact email
    address?: string; // Address of the listing
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    contactPhone,
    contactEmail,
    address,
}) => {
    return (
        <div className="col-span-4 flex flex-col gap-8">
            {/* Host Information */}
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>{user?.name}</div>
                </div>
                {address && <div className="text-neutral-600">{address}</div>}
            </div>

            {/* Category Information */}
            <ListingCategory
                contactPhone={contactPhone}
                contactEmail={contactEmail}
            />

            {/* Listing Description */}
            <div className="text-lg font-light text-neutral-500">{description}</div>
        </div>
    );
};

export default ListingInfo;
