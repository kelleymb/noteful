import React, { Component } from 'react';
import NoteContext from './NoteContext';
import ValidationError from './ValidationError';
import config from './config';

class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    static contextType = NoteContext;

    updateFolder(name) {
        this.setState( {name: name}, () => this.validateFolder(name) )
    }

    validateFolder() {
        const folder = this.state.name.trim();
        if(folder.length === 0) {
            return 'Please enter a Folder name.'
        } else if (folder.length < 3) {
            return 'Please enter a Folder name over three characters!'
        }
    }

    handleSubmit(e, name) {
        e.preventDefault();
        
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name: name})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Unable to add folder.')
            }
            return response.json();
        })
        .catch(error => {
            console.error({error})
        });       
    }

    render() {
        const nameError = this.validateFolder();

        return (
            <form className='add-folder-form' onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Folder</h2>
                <div className='add-folder-form-group'>
                    <label htmlFor='add-folder-name'>Folder name</label>
                    <input
                        type='text'
                        className='add-folder'
                        name='add-folder'
                        id='add-folder'
                        onChange={e => this.updateFolder(e.target.value)}>
                    </input>
                    <ValidationError message={nameError}/>
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
                        className='new-folder-button'
                        disabled={this.validateFolder()}
                    >
                    Submit
                    </button> 
                </div>
                
            </form>
        );
    }
}

export default AddFolder;