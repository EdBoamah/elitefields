'use client'
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing,SafeUser } from "../types";

interface FavouriteProps{
    listings:SafeListing[];
    currentUser?:SafeUser | null;
}

const Favourites:React.FC<FavouriteProps> =({
    listings,
    currentUser
})=>{
    return(
       <Container>
        <div className="pt-6"><Heading
        title="Favourites"
        subtitle="List of places you have favourited"
        /></div>
        
        <div 
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        2xl:grid-cols-6
        gap-8
        ">
            {listings.map((listing)=>(
                <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
                />
            ))}
        </div>
       </Container>
    );
}
export default Favourites;