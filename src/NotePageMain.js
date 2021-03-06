import React, { Component }from 'react'
import Note from './Note'
import notefulContext from './notefulContext'
import { findNote } from './notes-helpers'
import PropTypes from 'prop-types'
import './NotePageMain.css'

class NotePageMain extends Component {
  
  static defaultProps ={
    match: {
      params: {}
    }
  }

  static contextType = notefulContext;

  handleDeleteNote = noteId => {
    this.props.history.push('/')
  }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

PropTypes.shape({
  match: PropTypes.object
})
// NotePageMain.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({}).isRequired,
//   }).isRequired
// }

export default NotePageMain;