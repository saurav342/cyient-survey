// Local storage utilities for saving survey progress

const STORAGE_PREFIX = 'cyient_survey_';

export const saveSurveyData = (surveyId, responses) => {
  try {
    const key = `${STORAGE_PREFIX}${surveyId}`;
    const data = {
      responses,
      lastSaved: new Date().toISOString(),
      surveyId
    };
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving survey data:', error);
    return false;
  }
};

export const getSurveyData = (surveyId) => {
  try {
    const key = `${STORAGE_PREFIX}${surveyId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving survey data:', error);
    return null;
  }
};

export const clearSurveyData = (surveyId) => {
  try {
    const key = `${STORAGE_PREFIX}${surveyId}`;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing survey data:', error);
    return false;
  }
};

export const hasSavedData = (surveyId) => {
  const data = getSurveyData(surveyId);
  return data && data.responses && Object.keys(data.responses).length > 0;
};

export const getLastSavedTime = (surveyId) => {
  const data = getSurveyData(surveyId);
  return data && data.lastSaved ? new Date(data.lastSaved) : null;
};

export const getAllSavedSurveys = () => {
  try {
    const surveys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.surveyId) {
          surveys.push({
            surveyId: data.surveyId,
            lastSaved: data.lastSaved,
            responsesCount: Object.keys(data.responses || {}).length
          });
        }
      }
    }
    return surveys;
  } catch (error) {
    console.error('Error getting saved surveys:', error);
    return [];
  }
};
