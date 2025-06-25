'use client';

import AssessmentDashboard from "@/components/dashboard/AssessmentDashboard";
import AssessmentReportsSection from "@/components/dashboard/AssessmentReportSection";
import LiveFeedSection from "@/components/dashboard/LiveFeedSection";
import QuestionnaireSection from "@/components/dashboard/QuestionnaireSection";
import RecommendationsSection from "@/components/dashboard/RecommendationsSection";
import SurveySection from "@/components/dashboard/SurveySection";
import DashboardLayout from "@/components/layout/DashboardLayout";


export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 px-4 md:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back to your security dashboard</h1>

        <AssessmentDashboard />
        <SurveySection />
        <QuestionnaireSection />
        <LiveFeedSection />
        <AssessmentReportsSection />
        <RecommendationsSection />

        {/* AI Assistant will go here later */}
      </div>
    </DashboardLayout>
  );
}
