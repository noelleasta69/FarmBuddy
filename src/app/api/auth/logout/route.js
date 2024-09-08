import cookie from 'cookie';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const options = {
            httpOnly: true,
            maxAge: -1, // Immediately expire the cookie
            path: '/',
            sameSite: 'strict'
        };

        console.log("errr")

        const serializedCookie = cookie.serialize('accessToken', '', options);

        const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        response.headers.set('Set-Cookie', serializedCookie);

        return response;
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}