'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
    contactPhone?: string;  // Add contactPhone as a prop
    contactEmail?: string;  // Add contactEmail as a prop
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon: Icon,
    contactPhone,
    contactEmail
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                {/* Icon */}
              
                
               
            </div>

            {/* Contact Information */}
            {contactPhone && (
                <div className="text-neutral-500 font-light">Phone: {contactPhone}</div>
            )}
            {contactEmail && (
                <div className="text-neutral-500 font-light">Email: {contactEmail}</div>
            )}
        </div>
    );
}

export default ListingCategory;