'use client';
import React from 'react';
import { Input } from '../UI/input';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Search by any field..."
      name="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchField;