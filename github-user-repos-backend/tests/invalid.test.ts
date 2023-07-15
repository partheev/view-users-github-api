import { describe, it, expect } from 'vitest';

import request from 'supertest';
import app from '../server';
import { HTTP_CODES } from '../constants/httpCodes';

describe('Testing bad requests', () => {
    it('Should respond with 400 (BAD REQUEST) for invalid api paths', async () => {
        const res = await request(app).get('/sldfsdfj');
        expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
});
