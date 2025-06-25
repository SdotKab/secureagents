import { ShieldCheckIcon, CursorArrowRaysIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="space-y-24">
      
      {/* Jumbotron */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Secure Your Business with Confidence</h1>
        <p className="text-lg text-gray-600 mb-6">
          Perform detailed cybersecurity assessments and receive expert insights.
        </p>
        <a
          href="/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
        >
          Get Started Free
        </a>
      </section>

      {/* Live Threat Feed */}
      <section className="bg-white shadow-sm p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2">🛡️ Live Threat Feed</h2>
        <p className="text-gray-500">(Live updates will appear here soon — coming soon...)</p>
      </section>

      {/* Security Counter */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-3xl font-bold text-blue-600">1,200+</h3>
          <p className="text-gray-600">Daily Incidents</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-red-500">740+</h3>
          <p className="text-gray-600">Daily Threats</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-orange-500">$1.6M</h3>
          <p className="text-gray-600">Avg Daily Financial Loss</p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-700">
          We help small and mid-sized businesses assess their cybersecurity posture through guided asset discovery, AI-driven questionnaires, and expert recommendations. Our goal is to help every organization protect what matters most.
        </p>
      </section>

      {/* Free Assessment & Services */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <ShieldCheckIcon className="w-10 h-10 mx-auto text-blue-600" />
          <h3 className="text-xl font-semibold mt-4">Free Risk Self-Assessment</h3>
          <p className="text-gray-600 text-sm mt-2">Understand where your organization stands and what to improve.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <CpuChipIcon className="w-10 h-10 mx-auto text-green-600" />
          <h3 className="text-xl font-semibold mt-4">AI-Powered Insights</h3>
          <p className="text-gray-600 text-sm mt-2">Our assistant generates tailored recommendations using real inputs.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <CursorArrowRaysIcon className="w-10 h-10 mx-auto text-purple-600" />
          <h3 className="text-xl font-semibold mt-4">Expert Services</h3>
          <p className="text-gray-600 text-sm mt-2">Pen testing, legacy upgrades, employee training, and more.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your security?</h2>
        <a
          href="/signup"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
        >
          Join SecureAgents Now
        </a>
      </section>
    </div>
  );
}
