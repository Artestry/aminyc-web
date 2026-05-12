/**
 * AMI NYC — Submission webhook (signup / feedback / mismatch router)
 *
 * Routes incoming POSTs to the right tab based on a `type` field:
 *   - type=signup    → "Signups" tab    (default)
 *   - type=feedback  → "Feedback" tab
 *   - type=mismatch  → "Mismatches" tab
 *
 * DEPLOYMENT (one-time, ~2 minutes):
 *  1. Open https://docs.google.com/spreadsheets/d/1c-IVo05QXywhE9VDCHWgUwB6aU7CWuvuinbFWT6Jybw/edit
 *  2. Extensions → Apps Script.
 *  3. Replace any existing code with this file. Save (Cmd/Ctrl + S).
 *  4. Deploy → New deployment → Web app.
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  5. Click Deploy. Grant permissions. Copy the Web app URL.
 *  6. Paste that URL into the AMI NYC app where `APPS_SCRIPT_URL` is defined.
 *
 * To re-deploy after edits: Deploy → Manage deployments → pencil icon → New version → Deploy.
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const params = e.parameter || {};
    const type = String(params.type || 'signup').toLowerCase();

    if (type === 'feedback') {
      return appendTo(ss, 'Feedback',
        ['Timestamp', 'Email', 'Language', 'What They Saw', 'What Looked Wrong', 'Source', 'Notes'],
        [
          new Date(),
          params.email || '',
          params.language || '',
          params.what_seen || params.address || '',
          params.feedback || params.what_wrong || '',
          params.source || 'in-app-feedback',
          params.notes || ''
        ]);
    }

    if (type === 'mismatch') {
      return appendTo(ss, 'Mismatches',
        ['Timestamp', 'Reporter Email', 'Listing URL or Address', 'What Looked Wrong', 'Borough', 'AMI Band Listed', 'Actual AMI Band', 'Notes'],
        [
          new Date(),
          params.email || '',
          params.listing || params.address || '',
          params.what_wrong || params.feedback || '',
          params.borough || '',
          params.ami_listed || '',
          params.ami_actual || '',
          params.notes || ''
        ]);
    }

    // Default: signup
    return appendTo(ss, 'Signups',
      ['Timestamp', 'Email', 'Language', 'ZIP', 'Source', 'Notes'],
      [
        new Date(),
        params.email || '',
        params.language || '',
        params.zip || '',
        params.source || 'web',
        params.notes || ''
      ]);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendTo(ss, sheetName, headers, row) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
  }
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true, routed_to: sheetName }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(
    'AMI NYC submission webhook is live. Routes signup / feedback / mismatch by `type` field.'
  );
}
