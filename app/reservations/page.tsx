import getCurrentUser from "../actions/getCurrentUser";  // Function to fetch the current user
import getReservations from "../actions/getReservations";  // Import getReservations function to fetch reservations
import Client from "../components/Client";
import EmptyState from "../components/EmptyState";
import Reservations from "./Reservations";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();  // Fetch current user

    // If the user is not logged in, show an empty state
    if (!currentUser) {
        return (
            <Client>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </Client>
        );
    }

    try {
        // Fetch reservations for the current user
        const reservations = await getReservations({
            authorId: currentUser.id  // Assuming you have a way to get reservations for a specific user
        });

        // If no reservations are found, show an empty state
        if (reservations.length === 0) {
            return (
               
                <Client>
                    <EmptyState
                        title="No reservations found"
                        subtitle="Looks like you have no reservations"
                    />
                </Client>
            );
        }

        // If reservations are found, display them
        return (
            <Client>
                <Reservations
                    reservations={reservations}  // Pass reservations to the Reservations component
                    currentUser={currentUser}    // Pass current user to handle reservation actions if needed
                />
            </Client>
        );
    } catch (error) {
        console.error("Error fetching reservations: ", error);
        return (
            <Client>
                <EmptyState
                    title="Error"
                    subtitle="There was an error fetching your reservations."
                />
            </Client>
        );
    }
};

export default ReservationPage;
