// API utilities for survey submission

const API_BASE_URL = '/api';

export const submitSurvey = async (surveyId, responses) => {
  try {
    const response = await fetch(`${API_BASE_URL}/survey/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ surveyId, responses }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Submission failed');
    }

    return result;
  } catch (error) {
    console.error('Survey submission error:', error);
    throw error;
  }
};

export const getSurveyConfig = async (surveyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/survey/config/${surveyId}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch survey config');
    }

    return result;
  } catch (error) {
    console.error('Survey config error:', error);
    throw error;
  }
};

export const getAllSurveys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/surveys`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch surveys');
    }

    return result;
  } catch (error) {
    console.error('Surveys fetch error:', error);
    throw error;
  }
};

export const sendEmailCopy = async (email, surveyId, responses) => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, surveyId, responses }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Email sending failed');
    }

    return result;
  } catch (error) {
    console.error('Email copy error:', error);
    throw error;
  }
};
