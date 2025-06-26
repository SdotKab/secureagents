'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthProvider';

interface Asset {
  id: number;
  name: string;
  category: string;
  user_id: string;
  created_at?: string;
}

export default function AssetReviewSection() {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAssets = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching assets:', error);
      } else {
        setAssets(data || []);
      }

      setLoading(false);
    };

    fetchAssets();
  }, [user]);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this asset?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting asset:', error);
    } else {
      setAssets(prev => prev.filter(asset => asset.id !== id));
    }
  };

  const grouped = assets.reduce((acc, asset) => {
    if (!acc[asset.category]) acc[asset.category] = [];
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🔍 Review Your Assets</h2>
      {loading ? (
        <p>Loading assets...</p>
      ) : assets.length === 0 ? (
        <p className="text-gray-500">No assets submitted yet.</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-bold text-blue-700 mb-2">{category}</h3>
            <ul className="space-y-2">
              {items.map(asset => (
                <li
                  key={asset.id}
                  className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50"
                >
                  <span>{asset.name}</span>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
