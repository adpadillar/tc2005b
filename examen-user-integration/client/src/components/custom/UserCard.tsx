import { User } from "@/api/getUsers";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

interface UserCardProps {
  children?: React.ReactNode;
  user: User;
}

function getInitials(name: string) {
  return name.slice(0, 2);
}

export const UserSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex space-x-4">
        <Avatar className="shadow-md rounded-full">
          <AvatarFallback>
            <Skeleton className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Skeleton className="w-20 h-4 mb-2" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>
    </div>
  );
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link
      to={`/user/${user.id}`}
      className="bg-white transition-all hover:bg-gray-100 rounded-md p-4"
    >
      <div className="flex space-x-4">
        <Avatar className="shadow-md rounded-full">
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="font-light text-sm">{user.email}</p>
        </div>
      </div>
    </Link>
  );
};
