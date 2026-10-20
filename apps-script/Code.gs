// Bound to the Google Sheet that stores contact form submissions.
// Setup steps are in apps-script/README.md.

const NOTIFY_EMAIL = 'bocajvaleros@gmail.com';
const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = String(data.email || '').trim().slice(0, 200);
    const message = String(data.message || '').trim().slice(0, 5000);

    // Honeypot: real visitors leave this empty
    if (data.website) return json({ ok: true });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return json({ ok: false, error: 'Invalid input' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Email', 'Message']);
      sheet.appendRow([new Date(), email, message]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'Portfolio contact: ' + email,
      body: 'From: ' + email + '\n\n' + message,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
