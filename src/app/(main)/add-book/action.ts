
'use server'

import { redirect } from 'next/navigation';
// @ts-ignore
import dbConnect from '@/lib/db';
// @ts-ignore
import Book from '@/models/Book';
// @ts-ignore
import { getUserFromRequest } from '@/lib/auth';

export async function createBook(formData: FormData) {
    // @ts-ignore
    const userId = await getUserFromRequest();

    if (!userId) {
        redirect('/login');
    }

    const title = formData.get('book-title') as string;
    const author = formData.get('author') as string;
    const pages = formData.get('pages');
    const category = formData.get('category') as string;

    if (!title || !author || !pages) {
        // Just return if invalid, UI handles validation via "required" attribute
        return;
    }

    await dbConnect();

    try {
        await Book.create({
            title,
            author,
            totalPages: Number(pages),
            category: category || 'Uncategorized',
            ownerId: userId,
            currentPage: 0,
            isLent: false,
        });
    } catch (error) {
        console.error('Failed to create book:', error);
        throw new Error('Failed to create book');
    }

    redirect('/dashboard');
}
