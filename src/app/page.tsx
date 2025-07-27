'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './components/UI/button';
import { Heading } from './components/UI/heading';
import { Divider } from './components/UI/divider';
import axios from 'axios';
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from './components/UI/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomerTable from './components/customer/CustomerTable';
import SearchField from './components/customer/searchfield';

type Customer = {
  id: string;
  name: string;
  number: string;
  email: string;
  address: string;
};

import { Suspense } from 'react';

function HomeClient() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    setCurrentPage(pageFromUrl ? parseInt(pageFromUrl) : 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5082/api/Customers?page=${currentPage}&pageSize=${pageSize}`
        );
        const { customers, totalPages } = response.data;
        setCustomers(customers);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    

    fetchCustomers();
  }, [currentPage]);

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some(
      (field) =>
        typeof field === 'string' &&
        field.toLowerCase().includes(search.toLowerCase())
    )
  );
 
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };



  
  return (
    <> 
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Customer List</Heading>
        <Divider />

        <div className="flex gap-4">
          <SearchField value={search} onChange={setSearch} />
          <Button outline>
            <Link href="/add">Add</Link>
          </Button>
        </div>
      </div>

      <CustomerTable customers={filteredCustomers} />

      <Pagination>
        <PaginationPrevious
          href={`?page=${currentPage - 1}`}
          aria-disabled={currentPage <= 1}
        >
          <button
            disabled={currentPage <= 1}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) goToPage(currentPage - 1);
            }}
            className="w-full h-full"
          >
            Previous
          </button>
        </PaginationPrevious>

        <PaginationList>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationPage
              key={index}
              href={`?page=${index + 1}`}
              current={currentPage === index + 1}
            >
              <button
                className="w-full h-full"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(index + 1);
                }}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            </PaginationPage>
          ))}
          {totalPages > 5 && <PaginationGap />}
        </PaginationList>

        <PaginationNext
          href={`?page=${currentPage + 1}`}
          aria-disabled={currentPage >= totalPages}
        >
          <button
            disabled={currentPage >= totalPages}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) goToPage(currentPage + 1);
            }}
            className="w-full h-full"
          >
            Next
          </button>
        </PaginationNext>
      </Pagination>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <HomeClient />
    </Suspense>
  );
}
