# 3. วิธีการเริ่มต้น (How to Start)

## ข้อกำหนดเบื้องต้น (Prerequisites)

### 3.1 ซอฟต์แวร์ที่จำเป็น
- **Node.js** (เวอร์ชัน 18 หรือใหม่กว่า)
- **npm** หรือ **yarn** (สำหรับจัดการ packages)
- **Git** (สำหรับ version control)
- **Code Editor** (แนะนำ VS Code)

### 3.2 การตรวจสอบการติดตั้ง
```bash
# ตรวจสอบ Node.js
node --version
# ควรแสดง v18.0.0 หรือใหม่กว่า

# ตรวจสอบ npm
npm --version
# ควรแสดงเวอร์ชันล่าสุด

# ตรวจสอบ Git
git --version
# ควรแสดงเวอร์ชันที่ติดตั้ง
```

## การติดตั้งโปรเจค

### 3.3 Clone Repository
```bash
# Clone โปรเจคจาก Git repository
git clone <repository-url>
cd thinking-space

# หรือหากมีโปรเจคอยู่แล้ว
cd /path/to/your/thinking-space-project
```

### 3.4 ติดตั้ง Dependencies
```bash
# ติดตั้ง packages ทั้งหมด
npm install

# หรือใช้ yarn
yarn install
```

### 3.5 การตั้งค่า Environment Variables
```bash
# คัดลอกไฟล์ตัวอย่าง
cp example.env.local .env.local

# แก้ไขไฟล์ .env.local
nano .env.local
```

เพิ่มข้อมูลต่อไปนี้ใน `.env.local`:
```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Other configurations
VITE_APP_TITLE=Thinking Space
VITE_DEBUG_MODE=false
```

### 3.6 การขอ Gemini API Key
1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. สร้างบัญชี Google หรือเข้าสู่ระบบ
3. คลิก "Create API Key"
4. คัดลอก API Key ที่ได้
5. วางใน `.env.local` ไฟล์

## การรันโปรเจค

### 3.7 เริ่มต้น Development Server
```bash
# รัน development server
npm run dev

# หรือใช้ yarn
yarn dev
```

เมื่อรันสำเร็จจะเห็นข้อความ:
```
  VITE v6.2.0  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3.8 เปิดในเบราว์เซอร์
- เปิดเบราว์เซอร์และไปที่ `http://localhost:5173`
- ควรเห็นหน้าแอป Thinking Space

## การใช้งานครั้งแรก

### 3.9 ทดสอบการทำงาน
1. **ทดสอบ UI**: ตรวจสอบว่าหน้าเว็บโหลดได้ปกติ
2. **ทดสอบ 3D Scene**: ควรเห็น 3D visualization
3. **ทดสอบ AI**: ลองค้นหาด้วยคำว่า "winter"
4. **ทดสอบ Sidebar**: คลิกปุ่มเปิด/ปิด sidebar

### 3.10 การแก้ไขปัญหาเบื้องต้น

#### ปัญหา: Port 5173 ถูกใช้งานแล้ว
```bash
# รันด้วย port อื่น
npm run dev -- --port 3000
```

#### ปัญหา: Gemini API Key ไม่ทำงาน
```bash
# ตรวจสอบไฟล์ .env.local
cat .env.local

# ตรวจสอบว่า API Key ถูกต้อง
# ลองสร้าง API Key ใหม่จาก Google AI Studio
```

#### ปัญหา: Dependencies ติดตั้งไม่สำเร็จ
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install

# หรือใช้ yarn
rm -rf node_modules yarn.lock
yarn install
```

## การพัฒนาต่อ

### 3.11 โครงสร้างการพัฒนา
```
thinking-space/
├── src/                    # ไฟล์ source code หลัก
│   ├── components/         # React components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── styles/            # CSS files
├── public/                # Static files
├── doc-TH-version/        # เอกสารภาษาไทย
├── tests/                 # Test files
└── dist/                  # Build output
```

### 3.12 การเพิ่มฟีเจอร์ใหม่
1. **สร้าง Component ใหม่**:
```jsx
// src/components/NewFeature.jsx
import React from 'react'

const NewFeature = () => {
  return (
    <div>
      <h2>ฟีเจอร์ใหม่</h2>
    </div>
  )
}

