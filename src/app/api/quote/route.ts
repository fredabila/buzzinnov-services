import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScg5-e1DD2WExWEB7QveupUwiV71xq103kobJ9n1J-22UbHMg/formResponse';
    
    // Map frontend values to exact Google Form expected string values
    const budgetMap: Record<string, string> = {
      '500-2k': '500 - 2,000 pounds',
      '2k-5k': '2,000 - 5,000 pounds',
      '5k-15k': '5,000 - 15,000 pounds',
      '15k+': '15,000+ pounds',
    };

    const serviceMap: Record<string, string> = {
      'Web Development': 'Web development',
      'UI/UX Design': 'UI/UX Design',
      'Custom Software': 'Product Design', // Maps Custom Software to the existing Google Form 'Product Design' field
      'Consultancy': 'Consultancy',
    };

    const formData = new URLSearchParams();
    formData.append('entry.465284025', data.name || '');
    formData.append('entry.1870401402', data.email || '');
    formData.append('entry.542896209', data.company || '');
    formData.append('entry.1297757524', serviceMap[data.serviceType] || data.serviceType || '');
    formData.append('entry.1494542619', budgetMap[data.budget] || data.budget || '');
    
    // Note: Project brief was in the UI but the Google Form doesn't have a field for it.
    // If you add one later, add it here like: formData.append('entry.YOUR_ID', data.description);

    const response = await fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    const responseText = await response.text();
    
    // Google Forms returns a 200 OK HTML page on success, but we must check the content
    if ((response.ok || response.status === 200) && responseText.includes('Your response has been recorded.')) {
      return NextResponse.json({ success: true, message: 'Quote request submitted to Google Forms.' });
    } else {
      console.error('Google Forms submission failed validation or returned unexpected response:', response.status, responseText.substring(0, 500));
      return NextResponse.json({ success: false, message: 'Failed to submit to Google Forms due to validation error.' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
