import { APIRequestContext, expect } from '@playwright/test';
import { Post, Comment, User, CreatePostRequest, CreatePostResponse } from './types/api.types';

export class JsonPlaceholderClient {
    private readonly request: APIRequestContext;
    private readonly baseUrl: string;

    // The Constructor: Sets up the initial environment
    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://jsonplaceholder.typicode.com/';
    }

    async getPosts(): Promise<Post[]> {
        const response = await this.request.get(`${this.baseUrl}posts`);
        expect(response.status()).toBe(200);
        return response.json();
    }  

    async getPost(id: number): Promise<Post> {
        const response = await this.request.get(`${this.baseUrl}posts/${id}`);
        expect(response.status()).toBe(200);
        return response.json();
    }

    async getPostsByUser(userId: number): Promise<Post[]> {
        const response = await this.request.get(`${this.baseUrl}users/${userId}/posts`);
        expect(response.status()).toBe(200);
        return response.json();
    }

    async getCommentsByPost(postId: number): Promise<Comment[]> {
        const response = await this.request.get(`${this.baseUrl}posts/${postId}/comments`);
        expect(response.status()).toBe(200);
        return response.json();
    }

    async getUsers(): Promise<User[]> {
        const response = await this.request.get(`${this.baseUrl}users`);
        expect(response.status()).toBe(200);
        return response.json();
    }

    async getUser(id: number): Promise<User> {
        const response = await this.request.get(`${this.baseUrl}users/${id}`);
        expect(response.status()).toBe(200);
        return response.json();
    }

    async createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
        const response = await this.request.post(`${this.baseUrl}posts`, {data});
        expect(response.status()).toBe(201);
        return response.json();
    }

    async updatePost(id: number, data: Post): Promise<Post> {
        const response = await this.request.put(`${this.baseUrl}posts/${id}`, {data});
        expect(response.status()).toBe(200);
        return response.json();
    }

    async patchPost(id: number, data: Partial<Post>): Promise<Post> {
        const response = await this.request.patch(`${this.baseUrl}posts/${id}`, {data});
        expect(response.status()).toBe(200);
        return response.json();
    }

    async deletePost(id: number): Promise<number> {
        const response = await this.request.delete(`${this.baseUrl}posts/${id}`);
        expect(response.status()).toBe(200);
        return response.status();
    }


}