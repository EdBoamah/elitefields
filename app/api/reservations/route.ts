import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import  prisma  from "@/app/libs/prismadb"; // Ensure you have Prisma client properly imported

export async function POST(request: Request) {
    // Retrieve the current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {
        // Parse the request body
        const body = await request.json();
        const { listingId, startDate, endDate, totalPrice } = body;

        // Check for missing fields
        if (!listingId || !startDate || !endDate || !totalPrice) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the reservation linked to the listing
        const ListingAndReservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                reservations: {
                    create: {
                        userId: currentUser.id,
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        totalPrice
                    }
                }
            }
        });

        return NextResponse.json(ListingAndReservation);
    } catch (error) {
        console.error("Error creating reservation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
