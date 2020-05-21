import React, { Component } from 'react';
import notefulContext from './notefulContext';
import ValidationError from './ValidationError';
import config from './config';
import CheckError from './CheckError';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    static contextType = notefulContext;

    updateFolder(name) {
        this.setState( {name: name}, () => this.validateFolder(name) )
    }

    validateFolder() {
        const folder = this.state.name.trim();
        if(folder.length === 0) {
            return 'Please enter a Folder name.';
        } else if (folder.length < 3) {
            return 'Please enter a Folder name over three characters!';
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
        .then(folder => {
            this.context.addFolder(folder)
        })
        .catch(error => {
            console.error({error})
        });       
    }

    render() {
        const nameError = this.validateFolder();

        return (
            <CheckError>
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
                        type='submit'
                        className='new-folder-button'
                        disabled={this.validateFolder()}
                    >
                    Submit
                    </button> 
                </div>
            </form>    
            </CheckError>
        );
    }
}

AddFolder.propTypes = {
    name: PropTypes.string.isRequired,
}

export default AddFolder;