'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';

const CompanyProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    company_name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    contact_name: '',
    contact_title: '',
    contact_phone: '',
    contact_email: '',
    num_employees: '',
    departments: '',
    products:'',
    industry:'',
    regions: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) setFormData(data);
      if (error) console.error('Fetch error:', error);
    };

    fetchProfile();
  }, [user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from('company_profiles')
      .upsert({ ...formData, user_id: user.id }, { onConflict: 'user_id' });

    if (error) console.error('Save error:', error);
    else alert('Profile saved!');

    setLoading(false);
  };

  return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Company Profile</h1>

        <div className="space-y-6">

          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" />
              <input className="input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Company Phone" />
              <input className="input" name="num_employees" value={formData.num_employees} onChange={handleChange} placeholder="Number of Employees" />
              <input className="input" name="departments" value={formData.departments} onChange={handleChange} placeholder="Departments" />
              <input className="input" name="products" value={formData.products} onChange={handleChange} placeholder="Products" />
              <input className="input" name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" />
              <input className="input" name="regions" value={formData.regions} onChange={handleChange} placeholder="Regions / Locations" />
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Company Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" />
              <input className="input" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
              <input className="input" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
              <input className="input" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zip Code" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Primary Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" name="contact_name" value={formData.contact_name} onChange={handleChange} placeholder="Contact Name" />
              <input className="input" name="contact_title" value={formData.contact_title} onChange={handleChange} placeholder="Contact Title" />
              <input className="input" name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Contact Phone" />
              <input className="input" name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="Contact Email" />
            </div>
          </div>

        </div>


        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
  );
};

export default CompanyProfilePage;