export default NewFeature
```

2. **เพิ่มใน App.jsx**:
```jsx
import NewFeature from './components/NewFeature'

// เพิ่มใน JSX
<NewFeature />
```

### 3.13 การจัดการ State
```javascript
// เพิ่ม state ใหม่ใน store.js
const useStore = create((set, get) => ({
  // State เดิม
  photos: [],
  query: '',
  
  // State ใหม่
  newFeatureData: null,
  
  // Actions ใหม่
  setNewFeatureData: (data) => set({ newFeatureData: data }),
}))
```

### 3.14 การเพิ่ม AI Prompts
```javascript
// เพิ่มใน prompts.js
export const newPrompt = (input) => `
  คำสั่ง AI ใหม่สำหรับ: ${input}
  
  กรุณาตอบในรูปแบบ JSON
`
```

## การ Build และ Deploy

### 3.15 Build สำหรับ Production
```bash
# สร้าง production build
npm run build

# หรือใช้ yarn
yarn build
```

### 3.16 ทดสอบ Production Build
```bash
# รัน preview server
npm run preview

# หรือใช้ yarn
yarn preview
```

### 3.17 Deploy ไป Vercel
```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Deploy
vercel

# ตั้งค่า environment variables ใน Vercel dashboard
# เพิ่ม GEMINI_API_KEY
```

### 3.18 Deploy ไป Netlify
```bash
# ติดตั้ง Netlify CLI
npm install -g netlify-cli

# Build และ deploy
npm run build
netlify deploy --prod --dir=dist
```

## การ Debug และ Troubleshooting

### 3.19 เครื่องมือ Debug
```javascript
// เปิด debug mode ใน .env.local
VITE_DEBUG_MODE=true

// ใช้ console.log ใน code
console.log('Debug info:', data)

// ใช้ React DevTools ในเบราว์เซอร์
// ติดตั้ง extension: React Developer Tools
```

### 3.20 การตรวจสอบ Network
```javascript
// ดู network requests ใน browser DevTools
// F12 → Network tab

// ตรวจสอบ API calls ไป Gemini
// ดู request/response ใน Network tab
```

### 3.21 การแก้ไข Performance
```javascript
// ใช้ React.memo สำหรับ components
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})

// ใช้ useMemo สำหรับ expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// ใช้ useCallback สำหรับ functions
const handleClick = useCallback(() => {
  // handle click
}, [dependency])
```

## การทดสอบ

### 3.22 รัน Tests
```bash
# รัน unit tests
npm test

# รัน tests แบบ watch mode
npm test -- --watch

# รัน tests พร้อม coverage
npm test -- --coverage
```

### 3.23 การเขียน Test ใหม่
```javascript
// tests/NewFeature.test.js
import { render, screen } from '@testing-library/react'
import NewFeature from '../src/components/NewFeature'

test('renders new feature', () => {
  render(<NewFeature />)
  const element = screen.getByText(/ฟีเจอร์ใหม่/i)
  expect(element).toBeInTheDocument()
})
```

## การอัปเดตโปรเจค

### 3.24 อัปเดต Dependencies
```bash
# ตรวจสอบ packages ที่ล้าสมัย
npm outdated

# อัปเดต packages
npm update

# อัปเดต package เฉพาะ
npm install package-name@latest
```

### 3.25 การ Backup
```bash
# สร้าง backup ของโปรเจค
tar -czf thinking-space-backup-$(date +%Y%m%d).tar.gz .

# หรือใช้ Git
git add .
git commit -m "Backup before major changes"
git push origin main
```

---
[← ตัวอย่างการใช้งาน](./2-sample-implement.md) | [กลับหน้าหลัก](./README.md)

## 🎯 เริ่มต้นได้เลย!

ตอนนี้คุณพร้อมที่จะเริ่มพัฒนา Thinking Space แล้ว! 

หากมีปัญหาหรือข้อสงสัย สามารถ:
- ดูเอกสารเพิ่มเติมใน [การทำงานของระบบ](./1-flow.md)
- ศึกษา [ตัวอย่างการใช้งาน](./2-sample-implement.md)
- สร้าง Issue ใน GitHub repository
