import React from 'react'
import './index.css'

export default function TopButton() {
  function GoUpEvent() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
      document.getElementById('topButton').style.visibility = 'visible'
    } else {
      document.getElementById('topButton').style.visibility = 'hidden'
    }
  }

  window.onscroll = function () {
    scrollFunction()
  }

  return (
    <div
      onClick={GoUpEvent}
      id="topButton"
      title="Ir al Top"
    ></div>
  )
}
