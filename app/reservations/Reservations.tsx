'use client';
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import ListingCard from "../components/listings/ListingCard";

interface ReservationProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const Reservations: React.FC<ReservationProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error || "An error occurred");
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
             <div className="pt-6 x-5"></div>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={() => onCancel(reservation.id)}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Reservations;
