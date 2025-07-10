/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { TrackballControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import useStore from './store'
import PhotoNode from './PhotoNode'
import { setTargetImage } from './actions'
import { useSceneController } from './src/presentation/hooks/useSceneController.js'

/**
 * Scene content component - handles 3D scene rendering and interactions
 */
function SceneContent() {
  // Store state
  const images = useStore.use.images()
  const nodePositions = useStore.use.nodePositions()
  const layout = useStore.use.layout()
  const highlightNodes = useStore.use.highlightNodes()
  const targetImage = useStore.use.targetImage()
  const xRayMode = useStore.use.xRayMode()
  const resetCam = useStore.use.resetCam()
  const triggerGoBack = useStore.use.triggerGoBack()

  // Three.js refs
  const { camera } = useThree()
  const groupRef = useRef()
  const controlsRef = useRef()

  // Clean architecture controller
  const sceneController = useSceneController(useStore)

  // Handle target image changes
  useEffect(() => {
    if (!sceneController) return

    sceneController.handleTargetImageChange(
      targetImage,
      nodePositions,
      camera,
      controlsRef.current,
      groupRef
    )
  }, [targetImage, nodePositions, camera, sceneController])

  // Handle layout changes
  useEffect(() => {
    if (!sceneController) return

    sceneController.handleLayoutChange(
      layout,
      camera,
      controlsRef.current,
      groupRef
    )

    // Reset camera flag
    useStore.setState(state => {
      state.resetCam = false
    })
  }, [layout, camera, resetCam, sceneController])

  // Handle go back trigger
  useEffect(() => {
    if (!triggerGoBack || !sceneController) return

    sceneController.handleGoBack(camera, controlsRef.current)

    // Reset the trigger
    useStore.setState(state => {
      state.triggerGoBack = null
    })
  }, [triggerGoBack, camera, sceneController])

  // Animation frame handler
  useFrame((_, delta) => {
    if (!sceneController) return

    sceneController.updateFrame(
      delta,
      groupRef,
      layout,
      controlsRef.current
    )
  })

  // Interaction handlers
  const handleInteractionStart = () => {
    if (sceneController) {
      sceneController.handleInteractionStart()
    }
  }

  const handleInteractionEnd = () => {
    if (sceneController) {
      sceneController.handleInteractionEnd()
    }
  }

  return (
    <>
      <ambientLight intensity={2.3} />
      <TrackballControls
        ref={controlsRef}
        onStart={handleInteractionStart}
        onEnd={handleInteractionEnd}
        minDistance={20}
        maxDistance={1000}
        noPan
      />
      <group ref={groupRef}>
        {images?.map(image => {
          const isHighlighted = highlightNodes?.includes(image.id)

          return (
            <PhotoNode
              key={image.id}
              id={image.id}
              description={image.description}
              x={nodePositions?.[image.id][0] - 0.5}
              y={nodePositions?.[image.id][1] - 0.5}
              z={(nodePositions?.[image.id][2] || 0) - 0.5}
              highlight={
                (highlightNodes && isHighlighted) ||
                (targetImage && targetImage === image.id)
              }
              dim={
                (highlightNodes && !isHighlighted) ||
                (targetImage && targetImage !== image.id)
              }
              xRayMode={xRayMode}
            />
          )
        })}
      </group>
    </>
  )
}

/**
 * Main PhotoViz component
 */
export default function PhotoVizClean() {
  return (
    <Canvas
      camera={{ position: [0, 0, 300], near: 0.1, far: 10000 }}
      onPointerMissed={() => setTargetImage(null)}
    >
      <SceneContent />
    </Canvas>
  )
}
