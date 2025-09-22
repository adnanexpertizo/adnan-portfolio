import { useEffect, useState } from "react"

export function useTypewriter(strings: string[], speed = 10, pause = 1000) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (index >= strings.length) setIndex(0) // loop back

    const timeout = setTimeout(() => {
      const current = strings[index]

      if (!deleting && subIndex < current.length) {
        setText(current.substring(0, subIndex + 1))
        setSubIndex(subIndex + 1)
      } else if (deleting && subIndex > 0) {
        setText(current.substring(0, subIndex - 1))
        setSubIndex(subIndex - 1)
      } else if (!deleting && subIndex === current.length) {
        setDeleting(true)
      } else if (deleting && subIndex === 0) {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % strings.length)
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [strings, index, subIndex, deleting, speed])

  return text
}
