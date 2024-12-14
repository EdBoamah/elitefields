import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    category?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { userId, category } = params;

        // Use 'const' since 'query' is not reassigned
        const query: Record<string, string | undefined> = {}; // More specific type

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Convert createdAt date to ISO string for safe JSON serialization
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: Error) { // Specify the error type here
        console.error("Database fetch error in getListings:", error);
        return [];
    }
}
