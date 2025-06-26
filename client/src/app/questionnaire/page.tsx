// src/app/questionnaire/page.tsx (Final Submission with Report Save)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/lib/supabase';
import LikertQuestion from '@/components/questionnaire/LikertQuestion';
import { questionnaire } from '@/data/questionnaire';

interface Answer {
  questionId: string;
  category: string;
  value: number;
}

export default function QuestionnairePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (questionId: string, category: string, value: number) => {
    setAnswers(prev => {
      const updated = prev.filter(a => a.questionId !== questionId);
      return [...updated, { questionId, category, value }];
    });
  };

  const calculateRiskScore = (answers: Answer[]) => {
    const grouped = answers.reduce((acc, answer) => {
      acc[answer.category] = acc[answer.category] || [];
      acc[answer.category].push(6 - answer.value);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(grouped).map(([category, scores]) => ({
      category,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    const riskSummary = calculateRiskScore(answers);

    const { error } = await supabase.from('reports').insert({
      user_id: user.id,
      risk_summary: riskSummary,
      full_answers: answers,
      created_at: new Date().toISOString(),
    });

    if (error) console.error('Save report error:', error);
    else router.push('/dashboard');

    setSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Security Questionnaire</h1>
      <div className="space-y-8">
        {questionnaire.map(category => (
          <div key={category.name}>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{category.name}</h2>
            <div className="space-y-4">
              {category.questions.map(q => (
                <LikertQuestion
                  key={q.id}
                  id={q.id}
                  category={category.name}
                  question={q.text}
                  value={answers.find(a => a.questionId === q.id)?.value || 0}
                  onChange={handleAnswer}
                />
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? 'Submitting...' : 'Submit Assessment'}
        </button>
      </div>
    </div>
  );
}
