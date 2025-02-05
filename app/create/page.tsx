'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateBlog() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
    });
    const [error, setError] = useState('');
    const [status, setStatus] = useState({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ isSubmitting: true, isSuccess: false, isError: false, message: '' });
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({
                    isSubmitting: false,
                    isSuccess: true,
                    isError: false,
                    message: 'Blog post created successfully!'
                });

                setTimeout(() => {
                    router.push(`/posts/${data.id}`);
                }, 1000);
            } else {
                setStatus({
                    isSubmitting: false,
                    isSuccess: false,
                    isError: true,
                    message: data.error || 'Failed to create blog post'
                });
            }
        } catch (error) {
            setStatus({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                message: 'An error occurred while creating the post'
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
            {status.isSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {status.message}
                </div>
            )}

            {status.isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {status.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Author</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Content</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                        }
                        className="w-full p-2 border rounded h-48"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}