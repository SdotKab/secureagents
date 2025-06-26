'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const categories = [
  "Hardware Assets",
  "Software Assets",
  "Data Assets",
  "Network Assets",
  "Users and Access Controls",
  "Policies and Documentation",
  "Other Intangible Assets"
];

export default function SurveyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // initialize formData with 2 empty inputs per category
    const initial = Object.fromEntries(categories.map(c => [c, ['', '']]));
    setFormData(initial);
  }, []);

  const handleChange = (category: string, index: number, value: string) => {
    const updated = [...formData[category]];
    updated[index] = value;
    setFormData(prev => ({ ...prev, [category]: updated }));
  };

  const handleAddField = (category: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);

    const entries = Object.entries(formData).flatMap(([category, names]) =>
      names
        .filter(name => name.trim() !== '')
        .map(name => ({
          user_id: user.id,
          name,
          category,
          created_at: new Date().toISOString()
        }))
    );

    const { error } = await supabase.from('assets').insert(entries);

    if (error) {
      console.error('Insert error:', error);
      alert('Error saving assets');
    } else {
      alert('Assets saved!');
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Asset Identification Survey</h1>
      <p className="text-gray-600 mb-2">
        Understanding your assets is the first step toward securing them. This survey helps identify the hardware, software, data, and other digital resources your company uses.
      </p>
      <p className="text-gray-600 mb-8">
        Accurate asset inventory helps reduce vulnerabilities, improve incident response, and meet compliance standards.
      </p>

      {categories.map(category => (
        <div key={category} className="mb-6">
          <h2 className="font-semibold text-lg text-blue-700 mb-2">{category}</h2>
          {formData[category]?.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={e => handleChange(category, index, e.target.value)}
              placeholder="Enter asset name"
              className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField(category)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Another
          </button>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : 'Submit Survey'}
      </button>
    </div>
  );
}
