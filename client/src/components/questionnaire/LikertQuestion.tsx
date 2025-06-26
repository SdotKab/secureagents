interface LikertQuestionProps {
  id: string;
  category: string;
  question: string;
  value: number;
  onChange: (id: string, category: string, value: number) => void;
}

export default function LikertQuestion({ id, category, question, value, onChange }: LikertQuestionProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-medium text-gray-700 mb-2">{question}</p> {/* ← This line must exist */}
      <div className="flex justify-between text-sm text-gray-600">
        {[1, 2, 3, 4, 5].map(num => (
          <label key={num} className="flex flex-col items-center">
            <input
              type="radio"
              name={id}
              value={num}
              checked={value === num}
              onChange={() => onChange(id, category, num)}
              className="mb-1"
            />
            {num}
          </label>
        ))}
      </div>
    </div>
  );
}
