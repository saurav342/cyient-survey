import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, surveyId, responses } = await request.json();
    
    if (!email || !surveyId || !responses) {
      return NextResponse.json(
        { success: false, error: 'Email, survey ID, and responses are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock email ID
    const emailId = `EMAIL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return NextResponse.json({
      success: true,
      message: 'Email copy sent successfully',
      emailId,
      recipient: email,
      surveyId,
      sentAt: new Date().toISOString(),
      subject: `Your Cyient Survey Responses - ${surveyId}`,
      preview: `Dear participant, thank you for your feedback. Here are your survey responses for ${surveyId}...`
    });
    
  } catch (error) {
    console.error('Email copy error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email copy' },
      { status: 500 }
    );
  }
}
