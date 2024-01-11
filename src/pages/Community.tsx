/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable operator-linebreak */
import { useInfiniteQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { RxReset } from 'react-icons/rx';
import { getFilteredUsersList } from '../api/api';
import UserCard from '../components/UserCard';
import { UserType } from '../types/User';
import Filters from '../components/Filters';
import { FiltersType } from '../types/types';

function Community() {
  const [filters, setFilters] = useState<FiltersType>({});
  const [users, setUsers] = useState<[]>([]);
  const [isVisibleFilters, setVisibleFilters] = useState<boolean>(false);

  const {
    /* error, */
    isLoading,
    isFetching,
    data,
  } = useInfiniteQuery(
    ['users', filters],
    ({ pageParam = 1 }) => getFilteredUsersList({ filters, pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.pageInfo.nextPage,
    }
  );

  useEffect(() => {
    // @ts-ignore
    setUsers(data?.pages.flatMap((page) => page.users) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pages.length, filters]);

  const applyFilters = (value: FiltersType) => {
    setFilters(value);
    setVisibleFilters(false);
  };

  const cleanFilter = () => {
    setFilters({});
  };

  // if (isLoading || isFetching) return 'Loading...';
  // if (error instanceof Error) return `An error has occurred: ${error.message}`;

  return (
    <div className="container flex flex-col gap-y-4 mx-auto px-6 box-content relative">
      <div className="flex flex-row gap-x-3 items-center mt-4">
        <button
          type="button"
          className="flex flex-row items-center w-min justify-center gap-x-2 button"
          onClick={() => setVisibleFilters(!isVisibleFilters)}
        >
          <IoFilter />
          Filters
        </button>
        {!isVisibleFilters && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button type="button" title="Reset Filters" onClick={cleanFilter}>
            <RxReset />
          </button>
        )}
      </div>
      {isVisibleFilters && (
        <div className="bg-white dark:bg-sky-blue-800 border dark:border-sky-blue-800 rounded-md">
          <Filters onSearch={applyFilters} filters={filters} />
        </div>
      )}
      {(isLoading || isFetching) && 'Loading...'}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 content-wrapper p-4 bg-white dark:bg-sky-blue-800 dark:bg-opacity-50 border dark:border-sky-blue-800 rounded-md">
        {users.map((user: UserType) => (
          // eslint-disable-next-line no-underscore-dangle
          <UserCard key={user._id} user={user} />
        ))}

        {/* {(mutation.error as Error) && !mutation.isLoading && (
          <div className="text-center text-gray-500 dark:text-white">
            No users found based on the current filters.
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Community;
