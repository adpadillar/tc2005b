import getUser from "@/api/getUser";
import React from "react";
import { useQuery } from "react-query";
import SafeArea from "./SafeArea";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Hash, LocateFixedIcon, Phone } from "lucide-react";

interface UserBannerProps {
  children?: React.ReactNode;
  userid: string;
}

function getInitials(name: string) {
  return name.slice(0, 2);
}

const UserBanner: React.FC<UserBannerProps> = ({ userid }) => {
  const user = useQuery({
    queryKey: ["user", userid],
    queryFn: () => getUser(userid),
  });

  if (user.isLoading) {
    return (
      <div className="shadow-md bg-white">
        <SafeArea>
          <div className="flex justify-between">
            <div className="flex space-x-8 px-4 py-8">
              <Avatar className="w-24 h-24 shadow-md rounded-full">
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center space-y-3">
                <Skeleton className="w-40 h-7" />
                <Skeleton className="w-52 h-5" />
              </div>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-end">
              <div className="flex space-x-2 items-center">
                <Skeleton className="w-24 h-4" />
              </div>
              <div className="flex space-x-2 items-center">
                <Skeleton className="w-28 h-4" />
              </div>
              <div className="flex space-x-2 items-center">
                <Skeleton className="w-36 h-4" />
              </div>
            </div>
          </div>
        </SafeArea>
      </div>
    );
  }

  if (user.isError || !user.data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="shadow-md bg-white">
      <SafeArea>
        <div className="flex justify-between">
          <div className="flex space-x-8 px-4 py-8">
            <Avatar className="w-24 h-24 shadow-md rounded-full">
              <AvatarFallback>
                <AvatarFallback className="text-4xl">
                  {getInitials(user.data.name)}
                </AvatarFallback>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center space-y-1">
              <h2 className="text-3xl font-semibold">{user.data.name}</h2>
              <p className="text-xl font-light">{user.data.email}</p>
            </div>
          </div>
          <div className="flex flex-col text-gray-500 space-y-1 justify-center items-end">
            <div className="flex space-x-2 items-center">
              <p className="text-sm font-light">
                {user.data.age ? `${user.data.age} years old` : "18 years old"}
              </p>
              <Hash className="w-4 h-4" />
            </div>
            <div className="flex space-x-2 items-center">
              <p className="text-sm font-light">
                {user.data.phone ?? "+52 33 2175 2871"}
              </p>
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex space-x-2 items-center">
              <p className="text-sm font-light">
                {user.data.address ?? "Guadalajara, Jalisco, Mexico"}
              </p>
              <LocateFixedIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
};

export default UserBanner;
