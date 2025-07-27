'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../UI/table';
import { Button } from '../UI/button';
import  Link  from 'next/link';

type Customer = {
  id: string;
  name: string;
  number: string;
  email: string;
  address: string;
};

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
   
    <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Edit</TableHeader>
              <TableHeader>Details</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.number}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>
                  <Button>
                    <Link
                      href={{
                        pathname: '/edit',
                        query: { id: customer.id },
                      }}
                    >
                      Edit
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button>
                    <Link
                      href={{
                        pathname: '/details',
                        query: { id: customer.id }, // send id here
                      }}
                    >
                      Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
};

export default CustomerTable;
