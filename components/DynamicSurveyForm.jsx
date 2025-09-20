'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check,
  AlertCircle,
  Download,
  Mail,
  Star,
  Clock,
  Users,
  MapPin,
  Monitor,
  BookOpen,
  Rocket,
  GraduationCap,
  Code,
  Crown
} from 'lucide-react';
import { validateSurveyResponse, getCompletionPercentage } from '../lib/validation';
import { saveSurveyData, getSurveyData, clearSurveyData, hasSavedData } from '../lib/storage';
import { submitSurvey, sendEmailCopy } from '../lib/api';

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

const DynamicSurveyForm = ({ surveyConfig, onComplete }) => {
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load saved data on component mount
  useEffect(() => {
    if (hasSavedData(surveyConfig.id)) {
      const savedData = getSurveyData(surveyConfig.id);
      if (savedData && savedData.responses) {
        setResponses(savedData.responses);
      }
    }
  }, [surveyConfig.id]);

  // Auto-save responses
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      saveSurveyData(surveyConfig.id, responses);
    }
  }, [responses, surveyConfig.id]);

  const validateCurrentQuestion = useCallback(() => {
    const currentQuestion = surveyConfig.questions[currentQuestionIndex];
    const value = responses[currentQuestion.id];
    
    if (currentQuestion.required && !value) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: `${currentQuestion.label} is required` }));
      return false;
    }
    
    // Clear error when user provides a value
    if (errors[currentQuestion.id]) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: null }));
    }
    
    return true;
  }, [currentQuestionIndex, responses, errors, surveyConfig.questions]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: null }));
    }
  };

  const handleNext = () => {
    if (validateCurrentQuestion() && currentQuestionIndex < surveyConfig.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateSurveyResponse(surveyConfig, responses);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitSurvey(surveyConfig.id, responses);
      setShowSuccess(true);
      clearSurveyData(surveyConfig.id);
      if (onComplete) onComplete(result);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadData = () => {
    const dataStr = JSON.stringify({
      surveyId: surveyConfig.id,
      surveyTitle: surveyConfig.title,
      responses,
      submittedAt: new Date().toISOString()
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cyient-survey-${surveyConfig.id}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEmailCopy = async () => {
    try {
      await sendEmailCopy(responses.email || 'user@example.com', surveyConfig.id, responses);
      alert('Survey responses have been sent to your email!');
    } catch (error) {
      alert('Failed to send email copy. Please try again.');
    }
  };

  const renderQuestion = (question) => {
    const value = responses[question.id] || '';
    const error = errors[question.id];

    switch (question.type) {
      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleResponseChange(question.id, rating)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    value === rating
                      ? 'bg-corporate-blue text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  aria-label={`Rate ${rating}`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            aria-describedby={error ? `${question.id}-error` : undefined}
          >
            <option value="">Select an option</option>
            {question.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="h-4 w-4 text-corporate-blue focus:ring-corporate-blue border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleResponseChange(question.id, newValues);
                  }}
                  className="h-4 w-4 text-corporate-blue focus:ring-corporate-blue border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multi_select':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleResponseChange(question.id, newValues);
                  }}
                  className="h-4 w-4 text-corporate-blue focus:ring-corporate-blue border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{option}</span>
              </label>
            ))}
            {question.maxSelections && (
              <p className="text-sm text-gray-500 mt-2">
                Select up to {question.maxSelections} options
              </p>
            )}
          </div>
        );

      case 'text_short':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            placeholder="Enter your response"
            maxLength={question.maxLength}
            aria-describedby={error ? `${question.id}-error` : undefined}
          />
        );

      case 'text_long':
        return (
          <textarea
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            rows="4"
            maxLength={question.maxLength}
            placeholder="Enter your response"
            aria-describedby={error ? `${question.id}-error` : `${question.id}-hint`}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            placeholder="your.email@example.com"
            aria-describedby={error ? `${question.id}-error` : undefined}
          />
        );

      case 'phone':
        return (
          <input
            type="tel"
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            placeholder="+1 (555) 123-4567"
            aria-describedby={error ? `${question.id}-error` : undefined}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className={`input-field ${error ? 'input-error' : ''}`}
            placeholder="Enter your response"
            aria-describedby={error ? `${question.id}-error` : undefined}
          />
        );
    }
  };

  const renderProgressBar = () => {
    const totalQuestions = surveyConfig.questions.length;
    const currentQuestion = currentQuestionIndex + 1;
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderNavigation = () => (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentQuestionIndex === 0}
        className="btn-secondary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </button>
      
      <div className="text-sm text-gray-500">
        <button
          type="button"
          onClick={() => saveSurveyData(surveyConfig.id, responses)}
          className="text-corporate-blue hover:text-corporate-teal"
        >
          Save Progress
        </button>
      </div>
      
      {currentQuestionIndex < surveyConfig.questions.length - 1 ? (
        <button
          type="button"
          onClick={handleNext}
          className="btn-primary inline-flex items-center"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="btn-primary inline-flex items-center"
        >
          Review & Submit
        </button>
      )}
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Your feedback has been successfully submitted. We value your input and will use it to improve our future events and programs.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={handleDownloadData}
          className="btn-primary inline-flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download My Responses
        </button>
        
        <button
          onClick={handleEmailCopy}
          className="btn-secondary inline-flex items-center ml-4"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Me My Responses
        </button>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Your feedback helps us create better experiences for everyone.
      </p>
    </div>
  );

  if (showSuccess) {
    return renderSuccessScreen();
  }

  const currentQuestion = surveyConfig.questions[currentQuestionIndex];
  const IconComponent = iconMap[surveyConfig.icon] || Users;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-corporate-blue bg-opacity-10 rounded-full mb-4">
            <IconComponent className="w-8 h-8 text-corporate-blue" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {surveyConfig.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {surveyConfig.description}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-corporate-blue to-corporate-teal mx-auto rounded-full"></div>
        </div>

        {/* Main Form */}
        <div className="card">
          {renderProgressBar()}
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentQuestion.label}
              {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
            </h2>
            
            <div className="mt-6">
              {renderQuestion(currentQuestion)}
            </div>
            
            {errors[currentQuestion.id] && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors[currentQuestion.id]}
              </p>
            )}
            
            {currentQuestion.maxLength && (
              <p className="mt-2 text-sm text-gray-500">
                {responses[currentQuestion.id]?.length || 0}/{currentQuestion.maxLength} characters
              </p>
            )}
          </div>

          {renderNavigation()}
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Responses</h3>
              <p className="text-gray-600 mb-6">
                Please review your responses before submitting. You can go back to make changes if needed.
              </p>
              
              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                {surveyConfig.questions.map((question) => {
                  const value = responses[question.id];
                  if (!value) return null;
                  
                  return (
                    <div key={question.id} className="py-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {question.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="btn-secondary"
                >
                  Back to Edit
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
              
              {errors.submit && (
                <p className="mt-4 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.submit}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicSurveyForm;
