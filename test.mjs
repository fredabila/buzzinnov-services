const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScg5-e1DD2WExWEB7QveupUwiV71xq103kobJ9n1J-22UbHMg/formResponse';
const formData = new URLSearchParams();
formData.append('entry.465284025', 'Test Name 3');
formData.append('entry.1870401402', 'test3@example.com');
formData.append('entry.542896209', 'Test Company');
formData.append('entry.1297757524', 'Web development');
formData.append('entry.1494542619', '500 - 2,000 pounds');

fetch(GOOGLE_FORM_ACTION_URL, {
  method: 'POST',
  body: formData,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}).then(async r => {
  const text = await r.text();
  if (text.includes('Your response has been recorded.')) {
     console.log('SUCCESS: Response recorded');
  } else {
     console.log('FAILED: Did not find success message');
  }
}).catch(console.error);
