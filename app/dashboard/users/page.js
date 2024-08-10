import Image from 'next/image';
import { montserrat } from '../../ui/fonts';
import Search from '@/app/ui/search';
import { fetchUsers } from '../../lib/data';
import ActionButtons from '../components/actionButtons'

export default async function UsersTable() {
  const users = await fetchUsers();

  // const { id, name, lastname, mail, phone, birth, clabe, role, accountstatuslink, addressfilelink, inelink, createdat } = users;

  return (
    <div className="w-full">
      <h1 className={`${montserrat.className} mb-8 text-xl md:text-2xl`}>
        Users
      </h1>
      <Search placeholder="Search Users..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {users?.map((user) => (
                  <div
                    key={user.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            Image User
                            <p>{user.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{user.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{user.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{user.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Apellidos
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Teléfono
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      createdat
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {users.map((user) => (
                    <tr key={user.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{user.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.lastname}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.mail}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.phone}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {user.createdat}
                      </td>
                      <td className="flex whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                          <ActionButtons userId={user.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}