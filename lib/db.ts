
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface Post {
    id: string;
    title: string;
    author: string;
    content: string;
    createdAt: string;
}

export interface DB {
    posts: Post[];
}

export async function readDB(): Promise<DB> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { posts: [] };
    }
}

export async function writeDB(db: DB): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}