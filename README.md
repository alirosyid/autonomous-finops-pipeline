# 🏛️ Autonomous FinOps & Reconciliation Engine

An enterprise-grade, zero-trust financial orchestration pipeline designed to autonomously process, validate, and reconcile B2B invoices using Multi-Modal AI and Deterministic execution.

This architecture solves the three critical failures of traditional RPA and basic LLM wrappers: Non-deterministic math hallucinations, PII data compliance breaches, and stateful double-spend fraud.

---

## 🔴 LIVE DEMONSTRATION: FinOps Engine in Action

*Proof of Life: The system successfully ingests an invoice, validates the deterministic math, and instantaneously blocks the identical subsequent double-spend payload using a stateful SSOT radar to protect enterprise budgets.*

[![FinOps Engine Demo](https://img.youtube.com/vi/vuEeE0JmrWk/maxresdefault.jpg)](https://www.youtube.com/watch?v=vuEeE0JmrWk) 
---

## 🛡️ Core Engineering Capabilities

1. **Zero-Trust PII Masking:** Financial documents are sanitized locally via strict regex before ever touching external LLM APIs (Groq/OpenAI), ensuring absolute GDPR/Enterprise compliance.
2. **Deterministic Execution over LLM:** Financial calculations are stripped away from the LLM (which is prone to hallucination) and processed via strict deterministic logic execution nodes.
3. **Stateful Double-Spend Prevention:** Single Source of Truth (SSOT) Google Sheets radar intercepts duplicate invoice submissions in milliseconds, protecting budgets and preventing redundant payouts.
4. **Asynchronous Human-in-the-Loop (HITL):** Algorithmic anomalies (e.g., pricing mismatches or math hallucinations) halt the pipeline silently and request secure executive override via Telegram interactive webhooks.

---

## ⚡ System Flow Architecture

1. **INGESTION:** Physical vendor invoices (PDF) are received via Webhook.
2. **SECURITY:** Regex redacts Bank Accounts/Tax IDs locally.
3. **EXTRACTION:** Llama-3 (via Groq API) converts unstructured PDF text into structured JSON.
4. **VALIDATION:** Deterministic Math Engine calculates `Price * Qty + Tax` to bypass LLM math limitations.
5. **ANTI-DUPLICATE:** Radar scans ERP Database (Sheets) for matching `[VendorID + InvoiceNo]` to block double-spend.
6. **ROUTING:** 
   - **PASS:** Injects data to ERP Database.
   - **FAIL/ANOMALY:** Halts pipeline and triggers Telegram Webhook for Executive HITL Override.

---

## 🛠️ The Tech Stack

* **Orchestration:** n8n (Self-hosted via Docker)
* **Compute & Logic:** JavaScript/Node.js (Regex Redaction, Deterministic Math Validation)
* **Intelligence:** Vision LLM / Groq API (Llama-3 8B Instant) for unstructured data extraction
* **Database / Radar:** Google Sheets API
* **Infrastructure:** Docker, Docker Compose

---

## 🚀 Quick Start Deployment

This architecture can be deployed locally in under 60 seconds using Docker.

### 1. Spin Up the Infrastructure
Clone this repository and spin up the optimized n8n container (pre-configured for production to prevent memory leaks).
```bash
git clone [https://github.com/alirosyid/autonomous-finops-pipeline.git](https://github.com/alirosyid/autonomous-finops-pipeline.git)
cd autonomous-finops-pipeline
docker compose up -d
