import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    author: string;
    content: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">By {post.author}</p>
                <p className="text-gray-700">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? '...' : ''}
                </p>
            </div>
        </Link>
    );
}