'use client';

import { useState } from 'react';
import SurveySelector from '../components/SurveySelector';
import DynamicSurveyForm from '../components/DynamicSurveyForm';
import { getSurveyConfig } from '../lib/surveys';

export default function Home() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSurveyComplete = (result) => {
    console.log('Survey completed:', result);
    // You can add additional logic here, like analytics tracking
  };

  const handleBackToSelector = () => {
    setSelectedSurvey(null);
  };

  if (selectedSurvey) {
    const surveyConfig = getSurveyConfig(selectedSurvey.id);
    if (!surveyConfig) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Found</h1>
            <button
              onClick={handleBackToSelector}
              className="btn-primary"
            >
              Back to Survey Selection
            </button>
          </div>
        </div>
      );
    }

    return (
      <DynamicSurveyForm 
        surveyConfig={surveyConfig} 
        onComplete={handleSurveyComplete}
      />
    );
  }

  return (
    <SurveySelector onSurveySelect={handleSurveySelect} />
  );
}
