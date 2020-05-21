import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from './CircleButton'
import notefulContext from './notefulContext'
import { findNote, findFolder } from './notes-helpers'
import PropTypes from 'prop-types'
import './NotePageNav.css'

class NotePageNav extends Component {
  
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: { }
    }
  }

  static contextType = notefulContext;

  render() {
    const { notes, folders } = this.context
    const { noteId } =  this.props.match.params
    const note  = findNote(notes, noteId) || {}
    const folder  = findFolder(folders, note.folderId) || {}

    console.log(note);

    return (
        <div className='NotePageNav'>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => this.props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
    )
  }  
}

NotePageNav.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.shape( () => {} ).isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({}).isRequired,
  }).isRequired
}

export default NotePageNav;