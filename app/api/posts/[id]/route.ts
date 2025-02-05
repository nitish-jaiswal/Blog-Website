import { NextResponse } from 'next/server';

import { posts } from '../route';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const post = posts.find((p) => p.id === params.id);

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
    const index = posts.findIndex((p) => p.id === params.id);

    if (index === -1) {
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        );
    }

    posts.splice(index, 1);
    return NextResponse.json({ message: 'Post deleted' });
}