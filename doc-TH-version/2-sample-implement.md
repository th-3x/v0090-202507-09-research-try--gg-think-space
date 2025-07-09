# 2. ตัวอย่างการใช้งาน (Sample Implementation)

## การใช้งานพื้นฐาน

### 2.1 การค้นหาภาพด้วย AI

```javascript
// ตัวอย่างการส่ง query ไป AI
import { sendQuery } from './actions.js'

// ค้นหาภาพที่เกี่ยวกับฤดูหนาว
await sendQuery('winter landscapes with snow')

// ค้นหาภาพสัตว์
await sendQuery('cute animals in nature')

// ค้นหาภาพสถาปัตยกรรม
await sendQuery('modern architecture buildings')
```

### 2.2 การจัดการ Layout

```javascript
// เปลี่ยนรูปแบบการจัดวาง
import { setLayout } from './actions.js'

// แสดงแบบ grid
setLayout('grid')

// แสดงแบบ spiral
setLayout('spiral')

// แสดงแบบ random
setLayout('random')
```

## การสร้าง Custom Component

### 2.3 สร้าง PhotoNode แบบกำหนดเอง

```jsx
// CustomPhotoNode.jsx
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Image } from '@react-three/drei'

const CustomPhotoNode = ({ photo, position, onClick }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Animation loop
  useFrame((state, delta) => {
    if (hovered) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group position={position}>
      {/* รูปภาพ */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[2, 1.5]} />
        <meshBasicMaterial>
          <Image url={photo.url} />
        </meshBasicMaterial>
      </mesh>
      
      {/* ข้อความแสดงชื่อ */}
      {hovered && (
        <Text
          position={[0, -1, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
        >
          {photo.title}
        </Text>
      )}
    </group>
  )
}

export default CustomPhotoNode
```

### 2.4 การใช้งาน Custom PhotoNode

```jsx
// ใน PhotoViz.jsx
import CustomPhotoNode from './CustomPhotoNode'

const PhotoViz = () => {
  const photos = useStore(state => state.photos)
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {photos.map((photo, index) => (
        <CustomPhotoNode
          key={photo.id}
          photo={photo}
          position={[
            (index % 5) * 3 - 6,
            Math.floor(index / 5) * 2 - 4,
            0
          ]}
          onClick={() => console.log('Photo clicked:', photo)}
        />
      ))}
    </Canvas>
  )
}
```

## การเชื่อมต่อ AI แบบกำหนดเอง

### 2.5 สร้าง Custom AI Prompt

```javascript
// customPrompts.js
export const customPrompts = {
  // วิเคราะห์อารมณ์ในภาพ
  analyzeEmotion: (imageData) => `
    วิเคราะห์อารมณ์และความรู้สึกในภาพนี้:
    ${imageData}
    
    ตอบในรูปแบบ JSON:
    {
      "emotion": "ชื่ออารมณ์หลัก",
      "intensity": "ระดับความเข้ม 1-10",
      "description": "คำอธิบายรายละเอียด"
    }
  `,
  
  // แนะนำการถ่ายภาพ
  photoTips: (scene) => `
    ให้คำแนะนำการถ่ายภาพสำหรับฉาก: ${scene}
    
    รวมถึง:
    - การตั้งค่ากล้อง
    - มุมกล้องที่เหมาะสม
    - แสงที่ควรใช้
    - เทคนิคพิเศษ
  `,
  
  // สร้างเรื่องราวจากภาพ
  createStory: (photos) => `
    สร้างเรื่องราวจากภาพเหล่านี้:
    ${photos.map(p => p.description).join(', ')}
    
    เขียนเป็นเรื่องสั้นที่น่าสนใจ
  `
}
```

### 2.6 การใช้งาน Custom Prompt

```javascript
// customActions.js
import { customPrompts } from './customPrompts.js'
import { generateContent } from './llm.js'

export const analyzePhotoEmotion = async (photo) => {
  try {
    const prompt = customPrompts.analyzeEmotion(photo.data)
    const result = await generateContent(prompt)
    
    // อัปเดต store ด้วยผลลัพธ์
    useStore.getState().updatePhotoAnalysis(photo.id, result)
    
    return result
  } catch (error) {
    console.error('Error analyzing emotion:', error)
  }
}

export const getPhotoTips = async (sceneType) => {
  try {
    const prompt = customPrompts.photoTips(sceneType)
    const tips = await generateContent(prompt)
    
    return tips
  } catch (error) {
    console.error('Error getting photo tips:', error)
  }
}
```

