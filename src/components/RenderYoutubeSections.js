import React from 'react'
import YoutubeEmbed from './YoutubeEmbed';

export default function RenderYoutubeSections({textInpt}) {
    const sections = [];
    const text = textInpt.split('#').slice(1)
    text.forEach((section) => {
        const title = section.split('\n')[0]
        const links = section.split('\n').slice(1)
        sections.push({title, links})
    })
    console.log(sections)
  return (
    <div>
        {sections.map((section) => {
            return (
                <div className='ytb-section-container'>
                    <h2>{section.title}</h2>
                    <ul className="video-frame-container">
                        {section.links.map((link) => {
                            if (link !== ''){
                                return (
                                    <YoutubeEmbed embedId={link} />
                                )
                            }
                            return null
                        })}
                    </ul>
                </div>
            )
        })}
    </div>
  )
}
