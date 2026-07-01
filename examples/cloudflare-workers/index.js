import { remove } from '../../src/exifremove.js';

export default {
    async fetch(request) {
        if (request.method !== 'POST') {
            return new Response(
                'Send a POST request with a JPEG image as the request body',
                { status: 405 },
            );
        }

        const imageData = await request.arrayBuffer();

        try {
            const result = remove(Buffer.from(imageData));
            return new Response(result, {
                headers: { 'Content-Type': 'image/jpeg' },
            });
        } catch (e) {
            return new Response(e.message, { status: 400 });
        }
    },
};
