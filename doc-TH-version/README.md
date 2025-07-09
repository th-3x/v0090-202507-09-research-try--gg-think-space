# เอกสารสำหรับนักพัฒนา - Thinking Space AI Studio App

แอปพลิเคชัน Thinking Space เป็นเครื่องมือสำหรับการแสดงผลและวิเคราะห์ภาพถ่ายด้วย AI ที่ใช้เทคโนโลยี 3D visualization

## เอกสารประกอบ

1. [การทำงานของระบบ (Flow)](./1-flow.md)
2. [ตัวอย่างการใช้งาน (Sample Implementation)](./2-sample-implement.md)  
3. [วิธีการเริ่มต้น (How to Start)](./3-how-to-start.md)

## ภาพรวมของโปรเจค

### เทคโนโลยีที่ใช้
- **Frontend**: React 19 + TypeScript
- **3D Visualization**: Three.js + React Three Fiber
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: Zustand
- **Build Tool**: Vite
- **Animation**: Motion
- **Styling**: CSS + clsx

### โครงสร้างไฟล์หลัก
```
├── App.jsx              # หน้าหลักของแอป
├── PhotoViz.jsx         # คอมโพเนนต์แสดงผล 3D
├── PhotoNode.jsx        # โหนดภาพถ่ายใน 3D space
├── Sidebar.jsx          # แถบด้านข้าง
├── store.js             # การจัดการ state
├── actions.js           # การกระทำต่างๆ
├── llm.js               # การเชื่อมต่อ AI
├── prompts.js           # คำสั่ง AI
└── index.html           # หน้าเว็บหลัก
```

### คุณสมบัติหลัก
- 🖼️ การแสดงผลภาพถ่ายแบบ 3D
- 🤖 การวิเคราะห์ภาพด้วย AI
- 🔍 การค้นหาและกรองภาพ
- 📱 อินเทอร์เฟซที่ใช้งานง่าย
- ⚡ ประสิทธิภาพสูงด้วย Vite

---
สร้างโดย AI Studio | เวอร์ชัน 1.0
