import { NextResponse } from 'next/server';
import { getAllSurveyTypes } from '@/lib/surveys';

export async function GET(request) {
  try {
    const surveys = getAllSurveyTypes();
    
    // Return simplified survey list for selection
    const surveyList = surveys.map(survey => ({
      id: survey.id,
      title: survey.title,
      description: survey.description,
      icon: survey.icon,
      color: survey.color,
      questionsCount: survey.questions.length,
      requiredQuestionsCount: survey.questions.filter(q => q.required).length
    }));
    
    return NextResponse.json({
      success: true,
      data: surveyList,
      count: surveyList.length
    });
    
  } catch (error) {
    console.error('Surveys fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
