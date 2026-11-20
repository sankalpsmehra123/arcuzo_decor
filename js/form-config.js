// ── Arcuzo Decor Enquiry Form Configuration ──────────────────────────
// Paste your Google Apps Script Web App URL below (it ends with /exec).
//
// How to get this URL:
// 1. In your Google Sheet, open Extensions > Apps Script.
// 2. Paste the script and click "Save".
// 3. Click "Deploy" > "New deployment" > Select type: "Web app".
// 4. Set:
//    - Description: "Arcuzo Decor Form Handler"
//    - Execute as: "Me" (your Google account)
//    - Who has access: "Anyone"
// 5. Click "Deploy", authorize permissions, and copy the Web App URL.

const FORM_CONFIG = {
  // Replace the placeholder below with your Google Apps Script Web App URL:
  scriptURL: 'https://script.google.com/macros/s/AKfycbwrxWlqB5ZIs0ODTbwALNDfuWRO_QBLxRv4GiBSgGnCSbNmRjKq8EPBdIHzyeEJpuVN/exec',

  // Email notifications are sent to the address configured in your Google Apps Script:
  recipientEmail: 'abhishek.arcuzoindia@gmail.com',
  subjectPrefix: 'Arcuzo Decor - New Enquiry: '
};
