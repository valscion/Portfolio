import React, { useState, useEffect } from 'react';
import Content from './components/Content'
import pdf from './cv_teemu_nurmi.pdf';

function App({d}) {
  // Set states
  const [data] = useState(d)
  const [loadingText] = useState("ladataan")

  // Check if element is in viewport
  const isInViewport = () => {
    // Hide navigation if window is scrolled
    const navButtons = document.getElementsByClassName('navText')
    const navTabs = document.getElementsByClassName('tab')

    // the index for both is the same so we can use the same loop
    for(let i=0; i < navButtons.length; i++) {
      const nav = navButtons[i]
      const tab = navTabs[i]

      // If body is not at top of the viewport
      if(document.body.getBoundingClientRect().top < 0){
        nav.classList.add("atTop")
        tab.classList.add("atTop")
      } else {
        nav.classList.remove("atTop") 
        tab.classList.remove("atTop") 
      }
    }

    // Bring element to view if it's in the viewport
    let ele = [document.getElementById("about"), document.getElementById("projects"), document.getElementById("contact")]
    
    ele = ele.map(el => {
      if (!el) return false;
      const offset = window.innerHeight / 1.2
      
      // Get how far from the top the element is
      const top = el.getBoundingClientRect().top

      // Check if the page is scrolled to the bottom
      const isScrolled = window.innerHeight >= document.body.getBoundingClientRect().bottom ? true : false
      
      // elements distance - offset is less than 0, or viewport is scrolled to the pages bottom, show the elements 
      return ({"isInView": ((top - offset) <= 0 || isScrolled) ? true : false, "element": el})
    })

    bringToView(ele)
  }
  
  // Add styling to elements to be shown
  const bringToView = (ele) => {
    ele.map(el => {
      const element = document.getElementById(el.element.id)
      const accent = document.getElementsByClassName(`accent-${el.element.id}`)[0]

      if(el.isInView) {
        element.style.opacity = "1"
        element.style.left = "0px"

        accent.style.left = "15px"
        accent.style.top = "10px"
        return true
      } else {
        element.style.opacity = "0"
        element.style.left = "-50px"
        element.style.transition = "opacity .5s, left .5s"

        accent.style.top = "5px"
        accent.style.left = "-45px"
        accent.style.transition = "left .7s, top .5s"
      }
      return true
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', isInViewport)
    window.addEventListener('load', () => {
      // Show loading page until page is fully loaded

      // Set header height to viewport
      document.getElementById('header').style.minHeight = `${window.innerHeight}px`
      
      // Set navigation to hidden if viewport width is 1200px
      if(window.innerWidth < 1200) document.getElementById("nav").classList.add('hide')
      
      // Hide loading screen after page is loaded
      document.getElementById('main').classList.remove('loading')
      const element = document.getElementById("loading")
      let opacity = 1
      let timer = setInterval(frame, 10)

      // Animate opacity of the loading screen
      // After done, remove the element
      function frame() {
        if (opacity <= 0) {
          clearInterval(timer)
          element.parentNode.removeChild(element)
        } else {
          opacity -= .1
          element.style.opacity = opacity
        }
      }
      
      console.log('page is fully loaded')
    })
    window.addEventListener('resize', () => {
      // If page is resized, reset header height
      const head = document.getElementById('header')
      const height = window.outerHeight
      const headHeight = parseInt(head.style.minHeight)

      // Set the header height only if the height change is over 200px
      // This allows for a nicer look on mobile, as the url bar is calculated to the window height
      // Now it resizes only when you turn the phone to its side, and not when scrolling
      if(height - headHeight > 200 || height - headHeight < -200) head.style.minHeight = `${height}px`

      // Hide the nav bar if window width is less than 1200px
      const element = document.getElementById("nav")
      showNavigation(element, window.innerWidth < 1200)
    })
  })

  // Capitalize string
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  // Handle nav button clicks, to scroll the page to the correct element
  const handleScroll = (e) => {
    e.preventDefault()

    // Get buttons target
    let val = e.target.href
    
    // Format target to a usable string
    let hist = val.replace('anchor-','');
    hist = hist.slice(hist.indexOf('#')+1)

    // Get page title
    let placeholder = document.title

    // If target is set (ie. | is found), remove the target from the title
    // Sanitizes the string to only have the starting title
    if(placeholder.indexOf('|') !== -1) placeholder = placeholder.substring(0, placeholder.indexOf('|'))

    // Adds the target to the page title and saves the target into browser history
    // Easier to come back, to the content that users want to see
    document.title = `${placeholder} | ${hist.capitalize()}`
    window.history.pushState('','',val)
    
    // Get target element id and scroll into view
    val = val.slice(val.indexOf('#')+1)
    const ele = document.getElementById(val)
    ele.scrollIntoView({behavior: "smooth"})
  }
  
  // When hamburger is clicked, handle navigation show/hide
  const handleHamburger = (e) => {
    e.preventDefault()
    const element = document.getElementById("nav")
    showNavigation(element, element.classList.contains('show'))
  }
  
  const showNavigation = (element, val) => {
    if(val) {
      element.classList.remove('show')
      element.classList.add('hide')
    } else {
      element.classList.remove('hide')
      element.classList.add('show')
    }
    return
  }

  return(
    <div className="main loading" id="main" >
      <div id="loading" className="loading">
        <h1>{loadingText}</h1>
      </div>
      <Content
        handleHamburger={handleHamburger}
        nav={d.header.menu}
        pdf={pdf}
        head={d.header}
        handleScroll={handleScroll}
        content={d.content}
        contact={d.contact}
        footer={d.footer}
      />
    </div>
  )
}

export default App;
