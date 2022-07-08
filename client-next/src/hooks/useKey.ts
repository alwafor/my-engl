import {useEffect, useRef} from 'react'

export function useKey(key: string, cb: Function) {
  const callbackRef = useRef(cb)

  useEffect(() => {
    callbackRef.current = cb
  })

  useEffect(() => {
    function handle(event: any) {
      if (event.code === key) {
        cb(event)
      }
    }

    document.addEventListener('keydown', handle)
    return () => {
      document.removeEventListener('keydown', handle)
    }
  })
}