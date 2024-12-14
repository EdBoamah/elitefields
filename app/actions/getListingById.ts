import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;

        if (!listingId) {
            console.error("Error: Missing listing ID");
            throw new Error("Listing ID is required");
        }

        console.log(`Fetching listing for ID: ${listingId}`);

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            console.warn(`No listing found for ID: ${listingId}`);
            return null;
        }

        console.log(`Listing found for ID: ${listingId}`, listing);

        const user = listing.user || {};

        return {
            ...listing,
            createdAt: user.createdAt ? user.createdAt.toISOString() : null,
            updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
            emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null,
        };
    } catch (error: any) {
        console.error("Error in getListingById:", error.message || error);
        throw new Error("Failed to fetch the listing");
    }
}
