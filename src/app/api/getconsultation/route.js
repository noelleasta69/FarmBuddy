import dbConnect from '@/lib/dbConnect';
import Farmer from '@/models/Farmer';
import Vet from '@/models/Vet';

// add vet to consulted 
export async function PUT(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const { farmerId, vetId } = await req.json();

        // Check if the farmer exists
        const farmer = await Farmer.findById(farmerId);
        console.log(farmer)
        if (!farmer) {
            return Response.json({ success: false, error: 'Farmer not found' });
        }
       
        // Check if the vet exists
        const vet = await Vet.findById(vetId);
        if (!vet) {
            return Response.json({ success: false, error: 'Vet not found' });
        }

        // Add vet to the farmer's associatedVets array
        if (farmer.associatedVets.includes(vetId)) {
            return Response.json({ success: false, error: 'Vet already associated with this farmer' });
        }

        if (!farmer.associatedVets) {
            farmer.associatedVets = [];
        }
        farmer.associatedVets.push(vetId);
        await farmer.save();

        // Add farmer to the vet's associatedFarmers array
        vet.associatedFarmers.push(farmerId);
        await vet.save();

        return Response.json({ success: true, data: { farmer, vet } });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

// delete the vet from consulted arrary
export async function POST(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const { farmerId, vetId } = await req.json();

        // Check if the farmer exists
        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
            return Response.json({ success: false, error: 'Farmer not found' });
        }

        // Check if the vet exists
        const vet = await Vet.findById(vetId);
        if (!vet) {
            return Response.json({ success: false, error: 'Vet not found' });
        }

        // Check if the vet is associated with the farmer
        if (!farmer.associatedVets.includes(vetId)) {
            return Response.json({ success: false, error: 'Vet not associated with this farmer' });
        }

        // Remove vet from the farmer's associatedVets array
        farmer.associatedVets = farmer.associatedVets.filter(v => v.toString() !== vetId);
        await farmer.save();

        // Remove farmer from the vet's associatedFarmers array
        vet.associatedFarmers = vet.associatedFarmers.filter(f => f.toString() !== farmerId);
        await vet.save();

        return Response.json({ success: true, data: { farmer, vet } });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}
