import { NextResponse } from 'next/server';
import { getSurveyConfig } from '@/lib/surveys';
import { validateSurveyResponse } from '@/lib/validation';

export async function POST(request) {
  try {
    const { surveyId, responses } = await request.json();
    
    if (!surveyId || !responses) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Survey ID and responses are required' 
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
    
    // Server-side validation
    const errors = validateSurveyResponse(surveyConfig, responses);
    
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors 
        },
        { status: 400 }
      );
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock submission ID
    const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock successful submission
    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully',
      submissionId,
      surveyId,
      surveyTitle: surveyConfig.title,
      submittedAt: new Date().toISOString(),
      responsesCount: Object.keys(responses).length,
      data: {
        surveyId,
        surveyTitle: surveyConfig.title,
        responses,
        submittedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
