import React from 'react'

export default function Demo(): React.JSX.Element {
  return <>{document.cookie || "There's nothing!"}</>
}
