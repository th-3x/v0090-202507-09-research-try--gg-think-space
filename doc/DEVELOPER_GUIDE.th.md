# เอกสารสำหรับนักพัฒนา                                                                                        
NOTE: by aider                                                                                                              
เอกสารนี้จะอธิบายภาพรวมของโปรเจกต์ โครงสร้าง และวิธีการเริ่มต้นพัฒนา                                          
                                                                                                              
## 1. โฟลว์การทำงานของแอปพลิเคชัน (Application Flow)                                                          
                                                                                                              
แอปพลิเคชันนี้สร้างขึ้นด้วย React และใช้ `react-three-fiber` สำหรับการแสดงผลสามมิติ และ Zustand สำหรับการจัดการ state
                                                                                                              
-   **การเริ่มต้น (Initialization):** เมื่อแอปเริ่มทำงาน `actions.js:init()` จะถูกเรียก ซึ่งจะโหลดข้อมูลเริ่มต้น เช่น
ข้อมูลรูปภาพและตำแหน่งการจัดวาง (layout) จากไฟล์ JSON                                                         
-   **การจัดการ State (State Management):** เราใช้ Zustand (`store.js`) เป็น single source of truth สำหรับ state
ของแอปพลิเคชัน การเปลี่ยนแปลง state ทั้งหมดจะถูกจัดการผ่านฟังก์ชันใน `actions.js`                             
-   **คอมโพเนนต์ UI (UI Components):**                                                                        
    -   `App.jsx`: เป็นคอมโพเนนต์หลักที่ประกอบร่าง UI ทั้งหมด                                                 
    -   `PhotoViz.jsx`: จัดการการแสดงผลสามมิติทั้งหมดโดยใช้ `react-three-fiber`                               
    -   `PhotoNode.jsx`: เป็นคอมโพเนนต์สำหรับรูปภาพแต่ละใบในซีนสามมิติ                                        
    -   `Sidebar.jsx`: แสดงข้อมูลของรูปภาพที่ถูกเลือกหรือผลการค้นหา                                           
-   **การโต้ตอบกับผู้ใช้ (User Interaction):**                                                                
    -   **การเปลี่ยน Layout:** ผู้ใช้สามารถเปลี่ยนมุมมองการจัดวางได้ ซึ่งจะเรียกใช้ `actions.js:setLayout()`  
    -   **การค้นหา:** การส่งคำค้นหาจะเรียก `actions.js:sendQuery()` ซึ่งจะสื่อสารกับ LLM ผ่าน `llm.js`        
    -   **การเลือกรูปภาพ:** การคลิกที่รูปภาพจะเรียก `actions.js:setTargetImage()` เพื่อโฟกัสไปที่รูปภาพนั้น   
-   **การสื่อสารกับ LLM (LLM Interaction):** `llm.js` มีฟังก์ชัน `queryLlm` สำหรับส่ง prompt และรูปภาพ (ถ้ามี) ไปยัง Gemini
API เพื่อทำการประมวลผลภาษาธรรมชาติ                                                                            
                                                                                                              
## 2. ตัวอย่างการพัฒนาเพิ่มเติม (Sample Implementation)                                                       
                                                                                                              
หากต้องการเพิ่มฟีเจอร์ใหม่ เช่น การเพิ่ม State และ Action ใหม่ สามารถทำตามขั้นตอนต่อไปนี้:                    
                                                                                                              
1.  **อัปเดต Store:** เพิ่ม state ใหม่เข้าไปใน `initialState` ที่ไฟล์ `store.js`                              
2.  **สร้าง Action:** เพิ่มฟังก์ชัน action ใหม่ใน `actions.js` เพื่อจัดการการเปลี่ยนแปลง state นั้นๆ          
                                                                                                              
ตัวอย่างการเพิ่ม action ใหม่ใน `actions.js`:                                                                  
```javascript                                                                                                 
// In actions.js                                                                                              
export const setMyNewFeature = (value) =>                                                                     
  set(state => {                                                                                              
    state.myNewFeature = value                                                                                
  })                                                                                                          
                                                                                                              


3. วิธีการเริ่มต้น (How to Start)                                                                             

 • สิ่งที่ต้องมี (Prerequisites):                                                                             
    • Node.js (v18 หรือสูงกว่า)                                                                               
    • npm หรือ yarn                                                                                           
 • ขั้นตอนการติดตั้ง:                                                                                         
    1 Clone repository ของคุณ:                                                                                
                                                                                                              
      git clone <your-repository-url>                                                                         
      cd <repository-directory>                                                                               
                                                                                                              
    2 ติดตั้ง dependencies:                                                                                   
                                                                                                              
      npm install                                                                                             
                                                                                                              
      หรือ                                                                                                    
                                                                                                              
      yarn install                                                                                            
                                                                                                              
    3 สร้างไฟล์ .env ที่ root ของโปรเจกต์ และเพิ่ม API key สำหรับ Gemini:                                     
                                                                                                              
      VITE_GEMINI_API_KEY="YOUR_API_KEY"                                                                      
                                                                                                              
    4 รัน development server:                                                                                 
                                                                                                              
      npm run dev                                                                                             
                                                                                                              
    5 เปิดเบราว์เซอร์ไปที่ http://localhost:5173 (หรือ port อื่นที่แสดงใน terminal) 