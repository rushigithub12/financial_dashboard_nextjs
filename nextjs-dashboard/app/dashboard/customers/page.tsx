import Pagination from '@/app/ui/invoices/pagination';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}
