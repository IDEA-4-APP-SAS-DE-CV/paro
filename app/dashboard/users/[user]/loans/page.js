
'use server';
import { montserrat } from '../../../../ui/fonts';
import { fetchLoansByUser, fetchUserById } from '../../../../lib/data';
import { Chip } from "@nextui-org/react";
import { formatCurrency } from '../../../../lib/utils';
import SwitchStatus from '../../../components/switchStatus';

export default async function Page({params}) {

    const loans = await fetchLoansByUser(params.user);
    
    return <div className="w-full">
        <h1 className={`${montserrat.className} mb-8 text-xl md:text-2xl`}>
            Loans
        </h1>
        <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Dia de creación
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Balance disponible
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Monto
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Estatus
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                    </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                    {loans.map((loan) => (
                        <tr key={loan.loandid} className="group">
                            <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                            <div className="flex items-center gap-3">
                                <p>{loan.createdat}</p>
                            </div>
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {formatCurrency(loan.avilablebalance)}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {formatCurrency(loan.amount)}
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                {
                                    loan.status === 'approved' && <Chip
                                    variant="faded"
                                    color="success"
                                  >
                                    {loan.status}
                                    </Chip> ||
                                    <Chip color="danger">{loan.status}</Chip>
                                }
                            </td>
                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                <SwitchStatus loan={loan.loandid} status={loan.status} creditLineId={loan.creditline_id} />
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
  } 