# 🏦 Autonomous FinOps & Reconciliation Engine

An enterprise-grade, zero-trust financial orchestration pipeline designed to autonomously process, validate, and reconcile B2B invoices and legal contracts using Multi-Modal AI and Deterministic execution.

This architecture solves the three critical failures of traditional RPA and basic LLM wrappers: Non-deterministic math hallucinations, PII data compliance breaches, and stateful double-spend fraud.

## ⚡ System Flow Architecture

```text
[ INBOUND: Vendor Invoice (PDF/Img) ]
        |
[ Zero-Trust PII Redaction ] ---> (Masks Bank Accounts/Tax IDs via Python Local Script)
        |
[ Multi-Modal Extraction ] ---> (Vision LLM converts unstructured PDF to structured JSON)
        |
[ Deterministic Math Validator ] ---> (Python AST engine calculates Price * Qty + Tax. Bypasses LLM math)
        |
[ RAG SLA Contract Matching ] ---> (Vector search verifies invoice pricing against master contract)
        |
[ Stateful Memory Hijack ] ---> (Checks RAM for [VendorID+InvoiceNo+Amount] to block double-spend)
        |
   +----+----+
   |         |
[ PASS ]  [ FAIL / ANOMALY ]
   |         |
[ ERP ]   [ Asynchronous HITL ] ---> (Slack/Telegram Webhook for Executive Override)
```

## 🛡️ Core Engineering Capabilities

1. **Zero-Trust PII Masking:** Financial documents are sanitized locally before ever touching external LLM APIs (Groq/OpenAI), ensuring strict GDPR/Enterprise compliance.
2. **Deterministic Execution over LLM:** Financial calculations are stripped away from the LLM (which is prone to hallucination) and processed via strict local Python execution nodes.
3. **Stateful Double-Spend Prevention:** Custom memory caching intercepts duplicate invoice submissions in milliseconds, protecting budgets and preventing redundant payouts.
4. **Asynchronous Human-in-the-Loop (HITL):** Algorithmic anomalies (e.g., pricing mismatch against RAG contract database) halt the pipeline and request secure executive override via Slack interactive webhooks.

## 🛠️ The Tech Stack
* **Orchestration:** n8n (Self-hosted)
* **Compute & Logic:** Python (Regex Redaction, Deterministic Math Validation)
* **Intelligence:** Vision LLM / Groq API (Llama-3) for unstructured data extraction
* **Infrastructure:** Docker, Docker Compose
