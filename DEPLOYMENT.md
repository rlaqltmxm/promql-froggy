# 🚀 Vercel 배포 가이드

PromQL Froggy를 Vercel에 배포하는 방법입니다.

## 방법 1: GitHub 연동 배포 (가장 추천!)

가장 쉽고 자동화된 방법입니다.

### 단계

1. **GitHub에 코드 푸시**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/promql-froggy.git
git push -u origin main
```

2. **Vercel에서 프로젝트 Import**
   - [vercel.com](https://vercel.com) 접속 및 GitHub 계정으로 로그인
   - "Add New..." → "Project" 클릭
   - GitHub 저장소에서 `promql-froggy` 선택
   - "Import" 클릭

3. **설정 확인**
   - Framework Preset: Vite (자동 감지됨)
   - Build Command: `npm run build` (자동 설정됨)
   - Output Directory: `dist` (자동 설정됨)
   - "Deploy" 클릭

4. **완료!**
   - 배포가 자동으로 진행됩니다
   - URL: `https://promql-froggy.vercel.app` (또는 자동 생성된 URL)
   - 이후 `git push`만 하면 자동으로 재배포됩니다!

---

## 방법 2: CLI로 배포

로컬에서 직접 배포하는 방법입니다.

### 단계

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **로그인**
```bash
vercel login
```

3. **배포**
```bash
# 프로젝트 루트에서
vercel

# 프로덕션 배포
vercel --prod
```

4. **완료!**
   - 자동으로 빌드되고 배포됩니다
   - 배포된 URL이 터미널에 표시됩니다

---

## ⚙️ 프로젝트 설정

Vercel은 자동으로 다음을 감지합니다:

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

추가 설정이 필요 없습니다!

---

## 🌐 커스텀 도메인 연결

1. Vercel 프로젝트 대시보드 접속
2. "Settings" → "Domains" 이동
3. 도메인 입력 (예: `promqlfroggy.com`)
4. DNS 레코드 추가:
   - Type: `CNAME`
   - Name: `@` 또는 `www`
   - Value: `cname.vercel-dns.com`

완료! 자동으로 SSL 인증서가 발급됩니다.

---

## 🔧 환경 변수 설정 (필요시)

현재 프로젝트는 환경 변수가 필요 없지만, 나중에 필요하다면:

1. Vercel 대시보드 → "Settings" → "Environment Variables"
2. 변수 추가
3. 재배포

---

## 📊 배포 후 기능

### 자동 기능
- ✅ HTTPS 자동 적용
- ✅ 글로벌 CDN 배포
- ✅ Git push 시 자동 배포
- ✅ 프리뷰 배포 (PR마다 별도 URL)
- ✅ 롤백 기능

### 성능 최적화
- ✅ 자동 이미지 최적화
- ✅ Edge 캐싱
- ✅ Gzip/Brotli 압축

---

## 🚨 문제 해결

### 빌드 실패 시

**로컬에서 빌드 테스트:**
```bash
npm run build
```

**node_modules 재설치:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 에러 (라우팅 문제)

Vercel은 SPA를 자동으로 감지하므로 추가 설정이 필요 없습니다.
만약 문제가 있다면 `vercel.json` 생성:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 환경별 배포

```bash
# 프리뷰 배포 (테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

---

## 📈 배포 후 분석

Vercel 대시보드에서 확인 가능:
- 방문자 통계
- 성능 메트릭
- 빌드 로그
- 에러 추적

---

## 🎯 빠른 시작 요약

```bash
# GitHub 연동 시
1. git push
2. vercel.com에서 Import
3. 끝!

# CLI 사용 시
1. vercel login
2. vercel --prod
3. 끝!
```

**예상 배포 시간:** 1-2분

**예상 URL:** `https://promql-froggy-[random].vercel.app`

---

**Happy Deploying! 🐸🚀**

문제가 있으면 [Vercel 문서](https://vercel.com/docs)를 참고하세요.
