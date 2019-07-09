import React from 'react'

const Project = ({ project }) => {
  return(
    <>
    {project.map(
      (p, i) => {
        return(
          <div className="project" key={i}>
            <span className={i % 2 === 0? "l" : "r"}>
              <img alt="" src={ p.img }/>
            </span>
            <span className={i % 2 !== 0? "l" : "r"}>
              <h3>{ p.head }</h3>
              <p>{ p.description }</p>
              <p>{ p.problems }</p>
              <h3>{ p.technologies.head }</h3>
              <ul>
                { p.technologies.tech.map((l, i) => <li key={i}><i className={l.ico}></i></li>) }
              </ul>
              <h3>{ p.links.head }</h3>
              { p.links.href.map((a, i) =>
                <a target="_blank" rel="noopener noreferrer" key={i} href={a.href}>
                  { a.ico ? <i className={a.ico}></i> : a.text }
                </a>
              )}
            </span>
          </div>
        )
      }
    )}
    </>

  )
}

const Projects = ({ pr }) => {
  return(
    <div className="projects" id="projects">
      <span id="anchor-projects" className="anchor" />
      <h3>{ pr.head }</h3>
      <Project project={pr.projects} />
      <span id="accent"  className="accent-projects"></span>
    </div>
  )
}
export default Projects