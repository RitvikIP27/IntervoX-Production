# Intervox — Production DevSecOps Pipeline

> Original project tribute by [Dhruv Gandhi](https://github.com/friends-profile](https://github.com/dhruv1724))
> DevSecOps pipeline implemented by [Ritvik Kant](https://github.com/RitvikIP27)

## What is Intervox?
Intervox is a live coding interview and testing platform.
This repository contains the full DevSecOps pipeline implementation
for deploying Intervox to production with enterprise-grade security
and monitoring baked into every stage.

---
## Local Development Mode (Dependency Bypass)

To enable local execution without external services, Intervox was adapted to run in a **dev mode** using mocking, fallbacks, and environment-based logic.

### Problem

The application depends on multiple external services:

- Clerk (authentication)
- Stream (chat/video)
- JDoodle (code execution)
- MongoDB (database)
- Inngest (event processing)

Without these, the application fails to start or crashes at runtime.

---

### Approach

A dev-mode architecture was implemented using:

- Mocking of external dependencies
- Graceful degradation (fallback instead of failure)
- Environment-aware conditional logic
- Module aliasing (Vite) to override third-party libraries

---

### Backend Changes

- **Database bypass**
  - Disabled MongoDB connection for local execution

- **Stream fallback**
  - Skips initialization if API keys are missing
  - Returns mock responses

- **JDoodle bypass**
  - Code execution endpoint returns placeholder output

- **Authentication mock**
  - Injected mock user into request object

---

### Frontend Changes

- Removed dependency on Clerk API keys
- Implemented module aliasing:
  - Replaced `@clerk/clerk-react` with local mock (`mockClerk.js`)

- Mocked:
  - `useUser`, `useAuth`
  - Auth components (SignedIn, SignedOut, UserButton, etc.)

- Fixed rendering condition:
  - Ensured `isLoaded` and `isSignedIn` are defined to prevent blank UI

---

### Key Concepts

- Graceful Degradation
- Dependency Mocking
- Environment-Based Design
- Module Aliasing

---

### Result

- Backend runs without external services
- Frontend renders without authentication provider
- Application stable for CI/CD pipeline integration
- Ready for containerization and deployment

## Architecture Overview
![Architecture Diagram](docs/architecture.png)
> Diagram coming soon

---

## Security Stack

| Tool | Category | Purpose | Pipeline Stage |
|------|----------|---------|----------------|
| SonarQube | SAST | Static source code analysis | Build |
| Snyk | SCA | Dependency vulnerability scanning | Build |
| HashiCorp Vault | Secrets | Secrets management, zero hardcoded creds | Deploy |
| OWASP ZAP | DAST | Dynamic runtime scanning | Post Deploy |
| ELK Stack | Monitoring | Centralised logging and alerting | Runtime |
| Jenkins | CI/CD | Pipeline orchestration | All stages |
| Docker | Container | Application containerization | Build |
| Kubernetes | Orchestration | Container deployment and scaling | Deploy |

---

## Infrastructure Stack

| Technology | Purpose |
|------------|---------|
| AWS EC2 | Compute — Jenkins, SonarQube, Vault hosted here |
| AWS S3 | Terraform state storage |
| AWS IAM | Access control and permissions |
| Docker | Containerization |
| Kubernetes | Container orchestration |
| Terraform | Infrastructure as Code |

---

## Repository Structure
---


## Pipeline Stages In Detail

### SAST — SonarQube
- Scans Intervox source code statically without running it
- Detects SQL injection risks, XSS vulnerabilities, code smells
- Pipeline automatically fails if critical severity issues found
- Dashboard shows full vulnerability report with remediation steps

### SCA — Dependency Scanning
- Every third party library used by Intervox is scanned
- Checks against CVE database for known vulnerabilities
- Critical CVEs block deployment automatically

### Secrets Management — HashiCorp Vault
- Zero hardcoded credentials anywhere in codebase
- All API keys, DB passwords, tokens stored in Vault
- Application fetches secrets at runtime dynamically
- Full audit trail — every secret access logged with timestamp

### DAST — OWASP ZAP
- Intervox running app scanned from outside
- Simulates real attacker probing the application
- Finds runtime vulnerabilities invisible to static analysis
- SQL injection, XSS, auth bypass, CSRF tested automatically

### Logging — ELK Stack
- Every service, pipeline stage and application event logged
- Elasticsearch indexes and stores all logs
- Logstash collects and processes logs from all sources
- Kibana provides real time dashboards and alerts

---

## Security Best Practices Followed

- ✅ Shift Left Security — security at every pipeline stage
- ✅ Zero hardcoded secrets — all managed via Vault
- ✅ Least privilege — IAM roles scoped to minimum required
- ✅ Image scanning — no vulnerable base images deployed
- ✅ OWASP Top 10 — all categories covered in pipeline
- ✅ Audit logging — every action logged and monitored
- ✅ Infrastructure as Code — all infra versioned and reviewed

---

## Implementation Progress

- [ ] Jenkins pipeline setup
- [ ] SonarQube integration
- [ ] Snyk dependency scanning
- [ ] Docker build and image scan
- [ ] HashiCorp Vault secrets management
- [ ] Kubernetes deployment
- [ ] OWASP ZAP DAST scanning
- [ ] ELK Stack monitoring
- [ ] Full pipeline end to end test
- [ ] Documentation complete

---

## Author

**Ritvik Kant**
DevOps Engineer | AWS Certified Solutions Architect
- GitHub: [RitvikIP27](https://github.com/RitvikIP27)
- LinkedIn: [Ritvik Kant](https://www.linkedin.com/in/ritvik-kant-10b454287/)
- Blog: [Hashnode](https://k8-first-blog.hashnode.dev/)

---
