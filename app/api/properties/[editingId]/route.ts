import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { ObjectId } from "mongodb";

export async function PUT(request: Request, context: { params: { editingId: string } }) {
    try {
        const { editingId } = context.params;
        console.log("Received PUT request for listingId:", editingId);

        if (!editingId) {
            console.error("Missing listingId in request params");
            return NextResponse.json(
                { error: "Missing listing ID in request parameters" },
                { status: 400 }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(editingId)) {
            console.error("Invalid ObjectId format:", editingId);
            return NextResponse.json(
                { error: "Invalid listing ID format" },
                { status: 400 }
            );
        }

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            console.error("Unauthenticated user attempted to update listing");
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const body = await request.json();
        console.log("Parsed request body:", body);

        const { title, description, price, contactPhone, address } = body;

        // Validate required fields
        const missingFields = [];
        if (!title) missingFields.push("title");
        if (!description) missingFields.push("description");
        if (price === undefined) missingFields.push("price");
        if (!contactPhone) missingFields.push("contactPhone");
        if (!address) missingFields.push("address");

        if (missingFields.length > 0) {
            console.error("Validation failed. Missing fields:", missingFields);
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(", ")}` },
                { status: 400 }
            );
        }

        // Convert price to a number
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            console.error("Invalid price value:", price);
            return NextResponse.json(
                { error: "Price must be a positive number" },
                { status: 400 }
            );
        }

        // Check if the listing exists
        const existingListing = await prisma.listing.findUnique({
            where: { id: editingId },
        });

        if (!existingListing) {
            console.error("Listing not found:", editingId);
            return NextResponse.json(
                { error: "Listing not found" },
                { status: 404 }
            );
        }

        // Update the listing
        const updatedListing = await prisma.listing.update({
            where: { id: editingId },
            data: { title, description, price: parsedPrice, contactPhone, address },
        });

        console.log("Successfully updated listing:", updatedListing);
        return NextResponse.json(updatedListing, { status: 200 });
    } catch (error: any) {
        console.error("Unexpected error during update:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
