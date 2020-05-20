import React, { Component } from 'react';
import NoteContext from './NoteContext';
import ValidationError from './ValidationError';
import config from './config';

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

    static contextType = NoteContext;

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

    validateFolder() {
        const folder = this.context.folders.name.trim();
        if(folder === folder) {
            return folder;
        } else if (folder !== folder) {
            return 'Folder selection is invalid. Please try again';
        }
    }

    validateContent() {
        const content = this.state.noteContent.trim();
        if(content.length === 0) {
            return 'Please provide content for the note.'
        } else if (content.length < 3) {
            return 'Please enter more than 3 characters for content.'
        }
    }

    handleSubmit(e, name, content, folderId, date) {
        e.preventDefault();

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({folderId: folderId}, {name: name}, {modified: date}, {content: content})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Unable to add note.')
            }
            return response.json();
        })
        .catch(error => {
            console.error({error})
        });
    }

    render() {
        const nameError = this.validateNoteName();
        const folderError = this.validateFolder();
        const contentError = this.validateContent();

        return (
            <form className='add-note-form' onSubmit={e => {this.handleSubmit(e)}}>
                <h2>Add Note</h2>
                <div className='add-note-name-group'>
                    <label htmlFor='add-note-name'>Note Name</label>
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
                    <label htmlFor='add-content'>Add content to note</label>
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
                    <label htmlFor='folder-name'>Folder Name</label>
                    <input 
                        type='text'
                        className='folder-name'
                        name='folder'
                        id='folder'
                        onChange={e => {this.updateFolder(e.target.value)}}>
                    </input>
                    <ValidationError message={folderError}/>
                </div>
                <div className='button-group'>
                    <button 
                        type='reset' 
                        className='cancel-button'
                    >
                    Cancel
                    </button>
                    <button
                        type='submit'
                        className='submit-button'
                        disabled={
                            this.validateNoteName() ||
                            this.validateFolder() ||
                            this.validateContent()
                        }
                    >
                    Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default AddNote;