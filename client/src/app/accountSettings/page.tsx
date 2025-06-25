'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export default function AccountSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({
    contact_name: '',
    contact_title: '',
    contact_phone: '',
    contact_email: ''
  });

  useEffect(() => {
    if (user) {
      fetchCompanyData();
    }
  }, [user]);

  async function fetchCompanyData() {
    setLoading(true);
    const { data, error } = await supabase
      .from('companies')
      .select('contact_name, contact_title, contact_phone, contact_email')
      .eq('user_id', user?.id)
      .single();

    if (error) {
      console.error(error);
      toast.error('Failed to load company info');
    } else {
      setCompanyData(data);
    }

    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  }

  async function handleUpdate() {
    const { error } = await supabase
      .from('companies')
      .update(companyData)
      .eq('user_id', user?.id);

    if (error) {
      console.error(error);
      toast.error('Failed to update');
    } else {
      toast.success('Company contact info updated');
    }
  }

  async function handlePasswordReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(user?.email || '');

    if (error) {
      toast.error('Password reset failed');
    } else {
      toast.success('Password reset email sent');
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h1>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-blue-700">Auth Info</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Email</label>
          <input
            className="input"
            type="email"
            value={user?.email || ''}
            readOnly
          />
        </div>
        <button
          onClick={handlePasswordReset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send Password Reset Email
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-blue-700">Company Contact Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="contact_name"
            placeholder="Contact Name"
            value={companyData.contact_name}
            onChange={handleChange}
          />
          <input
            className="input"
            name="contact_title"
            placeholder="Contact Title"
            value={companyData.contact_title}
            onChange={handleChange}
          />
          <input
            className="input"
            name="contact_phone"
            placeholder="Contact Phone"
            value={companyData.contact_phone}
            onChange={handleChange}
          />
          <input
            className="input"
            name="contact_email"
            placeholder="Contact Email"
            value={companyData.contact_email}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
