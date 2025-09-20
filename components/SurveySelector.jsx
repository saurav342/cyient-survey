'use client';

import React, { useState } from 'react';
import { 
  GraduationCap,
  MapPin,
  Monitor,
  BookOpen,
  Rocket,
  Users,
  Code,
  Crown,
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import { getAllSurveyTypes } from '../lib/surveys';
import { getAllSavedSurveys } from '../lib/storage';

const iconMap = {
  GraduationCap,
  MapPin,
  Monitor,
  BookOpen,
  Rocket,
  Users,
  Code,
  Crown
};

const colorMap = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  teal: 'bg-teal-50 border-teal-200 text-teal-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  green: 'bg-green-50 border-green-200 text-green-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  red: 'bg-red-50 border-red-200 text-red-800',
  amber: 'bg-amber-50 border-amber-200 text-amber-800'
};

const SurveySelector = ({ onSurveySelect }) => {
  const [savedSurveys, setSavedSurveys] = useState([]);
  const [showSavedSurveys, setShowSavedSurveys] = useState(false);

  React.useEffect(() => {
    const saved = getAllSavedSurveys();
    setSavedSurveys(saved);
  }, []);

  const surveys = getAllSurveyTypes();

  const handleSurveyClick = (survey) => {
    onSurveySelect(survey);
  };

  const handleResumeSurvey = (surveyId) => {
    onSurveySelect({ id: surveyId });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cyient Feedback Platform
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Share your experience and help us improve our events and programs
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-corporate-blue to-corporate-teal mx-auto rounded-full"></div>
        </div>

        {/* Saved Surveys Section */}
        {savedSurveys.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Continue Your Surveys</h2>
              <button
                onClick={() => setShowSavedSurveys(!showSavedSurveys)}
                className="text-corporate-blue hover:text-corporate-teal font-medium"
              >
                {showSavedSurveys ? 'Hide' : 'Show'} ({savedSurveys.length})
              </button>
            </div>
            
            {showSavedSurveys && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {savedSurveys.map((saved) => {
                  const survey = surveys.find(s => s.id === saved.surveyId);
                  if (!survey) return null;
                  
                  const IconComponent = iconMap[survey.icon] || Users;
                  
                  return (
                    <div
                      key={saved.surveyId}
                      onClick={() => handleResumeSurvey(saved.surveyId)}
                      className="card cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${colorMap[survey.color]}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{survey.title}</h3>
                            <p className="text-sm text-gray-500">
                              {saved.responsesCount} responses saved
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Last saved: {new Date(saved.lastSaved).toLocaleDateString()}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Available Surveys */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Surveys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => {
              const IconComponent = iconMap[survey.icon] || Users;
              const isSaved = savedSurveys.some(s => s.surveyId === survey.id);
              
              return (
                <div
                  key={survey.id}
                  onClick={() => handleSurveyClick(survey)}
                  className={`card cursor-pointer hover:shadow-lg transition-all duration-200 ${
                    isSaved ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorMap[survey.color]}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {isSaved && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {survey.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {survey.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {survey.questions.length} questions
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Your feedback helps us create better experiences for everyone.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            All responses are confidential and used solely for improvement purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveySelector;
