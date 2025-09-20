import { NextResponse } from 'next/server';
import { getSurveyConfig } from '../../../../../lib/surveys';

export async function GET(request, { params }) {
  try {
    const { surveyId } = params;
    
    if (!surveyId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Survey ID is required' 
        },
        { status: 400 }
      );
    }
    
    // Get survey configuration
    const surveyConfig = getSurveyConfig(surveyId);
    
    if (!surveyConfig) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Survey not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: surveyConfig
    });
    
  } catch (error) {
    console.error('Survey config error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
