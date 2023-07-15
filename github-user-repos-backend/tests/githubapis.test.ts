import request from 'supertest';

import { describe, it, expect } from 'vitest';
import { HTTP_CODES } from '../constants/httpCodes';
import app from '../server';

describe('Username availability checking', () => {
    it('Should respond with 404 (NOT_FOUND) for invalid github username', async () => {
        const res = await request(app).get('/api/github/check-username').query({
            username: 'partheevdddd',
        });
        expect(res.statusCode).toBe(HTTP_CODES.NOT_FOUND);
    });

    it('Should response with 400 (BAD_REQUEST) if query params not sent', async () => {
        const res = await request(app).get('/api/github/check-username');
        expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });

    it('Should response with 200 (SUCCESS) for correct username', async () => {
        const res = await request(app)
            .get('/api/github/check-username')
            .query({ username: 'partheev' });
        expect(res.statusCode).toBe(HTTP_CODES.SUCCESS);
    });
});

describe('Github user repos', () => {
    it('Should respond with 404 (NOT_FOUND) for invalid github username', async () => {
        const res = await request(app).get('/api/github/repos').query({
            username: 'partheevdddd',
        });
        expect(res.statusCode).toBe(HTTP_CODES.NOT_FOUND);
    });

    it('Should response with 400 (BAD_REQUEST) if query params not sent', async () => {
        const res = await request(app).get('/api/github/repos');
        expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });

    it(
        'Should response with 200 (SUCCESS) for correct username',
        async () => {
            const res = await request(app)
                .get('/api/github/repos')
                .query({ username: 'partheev' });
            expect(res.statusCode).toBe(HTTP_CODES.SUCCESS);
        },
        { timeout: 20000 }
    );
});
