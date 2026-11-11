---
title: "Enterprise Financial Analytics & AI Platform"
shortDescription: "A governed financial data platform demonstrating dimensional Kimball star schemas, double-entry accounting reconciliation, and AST-level text-to-SQL safety."
category: "Data & AI Systems"
featured: true
order: 1
tags:
  - "dbt Core"
  - "SQLGlot"
  - "PostgreSQL 16"
  - "DuckDB"
  - "LangGraph"
  - "FastAPI"
  - "Streamlit"
githubUrl: "https://github.com/mrsimiloluwa/financial-services-analytics-platform"
liveUrl: "https://financial-services-analytics-platform.streamlit.app/"
role: "Platform Architect & Analytics Engineer"
timeline: "2024"
status: "Live & Open Source"
metrics:
  - label: "Net Recognized Revenue"
    value: "€408,602.64"
    detail: "Reconciled to the exact cent"
  - label: "dbt Dimensional Marts"
    value: "9 Marts (26 Models)"
    detail: "Kimball star schema"
  - label: "Data Quality Tests"
    value: "462 Tests"
    detail: "100% test assertion pass rate"
  - label: "Certified Metrics"
    value: "12 Metrics"
    detail: "Immutable YAML semantic catalog"
  - label: "AST Safety Latency"
    value: "<10ms Check"
    detail: "Compile-time SQLGlot gate"
  - label: "Dual Warehouse"
    value: "PostgreSQL + DuckDB"
    detail: "Zero-infra standalone fallback"
keyTakeaway: "Demonstrates how commercial banks can safely pair dimensional data warehousing with natural-language AI without risking arithmetic hallucination, data leakage, or unconstrained SQL execution."
---

## Executive Summary

The **Financial Services Analytics & AI Platform** demonstrates how modern commercial banks can bridge **deterministic analytics engineering** (Kimball dimensional star schemas, double-entry accounting models, and automated data testing) with **governed conversational AI**.

Instead of allowing LLMs direct, unconstrained access to raw database tables, this platform introduces a **governed semantic layer and AST security perimeter** that enforces compile-time SQL validation and least-privilege database execution.

---

## 1. The Banking Problem: Fee Leakage & Arrears

Commercial transaction banking faces three persistent operational hurdles:

1. **Revenue Leakage**: Fee schedules across wire transfers, SEPA clearing, interchange, and account maintenance are complex. Without dimensional modeling, discrepancies between contracted pricing and actual billed amounts go unnoticed.
2. **Concessions vs. Arrears**: Relationship managers frequently grant discretionary fee waivers to retain high-value corporate clients, while underfunded accounts fall into billing arrears. Understanding true economic margin requires isolating gross fees assessed, waivers granted, unpaid arrears, and net collected revenue.
3. **The Risk of LLM Hallucinations in Finance**: Executives want conversational answers (*"What was our net revenue last month?"*). Standard LLMs hallucinate calculations, misinterpret ambiguous database columns, and produce vulnerable SQL queries.

---

## 2. The Reconciled Revenue Accounting Bridge

Monetary calculations must never rely on probabilistic models or floating-point approximations. All transactions and fee assessments are calculated using fixed-point `DECIMAL(18, 4)` types and reconcile down to the cent:

| Financial Ledger Step | Amount | Business Meaning |
| :--- | :--- | :--- |
| **Gross Assessed Fees** | **€467,449.70** | Total fees assessed across all commercial banking transactions |
| *Less: Discretionary Waivers* | *-€8,061.56* | Concessions granted by relationship managers |
| **= Net Collectible Fee Pool** | **€459,388.14** | Authoritative fee pool eligible for collection |
| *Less: Billing Arrears* | *-€29,280.10* | Uncollected fees across 200 exception fee assessments (46 accounts) |
| **= Cash Collected Sweeps** | **€430,108.04** | Direct debit sweeps successfully settled into bank accounts |
| *Less: Pass-Through Costs* | *-€21,505.40* | Card scheme, clearing, and interbank transaction costs |
| **= Net Recognized Revenue** | **€408,602.64** | **Authoritative net revenue recognized in the General Ledger** |

$$\Delta_{\text{reconciliation}} = €29,280.10 + €21,505.40 = \mathbf{€50,785.50}$$

Every figure is backed by dimensional marts (`analytics.fct_customer_revenue` and `analytics.fct_fee_assessments`).

---

## 3. Dimensional Data Engineering (dbt Core)

The analytical warehouse follows **Kimball star schema** design across 26 models in dbt Core:

