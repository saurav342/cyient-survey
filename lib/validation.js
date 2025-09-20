// Validation utilities for dynamic survey forms

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Optional field
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateTextLength = (text, maxLength) => {
  if (!text) return true;
  return text.length <= maxLength;
};

export const validateRating = (rating) => {
  const num = parseInt(rating);
  return !isNaN(num) && num >= 1 && num <= 5;
};

// Dynamic validation based on question type
export const validateQuestion = (question, value) => {
  if (question.required && !validateRequired(value)) {
    return `${question.label} is required`;
  }

  if (!value || value === '') return null;

  switch (question.type) {
    case 'rating':
      if (!validateRating(value)) {
        return 'Please select a rating between 1 and 5';
      }
      break;
    
    case 'text_short':
    case 'text_long':
      if (question.maxLength && !validateTextLength(value, question.maxLength)) {
        return `Response must be ${question.maxLength} characters or less`;
      }
      break;
    
    case 'email':
      if (!validateEmail(value)) {
        return 'Please enter a valid email address';
      }
      break;
    
    case 'phone':
      if (!validatePhone(value)) {
        return 'Please enter a valid phone number';
      }
      break;
    
    case 'multi_select':
      if (Array.isArray(value) && question.maxSelections && value.length > question.maxSelections) {
        return `Please select no more than ${question.maxSelections} options`;
      }
      break;
  }

  return null;
};

// Validate entire survey response
export const validateSurveyResponse = (surveyConfig, responses) => {
  const errors = {};
  
  surveyConfig.questions.forEach(question => {
    const value = responses[question.id];
    const error = validateQuestion(question, value);
    if (error) {
      errors[question.id] = error;
    }
  });
  
  return errors;
};

// Get required questions count
export const getRequiredQuestionsCount = (surveyConfig) => {
  return surveyConfig.questions.filter(q => q.required).length;
};

// Get completed required questions count
export const getCompletedRequiredQuestionsCount = (surveyConfig, responses) => {
  const requiredQuestions = surveyConfig.questions.filter(q => q.required);
  return requiredQuestions.filter(q => validateRequired(responses[q.id])).length;
};

// Calculate completion percentage
export const getCompletionPercentage = (surveyConfig, responses) => {
  const totalRequired = getRequiredQuestionsCount(surveyConfig);
  const completedRequired = getCompletedRequiredQuestionsCount(surveyConfig, responses);
  return totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;
};
