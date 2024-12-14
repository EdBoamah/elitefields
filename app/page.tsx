import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListing";
import Client from "./components/Client";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types"; // Assuming SafeListing is defined in your types file

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // If no listings are found, return the EmptyState component
  if (listings.length === 0) {
    return (
      <Client>
        <EmptyState showReset />
      </Client>
    );
  }

  // Render the listings if available
  return (
    <Client>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5 
            2xl:grid-cols-6
            gap-9
          "
        >
          {listings.map((listing: SafeListing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </Client>
  );
};

export default Home;
