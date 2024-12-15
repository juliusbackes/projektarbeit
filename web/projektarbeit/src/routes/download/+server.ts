import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const GET = async () => {
    const filePath = path.resolve('static', 'Projektarbeit.zip');
    const fileBuffer = await fs.promises.readFile(filePath);

    await resend.emails.send({
        from: 'Projektarbeit <team@pa.juliusbackes.com>',
        to: ['juliusbackes@icloud.com'],
        subject: 'Projektarbeit Download Notification',
        html: `
            <p>Jemand hat die Projektarbeit heruntergeladen.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
        `
    });

    return new Response(fileBuffer, {
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="Projektarbeit.zip"'
        }
    });
};