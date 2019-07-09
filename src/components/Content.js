import React from 'react'
import Projects from './Projects'

const About = ({ ab }) => {
  return(
    <div className="about" id="about" >
      <span id="anchor-about" className="anchor" />
      <h3>{ ab.head }</h3>
      <p>{ ab.content }</p>
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

const Content = ({ content, contact }) => {
  return(
    <div className="content" id="content">
      <About ab={ content.about } />
      <Projects pr={ content.projects } />
      <Contact ct={ contact } />
    </div>
  )
}

export default Content