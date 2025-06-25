'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    company_name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    contact_name: '',
    contact_title: '',
    contact_email: '',
    contact_phone: '',
    contact_ext: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Optional: Store company profile to a "companies" table
    // Insert form data to Supabase after signUp confirmation

    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Company Account</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="company_name" placeholder="Company Name" onChange={handleChange} className="input" />
          <input name="phone" placeholder="Company Phone" onChange={handleChange} className="input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="address" placeholder="Street Address" onChange={handleChange} className="input" />
          <input name="city" placeholder="City" onChange={handleChange} className="input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="state" placeholder="State" onChange={handleChange} className="input" />
          <input name="zipcode" placeholder="Zipcode" onChange={handleChange} className="input" />
        </div>
        <hr />
        <h2 className="text-lg font-semibold">Contact Person</h2>
        <input name="contact_name" placeholder="Full Name" onChange={handleChange} className="input" />
        <input name="contact_title" placeholder="Job Title" onChange={handleChange} className="input" />
        <input name="contact_email" placeholder="Email" onChange={handleChange} className="input" />
        <div className="grid grid-cols-2 gap-4">
          <input name="contact_phone" placeholder="Phone Number" onChange={handleChange} className="input" />
          <input name="contact_ext" placeholder="Extension" onChange={handleChange} className="input" />
        </div>
        <hr />
        <h2 className="text-lg font-semibold">Login Credentials</h2>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="input" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="input" />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
