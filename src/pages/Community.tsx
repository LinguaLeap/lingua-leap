import { getUsersList } from "../api/api";
import UserCard from "../components/UserCard";
import { useQuery } from "react-query";
import { UserType } from "../types/User";
import Filters from "../components/Filters";

const Community = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    "usersList",
    getUsersList
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="my-3 bg-white">
        <Filters />
      </div>

      <div className="flex flex-row flex-wrap content-wrapper px-7 py-8 bg-opacity-70 bg-white">
        {data.users.map((user: UserType, index: number) => {
          if (
            user.mainLanguage.length !== 0 &&
            user.otherLanguages.length !== 0
          ) {
            return <UserCard key={index} user={user} />;
          }
        })}
      </div>
    </div>
  );
};
export default Community;
