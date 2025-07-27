'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../components/UI/input';
import { Divider } from '../components/UI/divider';
import { Button } from '../components/UI/button';
import { Heading } from '../components/UI/heading';
import Link from 'next/link';
import axios from 'axios';

function EditPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [customerData, setCustomerData] = useState({
    id: '',
    name: '',
    number: '',
    email: '',
    address: '',
  });

  const id = searchParams.get('id'); // Get id from URL

  useEffect(() => {
    if (id) {
      // Fetch single customer by id from API
      axios.get(`http://localhost:5082/api/Customers/${id}`)
        .then(response => {
          setCustomerData(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch customer:', error);
          alert('Failed to load customer data');
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!customerData.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      await axios.put(`http://localhost:5082/api/Customers/${customerData.id}`, customerData);
      router.push('/'); // Redirect after save
    } catch (error) {
      console.error('Failed to update customer:', error);
      alert('Failed to save customer');
    }
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Edit Customer</Heading>
        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="name" className="w-20">Name</label>
          <Input
            id="name"
            size={150}
            name="name"
            value={customerData.name}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="phone" className="w-20">Phone</label>
          <Input
            id="phone"
            size={150}
            name="phone"
            value={customerData.number}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="email" className="w-20">Email</label>
          <Input
            id="email"
            size={150}
            name="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="address" className="w-20">Address</label>
          <Input
            id="address"
            size={150}
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button outline>
          <Link href="/">Go Back</Link>
        </Button>

        <Button outline onClick={handleSave}>
          Save Edit
        </Button>
      </div>
    </>
  );
}

export default function EditPage() {
  return (
    <Suspense>
      <EditPageInner />
    </Suspense>
  );
}
