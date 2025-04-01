import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { User } from '@/core/users/types/models';
import UserForm from '@/shared/profile/components/form/UserForm';
import { useState } from 'react';
import useUsersListQuery from '../hooks/useUsersListQuery';
import Filters from './Filters';
import UsersTable from './UsersTable';

export default function Users() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useUsersListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  return (
    <>
      <HeaderPage
        titlePage="Usuários"
        search={search}
        setOpenFilter={setOpenFilter}
        setOpenForm={() => {
          setUser(undefined);
          setOpen(true);
        }}
      />
      <div className="mt-10 px-3">
        <UsersTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setUser={setUser}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      {open && <UserForm open={open} setOpen={setOpen} user={user} onSubmitForm={() => getList()} />}
    </>
  );
}
