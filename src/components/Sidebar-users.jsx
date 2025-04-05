import React from "react";
import { Plus } from "lucide-react";

const onlineUsers = [
  { id: 1, profileImage: "/assets/img/user-profile-1.png", status: "active" },
];

const UsersList = ({ user }) => {
  return (
    <li
      key={user.id}
      className="w-full h-13 relative flex items-center justify-center border-primary-gray"
    >
      <img
        src={user.profileImage}
        alt="profileImage"
        className="w-logo rounded-full"
      />
      {user.status == "active" ? (
        <p className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-primary-green"></p>
      ) : (
        <p className="absolute bottom-2 right-3 w-2 h-2 rounded-full bg-red-500"></p>
      )}
    </li>
  );
};

export default function SidebarUsers() {
  return (
    <div className="w-13 h-full min-h-screen border-r border-primary-gray flex flex-col items-center justify-between">
      <ul className="w-full h-full flex flex-col items-center justify-start">
        {onlineUsers?.map((user) => (
          <UsersList user={user} key={user.id} />
        ))}
      </ul>
      <button className="w-full h-13 flex items-center justify-center cursor-pointer border border-primary-gray">
        <Plus className="text-white" />
      </button>
    </div>
  );
}
