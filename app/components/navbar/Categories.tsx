'use client';

import { FaDraftingCompass } from 'react-icons/fa';  
import { FaHome } from 'react-icons/fa';           
import { GiHouse } from 'react-icons/gi';            
import { SiAirbnb } from 'react-icons/si'; 
import { useSearchParams, usePathname } from "next/navigation";
import { BiSolidLandmark } from "react-icons/bi"; 
import Container from "../Container";
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: 'Architectural Drawings',
        icon: FaDraftingCompass, 
        description: 'Detailed blueprints and technical drawings, including floor plans, elevations, and cross-sections. These documents specify dimensions, materials, structural elements, and other key details necessary for construction or renovation projects.',
    },
    
    {
        label: 'House For Rent',
        icon: FaHome,
        description: 'Explore available residential rental properties, including apartments, houses, and vacation homes. Ideal for short-term stays, long-term rentals, or seasonal housing solutions.',
    },
    {
        label: 'House For Sale',
        icon: GiHouse, 
        description: 'Find residential properties available for purchase. Whether you\'re looking for your dream home or an investment opportunity, these listings include detailed information on location, pricing, and features.',
    },
    {
        label: 'Airbnb',
        icon: SiAirbnb, 
        description: 'Discover unique and diverse properties available for short-term stays through Airbnb, ranging from cozy apartments and homes to extraordinary accommodations like cabins, villas, or even treehouses.',
    },
    {
        label: 'Land For Sale',
        icon: BiSolidLandmark, 
        description: 'Explore a wide range of land available for sale, from residential plots to expansive farmlands or commercial spaces, ideal for investment, development, or personal use.',
    },
];
   
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    
    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;