* **Staging (`stg_`)**: 1:1 view wrappers over raw transactional tables that normalize data types, rename fields, and standardize timestamps.
* **Intermediate (`int_`)**: Business logic models handling multi-attempt fee collections, general ledger double-entry balancing, and daily ECB mid-market FX conversions.
* **Dimensional Marts (`fct_` / `dim_`)**: Nine consumer marts in the `analytics` schema:
  * `dim_customers` (Segmented: `INSTITUTIONAL`, `COMMERCIAL_SME`, `CORPORATE`)
  * `dim_accounts` & `dim_gl_accounts` (Chart of accounts GL 1000–5000)
  * `fct_transactions` & `fct_fee_assessments` (Full fee collection lifecycle)
  * `fct_daily_balances` & `fct_general_ledger_entries` (Balanced debit/credit journals)
  * `fct_revenue_recognition` & `agg_customer_profitability` (Net revenue & realized margin)

**Automated Testing**: **462 automated assertions** validating primary/foreign keys, debit-equals-credit balance invariants, and revenue reconciliation totals.

---

## 4. Governed AI & SQLGlot AST Defense

The AI query execution boundary is treated as an adversarial perimeter. Security is enforced through **three independent defensive perimeters**:

1. **Perimeter 1: Intent & Prompt Shield**
   Pre-execution classification detects and neutralizes system prompt overrides, schema traversal, and data deletion directives.
2. **Perimeter 2: SQLGlot AST Validator (<10ms latency)**
   * **Single Statement Rule**: Compound queries with semicolons are blocked.
   * **Pure SELECT Root**: Prohibits `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, or `TRUNCATE`.
   * **Schema Allowlist**: Restricted exclusively to tables in the `analytics` schema.
   * **Row Limit Clamping**: Unbounded queries are automatically clamped to `LIMIT 1000`.
3. **Perimeter 3: PostgreSQL Database Sandbox**
   Physical `analytics_reader` role with read-only permissions on `analytics.*` and a hard **5,000ms statement timeout** to prevent Cartesian denial-of-service.

---

## 5. Architecture & Tech Stack

```
[ Streamlit Executive Dashboard ]  <──>  [ FastAPI REST & Telemetry Service ]
                                                      │
                                                      ▼
[ Governed Metric Catalog ]        <──>  [ LangGraph Multi-Node State Machine ]
(12 Certified Financial Metrics)                      │
                                                      ▼
[ SQLGlot AST Safety Validator ]   <──>  [ PostgreSQL 16 / DuckDB Analytics Marts ]
(Single SELECT, Limit Clamp)             (analytics_reader role • 5000ms timeout)
```

| Layer | Chosen Technology | Why It Matters for Banking & Analytics |
| :--- | :--- | :--- |
| **Analytical Warehouse** | **PostgreSQL 16 & DuckDB** | Dual-engine setup: PostgreSQL for multi-user production roles; DuckDB for zero-infrastructure, zero-cost public demonstrations. |
| **Analytics Engineering** | **dbt Core 1.8+** | Industry benchmark for reproducible transformations, documentation, and data contracts. |
| **AI Orchestration** | **LangGraph** | Explicit state machines with deterministic validation loops rather than unpredictable autonomous agents. |
| **SQL Validation** | **SQLGlot** | True Abstract Syntax Tree evaluation that cannot be bypassed by SQL comment or whitespace obfuscation. |
| **Orchestration** | **Apache Airflow 2.10.3** | Scheduled daily ingestion and financial reconciliation DAGs with SLA tracking. |
| **User Application** | **Streamlit** | Multi-workspace executive interface (KPI Overview, Rankings, Arrears, Copilot, Catalog). |

---

## 6. How to Test & Explore

* **Live Interactive Demo**: [financial-services-analytics-platform.streamlit.app](https://financial-services-analytics-platform.streamlit.app/)
* **Source Code & Documentation**: [github.com/mrsimiloluwa/financial-services-analytics-platform](https://github.com/mrsimiloluwa/financial-services-analytics-platform)

**Suggested Verification Queries to Try in the Demo**:
* *"What was our total net recognized revenue?"* → Returns €408,602.64 with full accounting bridge breakdown.
* *"Which customers generated the most revenue?"* → Ranks top commercial clients (Equinox Logistics GmbH).
* *"Show me customers currently in arrears"* → Itemizes overdue fee assessments by aging buckets (0–30, 31–60, 61–90, 90+ days).
* *"Drop table raw.customers;"* → Flagged as out-of-scope; zero SQL generated, zero database execution.
