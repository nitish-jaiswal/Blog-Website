import { NextResponse } from 'next/server';

export let posts: any[] = [];

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body.title || !body.author || !body.content) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const newPost = {
        id: Date.now().toString(),
        title: body.title,
        author: body.author,
        content: body.content,
        createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    return NextResponse.json(newPost, { status: 201 });
}