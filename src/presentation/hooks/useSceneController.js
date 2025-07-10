/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react'
import { Container } from '../../infrastructure/di/Container.js'

/**
 * Hook to manage scene controller lifecycle
 */
export function useSceneController(store) {
  const containerRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = new Container(store)
      controllerRef.current = containerRef.current.getSceneController()
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.cleanup()
      }
    }
  }, [store])

  return controllerRef.current
}
