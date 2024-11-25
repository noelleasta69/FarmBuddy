import dbConnect from "@/lib/dbConnect";
import Farmer from "@/models/Farmer";
import Work from "@/models/Work";
import Worker from "@/models/Worker";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { postId } = params; // Extract postId from dynamic route

  try {
    await dbConnect(); // Ensure the database is connected

    // Fetch the post with accepted workers populated
    const post = await Work.findById(postId).populate("acceptedWorkers").populate("farmer"); // Populate 'farmer' as well
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Fetch the associated workers based on the post's acceptedWorkers
    const workers = post.acceptedWorkers.map(worker => ({
      id: worker._id,
      name: worker.name,
      mobileNumber: worker.mobileNumber, // Assuming 'mobileNumber' exists in Worker schema
    }));

    console.log("Post details:___________________________________________________", post);
    console.log("Workers associated with the post:", workers);

    return NextResponse.json(
      {
        post: {
          jobTitle: post.jobTitle,
          jobDescription: post.jobDescription,
          totalWorkersRequired: post.totalWorkersRequired,
          totalDays: post.totalDays,
          payPerHour: post.payPerHour,
          acceptedWorkers: workers,
        },
        farmer: {
          id: post.farmer._id,
          name: post.farmer.name,
          mobileNumber: post.farmer.mobileNumber, 
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 });
  }
}
