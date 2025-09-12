// src/pages/account/MyProfile.jsx
const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default MyProfile;
