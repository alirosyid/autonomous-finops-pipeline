// Fetch raw text from the PDF extraction node
let rawText = $input.item.json.text || "";

// Aggressive Regex to redact 10-16 digit numbers (Bank Accounts, SSN, Tax IDs)
let safeText = rawText.replace(/\b\d{10,16}\b/g, "[REDACTED_SECURE_DATA]");

return { safe_payload: safeText };
