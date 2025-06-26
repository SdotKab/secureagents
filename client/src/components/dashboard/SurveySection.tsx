'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthProvider';

type Asset = {
  id: string;
  name: string;
  category: string;
  created_at: string;
};

export default function SurveySection() {
  const { user } = useAuth();
  const router = useRouter();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('id, name, category, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) console.error('Fetch error:', error);
      else setAssets(data || []);

      setLoading(false);
    };

    fetchAssets();
  }, [user]);

  const groupedAssets = assets.reduce((acc, asset) => {
    if (!acc[asset.category]) acc[asset.category] = [];
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">🧾 Company Asset Survey</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.push('/survey')}
        >
          Start New Survey
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Keep your asset inventory up to date to improve risk analysis and security posture.
      </p>

      {loading ? (
        <p>Loading assets...</p>
      ) : assets.length === 0 ? (
        <p className="text-sm text-gray-500">No assets found. Start your first survey!</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedAssets).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-md font-semibold text-blue-700">{category}</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {items.slice(0, 3).map(asset => (
                  <li key={asset.id}>
                    {asset.name} <span className="text-xs text-gray-400">({new Date(asset.created_at).toLocaleDateString()})</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
