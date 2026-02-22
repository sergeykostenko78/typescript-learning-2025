import { test, expect } from '@playwright/test';
import { JsonPlaceholderClient } from '../../helpers/apiClient';

    test.describe('JSONPlaceholder API', () => {
        let client: JsonPlaceholderClient;

        test.beforeEach(async ({ request }) => {
            client = new JsonPlaceholderClient(request);
        });

        test('GET all posts', async () => {
            const posts = await client.getPosts();
            expect(posts.length).toEqual(100);
            expect(posts[0].id).toBe(1);
            expect(posts[0]).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
                userId: expect.any(Number),
            });
        });

        test('GET single post', async () => {
            const post = await client.getPost(1);
            expect(post.id).toBe(1);
            expect(post.userId).toBe(1);
            expect(post).toMatchObject({
                title: expect.any(String),
                body: expect.any(String),
            });
        });

        test('GET posts filtered by user', async () => {
            const byUser = await client.getPostsByUser(1);
            expect(byUser.length).toBe(10);
            expect(byUser.every(post => post.userId === 1)).toBe(true);
        });

        test('GET comments for a post', async () => {
            const comments = await client.getCommentsByPost(1);
            expect(comments.length).toBe(5);
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    postId: expect.any(Number),
                    id: expect.any(Number),
                    name: expect.any(String),
                    email: expect.any(String),
                    body: expect.any(String),
                });
                expect(comment.postId).toBe(1);
                expect(comment.email).toContain('@');
            });
        });

        test('GET single user (complex nested object)', async () => {
            const singleUser = await client.getUser(1);
            expect(singleUser.id).toBe(1);
            expect(singleUser.address).toMatchObject({
                street: expect.any(String),
                city: expect.any(String),
                zipcode: expect.any(String),
            });
            expect(singleUser.address.geo).toMatchObject({
                lat: expect.any(String),
                lng: expect.any(String),
            });
            expect(singleUser.company).toMatchObject({
                name: expect.any(String),
                catchPhrase: expect.any(String),
                bs: expect.any(String),
            });
        });

        test('GET non-existent resource (negative test)', async ({ request }) => {
            const response = await request.get('posts/999');
            expect(response.status()).toBe(404);
            expect(await response.json()).toEqual({});
        });

        test('POST create new post', async () => {
            const payload = {
                title: 'New Playwright Post',
                body: 'Learning API testing',
                userId: 1,
            }
            const createdPost = await client.createPost(payload);
            expect(createdPost.id).toBe(101);
            expect(createdPost.title).toBe(payload.title);
            expect(createdPost.body).toBe(payload.body);
            expect(createdPost.userId).toBe(payload.userId);
        });

        test('PUT update post (full replace)', async () => {
            const payload = {
                id: 1,
                title: 'Updated title',
                body: 'updated body',
                userId: 1,
            }
            const updatedPost = await client.updatePost(1, payload);
            expect(updatedPost.id).toBe(payload.id);
            expect(updatedPost.title).toBe(payload.title);
            expect(updatedPost.body).toBe(payload.body);
        });

        test('PATCH update post (partial)', async () => {
            const patchedPost = await client.patchPost(1, {title: "Patched Title"});
            expect(patchedPost.title).toBe('Patched Title');
            expect(patchedPost.body).toBeDefined();
            expect(patchedPost.userId).toBeDefined();
        });

        test('DELETE post', async ( {request} ) => {
            const response = await request.delete('posts/99');
            expect(response.status()).toBe(200);
            expect(await response.json()).toEqual({});
        });
    });