## การสร้าง Custom Layout

### 2.7 Layout แบบวงกลม

```javascript
// layouts/circleLayout.js
export const circleLayout = (photos, radius = 10) => {
  return photos.map((photo, index) => {
    const angle = (index / photos.length) * Math.PI * 2
    return {
      ...photo,
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ]
    }
  })
}
```

### 2.8 Layout แบบคลื่น

```javascript
// layouts/waveLayout.js
export const waveLayout = (photos, amplitude = 5, frequency = 0.5) => {
  return photos.map((photo, index) => {
    const x = index * 2 - photos.length
    const y = Math.sin(x * frequency) * amplitude
    return {
      ...photo,
      position: [x, y, 0]
    }
  })
}
```

### 2.9 การใช้งาน Custom Layout

```javascript
// ใน actions.js
import { circleLayout, waveLayout } from './layouts'

export const setCustomLayout = (layoutType, photos) => {
  let arrangedPhotos
  
  switch (layoutType) {
    case 'circle':
      arrangedPhotos = circleLayout(photos)
      break
    case 'wave':
      arrangedPhotos = waveLayout(photos)
      break
    default:
      arrangedPhotos = photos
  }
  
  useStore.getState().setPhotos(arrangedPhotos)
}
```

## การเพิ่มฟีเจอร์ใหม่

### 2.10 ระบบ Favorites

```javascript
// features/favorites.js
export const addToFavorites = (photoId) => {
  const store = useStore.getState()
  const favorites = [...store.favorites, photoId]
  store.setFavorites(favorites)
  
  // บันทึกใน localStorage
  localStorage.setItem('photo-favorites', JSON.stringify(favorites))
}

export const removeFromFavorites = (photoId) => {
  const store = useStore.getState()
  const favorites = store.favorites.filter(id => id !== photoId)
  store.setFavorites(favorites)
  
  localStorage.setItem('photo-favorites', JSON.stringify(favorites))
}

export const loadFavorites = () => {
  const saved = localStorage.getItem('photo-favorites')
  if (saved) {
    const favorites = JSON.parse(saved)
    useStore.getState().setFavorites(favorites)
  }
}
```

### 2.11 การ Export ภาพ

```javascript
// features/export.js
export const exportPhotoAs3D = async (photos) => {
  // สร้างไฟล์ 3D model จากภาพ
  const scene = new THREE.Scene()
  
  photos.forEach((photo, index) => {
    const geometry = new THREE.PlaneGeometry(2, 1.5)
    const texture = new THREE.TextureLoader().load(photo.url)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)
    
    mesh.position.set(...photo.position)
    scene.add(mesh)
  })
  
  // Export เป็น GLTF
  const exporter = new GLTFExporter()
  const result = await exporter.parseAsync(scene)
  
  // Download file
  const blob = new Blob([result], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'photo-visualization.gltf'
  a.click()
}
```

## การทดสอบ

### 2.12 Unit Tests

```javascript
// tests/actions.test.js
import { sendQuery, setLayout } from '../actions.js'
import { useStore } from '../store.js'

describe('Actions', () => {
  test('sendQuery should update loading state', async () => {
    const initialState = useStore.getState()
    expect(initialState.isLoading).toBe(false)
    
    const promise = sendQuery('test query')
    expect(useStore.getState().isLoading).toBe(true)
    
    await promise
    expect(useStore.getState().isLoading).toBe(false)
  })
  
  test('setLayout should change layout type', () => {
    setLayout('grid')
    expect(useStore.getState().layout).toBe('grid')
    
    setLayout('spiral')
    expect(useStore.getState().layout).toBe('spiral')
  })
})
```

---
[← การทำงานของระบบ](./1-flow.md) | [วิธีการเริ่มต้น →](./3-how-to-start.md)
