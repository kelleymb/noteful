import React, { Component } from 'react';
import notefulContext from './notefulContext';
import ValidationError from './ValidationError';
import config from './config';
import CheckError from './CheckError';
import './AddNote.css';
import PropTypes from 'prop-types';

class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteName: '',
            noteContent: '',
            folder: '',
            folderId: ''
        };
    }

    static contextType = notefulContext;

    updateNoteName(name) {
        this.setState({noteName: name}, () => {this.validateNoteName(name)})
    }

    updateContent(content) {
        this.setState({noteContent: content}, () => {this.validateContent(content)})
    }

    updateFolder(name) {
        this.setState({folder: name}, () => {this.validateFolder(name)})
    }

    validateNoteName() {
        const noteName = this.state.noteName.trim();
        if (noteName.length === 0) {
            return "A name for the note is required.";
        } else if (noteName.length < 3) {
            return 'Please enter a note name over 3 characters.';
        }
    }

    validateFolder(name) {
        if(this.context.folders.find((folder) => folder.id === name) === undefined) {
            return 'Folder selection is invalid. Please try again.';
        }; 
        console.log(name);
    }

    validateContent() {
        const content = this.state.noteContent.trim();
        if(content.length === 0) {
            return 'Please provide content for the note.'
        } else if (content.length < 3) {
            return 'Please enter more than 3 characters for content.'
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const folderId = this.state.folder;
        const content = this.state.noteContent;
        const name = this.state.noteName;

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                folderId: folderId, 
                name: name, 
                modified: new Date(), 
                content: content
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Unable to add note.')
            }
            return response.json();
        })
        .then(note => {
            this.context.addNote(note)
        })
        .catch(error => {
            console.error({error})
        });
    }

    render() {
        const nameError = this.validateNoteName(this.state.noteName);
        const folderError = this.validateFolder(this.state.folder);
        const contentError = this.validateContent(this.state.noteContent);

        const { folders = [] } = this.context;


        return (
            <CheckError>
            <form className='add-note-form' onSubmit={e => {this.handleSubmit(e)}}>
                <h2>Add Note</h2>
                <div className='add-note-name-group'>
                    <label htmlFor='add-note-name'>Note Name</label><br />
                    <input
                        type='text'
                        className='add-note-name'
                        name='add-note'
                        id='add-note'
                        onChange={e => {this.updateNoteName(e.target.value)}}>
                    </input>
                    <ValidationError message={nameError}/>
                </div>
                <div className='add-note-content-group'>
                    <label htmlFor='add-content'>Add content to note</label><br />
                    <input
                        type='text'
                        className='add-content'
                        name='add-content'
                        id='add-content'
                        onChange={e => {this.updateContent(e.target.value)}}>
                    </input>
                    <ValidationError message={contentError}/>
                </div>
                <div className='add-note-select-folder-group'>
                    <label htmlFor='select-folder'>Select a folder</label><br />
                    <select 
                        id='folder'
                        name='folder'
                        onChange={e => {this.updateFolder(e.target.value)}}>
                        {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    <ValidationError message={folderError}/>
                </div>
                <div className='button-group'>
                    <button
                        type='submit'
                        className='submit-button'
                        disabled={
                            this.validateNoteName(this.state.noteName) ||
                            this.validateFolder(this.state.folder) ||
                            this.validateContent(this.state.noteContent)
                        }
                    >
                    Submit
                    </button>
                </div>
            </form>
            </CheckError>
        );
    }
}

AddNote.propTypes = {
    noteName: PropTypes.string.isRequired,
    noteContent: PropTypes.string.isRequired,
    folder: PropTypes.string.isRequired,
    folderId: PropTypes.string
}

export default AddNote;