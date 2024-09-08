import dbConnect from '@/lib/dbConnect';
import Farmer from '@/models/Farmer';
import Work from '@/models/Work';
import { URL } from "url";

// get all the works posted by a particular farmer
export async function GET(req) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    console.log('check')
    await dbConnect();
    try {

        const { searchParams } = new URL(req.url);
        console.log('request url',req.url);
        const farmerId = searchParams.get('farmerId');
        console.log(farmerId);

        // Check if farmerId is provided
        if (!farmerId) {
            return Response.json({ success: false, error: 'Missing farmerId in query parameters' });
        }

        // Fetch works posted by the specified farmer
        const works = await Work.find({ farmer: farmerId });
        console.log(works);

        return Response.json({ success: true, data: works }, {status: 200});
    } catch (error) {
        console.log(error.message)
        return Response.json({ success: false, error: error.message });
    }
}

// post the work 
export async function POST(req) {
    // const authResult = await auth(req);
    
    // if (authResult.status === 401) {
    //     return authResult; // Return unauthorized response if middleware fails
    // }

    await dbConnect();
    try {
        const { farmer, workData } = await req.json();
        console.log(workData);
        console.log("farmer ID", farmer);
        
        // Check if the farmer exists
        const getfarmer = await Farmer.findById(farmer);
        
        console.log("farmer", getfarmer);
        if (!getfarmer) {
            return Response.json({ success: false, error: 'Farmer not found' }, { status: 500 });
        }

        // Create new work
        const workDataWithFarmer = { ...workData, farmer: getfarmer._id }; // Ensure to use getfarmer._id

        const work = await Work.create(workDataWithFarmer);

        // Update farmer's postedWorks array
        await Farmer.findByIdAndUpdate(getfarmer, { $push: { postedWorks: work._id } });

        return Response.json({ success: true, data: work }, {status: 200});
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

// delete a specific work posted by a farmer
export async function DELETE(req, res) {
    // const authResult = await auth(req);
    
    // if (authResult.status === 401) {
    //     return authResult; // Return unauthorized response if middleware fails
    // }

    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const work = await Work.findById(id);
        console.log(work)
        if (!work) {
            return Response.json({ success: false, error: 'Work not found' });
        }

        // Remove the work from the farmer's postedWorks array
        await Farmer.findByIdAndUpdate(work.farmer, { $pull: { postedWorks: id } });

        // Delete the work document
        await Work.deleteOne({ _id: id });
        return Response.json({ success: true, data: {} });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}