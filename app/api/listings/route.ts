import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            console.log('No current user found');
            return NextResponse.error();
        }

        const body = await request.json();
        console.log('Request Body:', body); 

        const {
            title,
            description,
            imageSrc,
            category,
            price,
            contactPhone,
            contactEmail,
            address
        } = body;

        // Validate required fields
        const requiredFields = [title, description, imageSrc, category, price,contactPhone,contactEmail,address];
        if (requiredFields.some(field => field === undefined || field === null)) {
            console.log('Missing required fields:', requiredFields);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                price: parseInt(price, 10),
                userId: currentUser.id,
                contactPhone,contactEmail,
                address
            },
        });

        console.log('Listing created:', listing);
        return NextResponse.json(listing, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/listings:', error);

        // Check for Prisma errors and log details
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Prisma Error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Log error status to find out what went wrong
        console.log('Unexpected Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}