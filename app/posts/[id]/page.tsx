'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';

interface BlogPost {
    id: string;
    title: string;
    author: string;
    content: string;
    createdAt: string;
}

export default function BlogPost() {
    const router = useRouter();
    const params = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (params?.id) {
            fetchPost(params.id as string); // Ensure `params.id` is passed as a string
        }
    }, [params]);

    const fetchPost = async (id: string) => {
        try {
            const response = await fetch(`/api/posts/${id}`);
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/posts/${params?.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="prose lg:prose-xl">
                <h1>{post.title}</h1>
                <p className="text-gray-600">By {post.author}</p>
                <div className="mt-8">{post.content}</div>
            </article>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Delete Post
            </button>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
