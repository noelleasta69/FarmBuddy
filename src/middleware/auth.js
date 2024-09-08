import dbConnect from '@/lib/dbConnect';
import Farmer from '@/models/Farmer';
import Vet from '@/models/Vet';
import Worker from '@/models/Worker';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function auth(req, res, next) {
    await dbConnect();
    try {

        // const x = req.cookies;
        // console.log( "#######: ", x);
        // const token = req.cookies?.accessToken || (req.headers?.authorization?.replace("Bearer ", "") || "");
        const { workData } = await req.json();
        console.log(workData);
        const cookies = cookie.parse(req.headers.get('cookie') || '');
        const token = cookies.accessToken;

        console.log("Token: ", token);
        if (!token) {
            throw new Error("Unauthorized request!");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token: ", decodedToken);

        if (!workData.type) {
            throw new Error("Invalid fields");
        }

        let user;

        switch (workData.type) {
            case "farmer":
                user = await Farmer.findOne({ _id: decodedToken._id });
                break;
            case "doctor":
                user = await Vet.findOne({ _id: decodedToken._id });
                break;
            case "worker":
                user = await Worker.findOne({ _id: decodedToken._id });
                break;
            default:
                throw new Error("Invalid user type");
        }

        if (!user) {
            throw new Error("Unable to find user, please login again");
        }

        req.user = user; // Attach user object to request for further use if needed
        return NextResponse.next();
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
}
