// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
    const db = await readDB();
    return NextResponse.json(db.posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title?.trim()) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        if (!body.author?.trim()) {
            return NextResponse.json(
                { error: 'Author is required' },
                { status: 400 }
            );
        }

        if (!body.content?.trim()) {
            return NextResponse.json(
                { error: 'Content is required' },
                { status: 400 }
            );
        }

        const newPost = {
            id: Date.now().toString(),
            title: body.title.trim(),
            author: body.author.trim(),
            content: body.content.trim(),
            createdAt: new Date().toISOString(),
        };

        const db = await readDB();
        db.posts.push(newPost);
        await writeDB(db);

        return NextResponse.json(newPost, { status: 201 });

    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}