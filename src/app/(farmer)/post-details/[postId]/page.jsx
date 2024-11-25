"use client";
import { useEffect, useState } from "react";
import apiClient from "@/components/ApiClient";

const PostDetails = ({ params }) => {
  const { postId } = params; // Get the dynamic postId from params
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await apiClient.get(`/api/posts/${postId}`); // Example API call
        if (res.status !== 200) throw new Error("Error fetching post details");
        setPostDetails(res.data);
        console.log("res.data = ", res.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!postDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-green-600 text-lg font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      {/* Farmer Information */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-700">Farmer Information</h2>
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Name: </span>
          {postDetails.farmer.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Contact: </span>
          {postDetails.farmer.mobileNumber}
        </p>
      </div>

      {/* Post Details */}
      <h1 className="text-2xl font-bold text-green-700 mb-4">{postDetails.post.jobTitle}</h1>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-green-600">Description: </span>
        {postDetails.post.jobDescription}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Total Workers: </span>
          {postDetails.post.totalWorkersRequired}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Total Days: </span>
          {postDetails.post.totalDays}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-green-600">Pay per Hour: </span>
          {postDetails.post.payPerHour}
        </p>
      </div>
      <hr className="my-6 border-green-200" />
      
      {/* Workers Details */}
      <p className="text-lg font-semibold text-green-700 mb-2">
        Workers Who Accepted the Work
      </p>
      <div className="space-y-4">
        {postDetails.post.acceptedWorkers.map((worker) => (
          <div
            key={worker._id}
            className="p-4 border border-green-300 rounded-lg shadow-sm bg-green-50"
          >
            <p className="text-green-800 font-semibold">{worker.name}</p>
            <p className="text-gray-700">{worker.mobileNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
