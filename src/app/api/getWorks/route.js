import dbConnect from '@/lib/dbConnect';
import Farmer from '@/models/Farmer';
import Work from '@/models/Work';

export async function GET(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }

    await dbConnect();

    try {
        const works = await Work.find();
        const userAdd = await Farmer.findById({_id: works[0].farmer})
        return Response.json({ success: true, data: {works, add: userAdd.address} }, {status: 200});
        
    } catch (error) {
        return Response.json({ success: false, error: error.message }, {status: 400});
    }
}
