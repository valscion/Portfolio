import React, { useState, useEffect } from 'react';
import Content from './components/Content'

function App({d}) {
  const [data] = useState(d)
  const [loadingText] = useState("ladataan")

  const isInViewport = () => {
    let ele = [document.getElementById("about"), document.getElementById("projects"), document.getElementById("contact")]

    let els = document.getElementsByClassName('navText')
    for(let i=0; i < els.length; i++) {
      let el = els[i]
      if(document.body.getBoundingClientRect().top < 0){
        el.classList.add("atTop")
      } else {
        el.classList.remove("atTop") 
      }
    }

    els = document.getElementsByClassName('tab')
    for(let i=0; i < els.length; i++) {
      let el = els[i]
      if(document.body.getBoundingClientRect().top < 0){
        el.classList.add("atTop")
      } else {
        el.classList.remove("atTop") 
      }
    }

    ele = ele.map(el => {
      if (!el) return false;
      const offset = window.innerHeight / 3 * 2.5
      const top = el.getBoundingClientRect().top;
      const isScrolled = window.innerHeight >= document.body.getBoundingClientRect().bottom ? true : false
      return ({"isInView": ((top - offset) <= 0 || isScrolled) ? true : false, "element": el})
    })

    bringToView(ele)
  }
  
  const bringToView = (ele) => {
    ele.map(el => {
      const element = document.getElementById(el.element.id)
      const accent = document.getElementsByClassName(`accent-${el.element.id}`)[0]
  
      element.style.opacity = "0"
      element.style.left = "-50px"
      element.style.transition = "opacity .5s, left .5s"

      accent.style.top = "5px"
      accent.style.left = "-45px"
      accent.style.transition = "left .7s, top .5s"

      if(el.isInView) {
        element.style.opacity = "1"
        element.style.left = "0px"

        accent.style.left = "15px"
        accent.style.top = "10px"
        return true
      }
      return true
    })
    return true
  }

  useEffect(() => {
    window.addEventListener('scroll', isInViewport)
    window.addEventListener('load', (event) => {
      const head = document.getElementById('header')
      const height = window.innerHeight
      head.style.minHeight = `${height}px`
      
      if(window.innerWidth < 1200) document.getElementById("nav").classList.add('hide')
      document.getElementById('main').classList.remove('loading')
      
      const element = document.getElementById("loading")
      let opacity = 1
      let timer = setInterval(frame, 10)

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
    window.addEventListener('resize', (event) => {
      const head = document.getElementById('header')
      const height = window.innerHeight
      head.style.minHeight = `${height}px`
    })
  })

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  const handleScroll = (e) => {
    e.preventDefault()

    let val = e.target.href
    
    let hist = val.replace('anchor-','');
    hist = hist.slice(hist.indexOf('#')+1)

    let placeholder = document.title
    if(placeholder.indexOf('|') !== -1) placeholder = placeholder.substring(0, placeholder.indexOf('|'))

    document.title = `${placeholder} | ${hist.capitalize()}`
    window.history.pushState('','',val)
    
    val = val.slice(val.indexOf('#')+1)
    
    const ele = document.getElementById(val)
    ele.scrollIntoView({behavior: "smooth"})

    const element = document.getElementById("nav")
    showNavigation(element, window.innerWidth < 1200)
  }
  
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

  console.log(data)

  const Navigation = ({ nav }) => {
    return(
      <nav id="nav">
        { nav.map((a, i) => <a key={i} href={`#${a.href}`} className="navButton" onClick={handleScroll}><span className="tab"></span><span id="text" className="navText">{a.text}<span id="accent"></span></span></a>) }
      </nav>
    )
  }

  const Header = ({ head }) => {
    return(
      <header id="header">
        <p className="logo">logo</p>
        <div className="title" id="title">
          <h1>{head.head[0]}<br/><i>{head.head[1]}</i><span id="accent"></span></h1>
        </div>
        <div className="more">
          <a href={`#${head.scroll.href}`} onClick={handleScroll}>
            {head.scroll.text}<br />
            <i className="fas fa-arrow-circle-down"></i>
          </a>
        </div>
        <div className="social">
          { head.social.map((ico, i) => <a target="_blank" rel="noopener noreferrer" key={i} href={ico.href}><i className={ico.ico}></i></a>) }
        </div>
      </header>
    )
  }

  const Footer = ({ foot }) => {
    const year = new Date()
    // Add phone number: <li><a href={`tel:${foot.phone}`}>{foot.phone}</a></li>
    return(
      <footer>
        <ul>
          <li><a href="#header" onClick={handleScroll}><i className="fas fa-copyright" />Teemu Nurmi {year.getFullYear()}</a></li>
          <li><a href={`mailto:${foot.email}`}>{foot.email}</a></li>
          { foot.social.map((ico, i) => <li key={i} id="social"><a target="_blank" rel="noopener noreferrer" href={ico.href}>{ico.text}</a></li>) }
        </ul>
      </footer>
    )
  }

  const Hamburger = () => {
    return(
      <span className="hamburger" onClick={handleHamburger}>
        <span id="topBun">
          <span id="sidesContainer">
            <span id="L" />
            <span id="R" />
            <span id="seed" className="s1" />
            <span id="seed" className="s2"/>
            <span id="seed" className="s3"/>
            <span id="seed" className="s4"/>
            <span id="seed" className="s5"/>
          </span>
          <span id="cheese"><span /></span>
        </span>
        <span id="steak" />
        <span id="bottomBun">
          <span id="L" />
          <span id="R" />
        </span>
      </span>
    )
  }

  return(
    <div className="main loading" id="main" >
      <div id="loading" className="loading">
        <h1>{loadingText}</h1>
      </div>
      <Hamburger />
      <Navigation nav={d.header.menu} />
      <Header head={d.header} />
      <Content content={d.content} contact={d.contact} />
      <div className="back more">
          <a href="#content" onClick={handleScroll}>
            <i className="fas fa-arrow-circle-up"></i><br />
            takaisin ylös
          </a>
      </div>
      <Footer foot={d.footer} />
    </div>
  )
}

export default App;
