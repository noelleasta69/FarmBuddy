import dbConnect from "@/lib/dbConnect";
import Work from "@/models/Work";

export async function GET(req){
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }        
    console.log("get request recieved");
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        
        const pincode = searchParams.get('pincode');
        
        // const reqBody = await req.json();
        // console.log(reqBody);
        // pincode = `${pincode}`;
        console.log(pincode);
        const vets = await Work.find({location: pincode});
        if(vets.length === 0)return Response.json({message:"No vets found",data:[]},{status:200})
        return Response.json({message:"Vets fetched successfull",data:vets},{status:201});
    } catch (error) {
        console.log(error.message)
        return Response.json({message:"Error getting vets"},{status:500})
    }
}