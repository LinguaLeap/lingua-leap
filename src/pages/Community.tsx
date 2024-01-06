import { getUsersList } from "../api/api";
import UserCard from "../components/UserCard";
import { useQuery } from "react-query";

const Community = () => {
    const { isLoading, error, data, isFetching } = useQuery(
        "usersList",
        getUsersList
    );

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    console.log("asd");
    return (
        <div className="flex flex-row flex-wrap container mx-auto px-7 py-8 bg-opacity-70 bg-white">
            {data.users.map((user: any, index: any | null | undefined) => (
                <UserCard key={index} user={user} />
            ))}
        </div>
    );
};
export default Community;
