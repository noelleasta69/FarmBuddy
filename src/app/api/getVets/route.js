import dbConnect from "@/lib/dbConnect";
import Vet from "@/models/Vet";

export async function GET(){
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();
    try {
        const vets = await Vet.find();
        if(vets.length === 0)return Response.json({message:"No vets found",data:[]},{status:200})
        return Response.json({message:"Vets fetched successfull",data:vets},{status:201});
    } catch (error) {
        return Response.json({message:"Error getting vets"},{status:500})
    }
}