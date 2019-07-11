import React from 'react'
import Projects from './Projects'

// Return all the different content

const Hamburger = ({ handleHamburger }) => {
  return(
    <span className="hamburger" id="hb" onClick={handleHamburger}>
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

const Navigation = ({ nav, handleScroll, pdf }) => {
  return(
    <nav id="nav">
      { nav.map((a, i) => <a key={i} href={`#${a.href}`} className="navButton" onClick={handleScroll}><span className="tab"></span><span id="text" className="navText">{a.text}<span id="accent"></span></span></a>) }
      <a target="_blank" rel="noopener noreferrer" href={`${pdf}`} className="navButton"><span className="tab"></span><span id="text" className="navText">Minun CV<span id="accent"></span></span></a>
    </nav>
  )
}

const Header = ({ head, handleScroll }) => {
  return(
    <header id="header">
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
        { head.social.map((ico, i) => <a target="_blank" rel="noopener noreferrer" key={i} href={ico.href}><i className={ico.ico} /></a>) }
      </div>
    </header>
  )
}

const About = ({ ab, pdf }) => {
  return(
    <div className="about" id="about" >
      <span id="anchor-about" className="anchor" />
      <h3>{ ab.head }</h3>
      <p>{ ab.content }</p>
      <a target="_blank" rel="noopener noreferrer" href={`${pdf}`}><b>Minun CV</b></a>
      <span id="accent" className="accent-about"></span>
    </div>
  )
}

const Contact = ({ ct }) => {
  return(
    <div className="contact" id="contact">
      <span id="anchor-contact" className="anchor" />
      <h3>{ ct.head }</h3>
      <iframe title="ota yhteyttä" className="contactForm" src={ct.form} frameBorder="0" marginHeight="0" marginWidth="0">Ladataan...</iframe>
      <span id="accent" className="accent-contact"></span>
    </div>
  )
}

const Footer = ({ foot, handleScroll }) => {
  const year = new Date()
  return(
    <footer>
      <ul>
        { foot.social.map((ico, i) => <li key={i} id="social"><a target="_blank" rel="noopener noreferrer" href={ico.href} title={ico.text}><i className={ico.ico} /></a></li>) }
        <li id="social"><a target="_blank" rel="noopener noreferrer" href={foot.source}><i className="fas fa-code" title="Source code" /></a></li>
      </ul>
      <ul id="copyright">
        <li><a href={`mailto:${foot.email}`}><b>{foot.email}</b></a></li>
        <li><a href={`tel:${foot.phone}`}><b>{foot.phone}</b></a></li>
        <li><a href="#header" onClick={handleScroll}><i className="fas fa-copyright copy" />Teemu Nurmi {year.getFullYear()}</a></li>
      </ul>
    </footer>
  )
}

const Content = ({ handleHamburger, nav, pdf, head, handleScroll, content, contact, footer }) => {
  return(
    <>
      <Hamburger handleHamburger={handleHamburger} />
      <Navigation nav={nav} handleScroll={handleScroll} pdf={pdf} />
      <Header head={head} handleScroll={handleScroll} />
      
      <div className="content" id="content">
        <About ab={ content.about } pdf={pdf} />
        <Projects pr={ content.projects } />
        <Contact ct={ contact } />
      </div>

      <div className="back more">
        <a href="#content" onClick={handleScroll}><i className="fas fa-arrow-circle-up"></i><br />takaisin ylös</a>
      </div>

      <Footer foot={footer} handleScroll={handleScroll}/>
    </>
  )
}

export default Content