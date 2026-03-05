
import dbConnect from '../../../lib/db';
import Book from '../../../models/Book';
import { getUserFromRequest } from '../../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    const userId = await getUserFromRequest();

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const books = await Book.find({ ownerId: userId }).sort({ createdAt: -1 });
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    const userId = await getUserFromRequest();

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const book = await Book.create({ ...body, ownerId: userId });
        return NextResponse.json(book, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
