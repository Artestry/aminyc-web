/**
 * AMI NYC — Pilot signup webhook
 *
 * Receives POST submissions from aminyc.org and appends them to the
 * "Signups" tab of the AMI NYC — Pilot Signups + Mismatch Tracker sheet.
 *
 * DEPLOYMENT (one-time, takes 2 minutes):
 *  1. Open the spreadsheet:
 *     https://docs.google.com/spreadsheets/d/1c-IVo05QXywhE9VDCHWgUwB6aU7CWuvuinbFWT6Jybw/edit
 *  2. Extensions → Apps Script.
 *  3. Replace any existing code with the contents of this file.
 *  4. Save (Ctrl/Cmd + S).
 *  5. Deploy → New deployment.
 *  6. Select type: "Web app".
 *  7. Description: "AMI NYC pilot signup webhook".
 *  8. Execute as: "Me".
 *  9. Who has access: "Anyone".
 * 10. Click "Deploy". Grant permissions when prompted.
 * 11. Copy the "Web app URL" — it looks like:
 *     https://script.google.com/macros/s/AKfycb.../exec
 * 12. Paste that URL into aminyc-landing.html at the line that says:
 *     const APPS_SCRIPT_URL = "REPLACE_WITH_APPS_SCRIPT_WEBHOOK_URL";
 *
 * To re-deploy after edits: Deploy → Manage deployments → pencil icon → New version → Deploy.
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Signups');
    if (!sheet) {
      sheet = ss.insertSheet('Signups');
      sheet.appendRow(['Timestamp', 'Email', 'Language', 'ZIP', 'Source', 'Notes']);
    }
    const params = e.parameter || {};
    sheet.appendRow([
      new Date(),
      params.email || '',
      params.language || '',
      params.zip || '',
      params.source || 'web',
      params.notes || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('AMI NYC pilot signup webhook is live.');
}
