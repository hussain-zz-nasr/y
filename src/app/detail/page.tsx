'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '../components/UI/input';
import { Divider } from '../components/UI/divider';
import { Button } from '../components/UI/button';
import { Heading } from '../components/UI/heading';
import Link from 'next/link';
import axios from 'axios';



function DetailsPageInner() {
  const searchParams = useSearchParams();

  const [customerData, setCustomerData] = useState({
    id: '',
    name: '',
    number: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5082/api/Customers/${id}`);
        // Assuming response.data is the customer object { id, name, phone, email, address }
        setCustomerData(response.data);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    };

    fetchCustomer();
  }, [searchParams]);

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Customer Details</Heading>
        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="name" className="w-20">Name</label>
          <Input id="name" size={150} name="name" value={customerData.name} disabled />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="phone" className="w-20">Phone</label>
          <Input id="phone" size={150} name="phone" value={customerData.number} disabled />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="email" className="w-20">Email</label>
          <Input id="email" size={150} name="email" value={customerData.email} disabled />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="address" className="w-20">Address</label>
          <Input id="address" size={150} name="address" value={customerData.address} disabled />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button outline>
          <Link href="/">Go Back</Link>
        </Button>

        <Button outline>
          <Link
            href={{
              pathname: '/edit',
              query: { id: customerData.id },
            }}
          >
            Edit
          </Link>
        </Button>
      </div>
    </>
  );
}

export default function DetailsPage() {
  return (
    <Suspense>
      <DetailsPageInner />
    </Suspense>
  );
}
