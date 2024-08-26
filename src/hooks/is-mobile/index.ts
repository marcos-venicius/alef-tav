'use client'

import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window?.navigator?.userAgent || '') &&
        window.screen.width < 768) ||
        window.screen.height < 768
    )
  }, [])

  return isMobile
}
