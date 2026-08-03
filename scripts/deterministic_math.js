// DETERMINISTIC MATH VALIDATOR
// Executes strict logic to destroy LLM hallucinations.

let groqResponse = $input.item.json.choices[0].message.content;
let invoiceData = JSON.parse(groqResponse);

let items = invoiceData.items || [];
let taxRate = parseFloat(invoiceData.tax_rate) || 0;
let claimedTotal = parseFloat(invoiceData.claimed_total) || 0;

let calculatedSubtotal = 0;
for (let item of items) {
  let price = parseFloat(item.price) || 0;
  let qty = parseFloat(item.qty) || 1;
  calculatedSubtotal += (price * qty);
}

let calculatedTax = calculatedSubtotal * taxRate;
let trueTotal = calculatedSubtotal + calculatedTax;

// Tolerance for decimal rounding: 0.01
if (Math.abs(trueTotal - claimedTotal) <= 0.01) {
  return { 
    status: "APPROVED", 
    vendor: invoiceData.vendor_name, 
    invoice_id: invoiceData.invoice_id || "INV-UNKNOWN", 
    claimed_total: claimedTotal, 
    true_total: trueTotal 
  };
} else {
  return { 
    status: "REJECTED", 
    vendor: invoiceData.vendor_name, 
    message: `FRAUD / HALLUCINATION DETECTED: Vendor claimed ${claimedTotal}, True deterministic calculation is ${trueTotal}.` 
  };
}
