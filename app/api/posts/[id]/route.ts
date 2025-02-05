// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const db = await readDB();
    const post = db.posts.find((p) => p.id === params.id);

    if (!post) {
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(post);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const db = await readDB();
    const index = db.posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        );
    }

    db.posts.splice(index, 1);
    await writeDB(db);

    return NextResponse.json({ message: 'Post deleted' });
}