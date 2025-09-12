import React from "react";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default MyProfile;
