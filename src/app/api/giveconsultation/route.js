import dbConnect from '@/lib/dbConnect';
import Farmer from '@/models/Farmer';
import Vet from '@/models/Vet';

export async function PUT(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const { vetId, farmerId } = await req.json();

        // Check if the vet exists
        const vet = await Vet.findById(vetId);
        console.log(vet)
        if (!vet) {
            return Response.json({ success: false, error: 'Vet not found' });
        }

        // Check if the farmer exists
        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
            return Response.json({ success: false, error: 'Farmer not found' });
        }

        // Add farmer to the vet's associatedFarmers array
        if (vet.associatedFarmers.includes(farmerId)) {
            return Response.json({ success: false, error: 'Farmer already associated with this vet' });
        }

        vet.associatedFarmers.push(farmerId);
        await vet.save();

        // Add vet to the farmer's associatedVets array
        farmer.associatedVets.push(vetId);
        await farmer.save();

        return Response.json({ success: true, data: { vet, farmer } });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}
    
export async function POST(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const { vetId, farmerId } = await req.json();

        // Check if the vet exists
        const vet = await Vet.findById(vetId);
        if (!vet) {
            return Response.json({ success: false, error: 'Vet not found' });
        }

        // Check if the farmer exists
        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
            return Response.json({ success: false, error: 'Farmer not found' });
        }

        // Check if the farmer is associated with the vet
        if (!vet.associatedFarmers.includes(farmerId)) {
            return Response.json({ success: false, error: 'Farmer not associated with this vet' });
        }

        // Remove farmer from the vet's associatedFarmers array
        vet.associatedFarmers = vet.associatedFarmers.filter(f => f.toString() !== farmerId);
        await vet.save();

        // Remove vet from the farmer's associatedVets array
        farmer.associatedVets = farmer.associatedVets.filter(v => v.toString() !== vetId);
        await farmer.save();

        return Response.json({ success: true, data: { vet, farmer } });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}


// this route shows all the requests form farmers
export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const vetId = searchParams.get("vetId");
      console.log("vet id in giveConsultation, ", vetId);
  
      if (!vetId) {
        return NextResponse.json(
          { success: false, error: "Missing vetId in query parameters" },
          { status: 400 }
        );
      }
  
      await dbConnect();
  
      const vet = await Vet.findById(vetId);
      if (!vet) {
        return NextResponse.json({ message: "Vet not found" }, { status: 404 });
      }
  
      console.log("the vet :: ", vet);
  
      const associatedFarmers = await Farmer.find({
        _id: { $in: vet.associatedFarmers },
      });
  
      return NextResponse.json(
        {
          success: true,
          associatedFarmers: associatedFarmers.map((farmer) => ({
            id: farmer._id,
            name: farmer.name,
            contact: farmer.contact,
            location: farmer.location,
          })),
        },
        { status: 200 }
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: "An error occurred while processing your request" },
        { status: 500 }
      );
    }
  }