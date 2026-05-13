# Secure CI/CD Pipeline — Docker + Jenkins + Trivy

## Setup Steps to Go Live

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cicd-pipeline-demo.git
git push -u origin main
```

### 2. DockerHub
- Create account at hub.docker.com
- Create repo: `cicd-pipeline-demo`

### 3. Render.com (Free Hosting)
- Sign up at render.com
- New → Web Service → Connect GitHub repo
- Select `Docker` runtime
- Copy the Service ID from the URL

### 4. GitHub Secrets (Settings → Secrets → Actions)
| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Your DockerHub username |
| `DOCKERHUB_TOKEN` | DockerHub access token |
| `RENDER_API_KEY` | Render.com API key |
| `RENDER_SERVICE_ID` | Render service ID from URL |

### 5. Done
Push to `main` → GitHub Actions runs pipeline:
- Builds Docker image
- Trivy scans for vulnerabilities
- Pushes to DockerHub
- Deploys to Render.com → app is live

## Pipeline Flow
```
git push → GitHub Actions → npm install → Docker build
         → Trivy scan (blocks on HIGH/CRITICAL CVEs)
         → Push to DockerHub → Deploy to Render.com → LIVE
```
