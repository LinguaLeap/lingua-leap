import { useState, useEffect } from "react";
import { getUsersList } from "../api/api";
import { UserType } from "../types/User";
import UserCard from "../components/UserCard";

const Community = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchData = async () => {
    const data = await getUsersList();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-row flex-wrap content-wrapper px-7 py-8 bg-opacity-70 bg-white">
      {users.map((user, index) => {
        return <UserCard key={index} user={user} />;
      })}
    </div>
  );
};
export default Community;
