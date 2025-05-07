import { User } from '@/core/users/types/models';
import UserForm from '@/shared/profile/components/form/UserForm';
import { useState } from 'react';
import useUsersListQuery from '../hooks/useUsersListQuery';
import Filters from './Filters';
import UsersTable from './UsersTable';
import HeaderPage from '@/components/customized/HeaderPage/HeaderPage';

export default function Users() {
  const { getList, list, setPagination, loading, status, setStatus, search, sorting, setSorting } = useUsersListQuery();
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
      <div>
        <UsersTable
          list={list}
          setPagination={setPagination}
          loading={loading}
          setUser={setUser}
          setOpen={setOpen}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      {open && <UserForm open={open} setOpen={setOpen} user={user} onSubmitForm={() => getList()} />}
    </>
  );
}
