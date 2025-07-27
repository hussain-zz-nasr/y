'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/UI/button';
import { Heading } from '../components/UI/heading';
import { Divider } from '../components/UI/divider';
import { Input } from '../components/UI/input';
import axios from 'axios';

export default function AddPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('customers');
      stored ? JSON.parse(stored) : [];
      
        formData.name,
        formData.number,
        formData.email,
        formData.address,
      

      console.log(formData);
      await  axios.post('http://localhost:5082/api/Customers', formData);
      router.push('/');
    }
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Add a New Customer</Heading>
        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="name" className="w-20">
            Name
          </label>
          <Input
            id="name"
            size={150}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="number" className="w-20">
            Number
          </label>
          <Input
            id="number"
            size={150}
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="email" className="w-20">
            Email
          </label>
          <Input
            id="email"
            size={150}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="flex gap-4 items-center">
          <label htmlFor="address" className="w-20">
            Address
          </label>
          <Input
            id="address"
            size={150}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button outline>
          <Link href="/">Go Back</Link>
        </Button>

        <Button outline onClick={handleAdd}>
          Add
        </Button>
      </div>
    </>
  );
}
