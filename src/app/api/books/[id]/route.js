
import dbConnect from '../../../../lib/db';
import Book from '../../../../models/Book';
import { getUserFromRequest } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    await dbConnect();
    const userId = await getUserFromRequest();

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const book = await Book.findOne({ _id: id, ownerId: userId });

        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        const body = await request.json();
        const updatedBook = await Book.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json(updatedBook);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const userId = await getUserFromRequest();

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const book = await Book.findOneAndDelete({ _id: id, ownerId: userId });

        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Book deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
