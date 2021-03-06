import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import notefulContext from './notefulContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import config from './config';
import CheckError from './CheckError';
import './App.css';

class App extends Component {
  
  state = {
      folders: [],
      notes: []
    };
  
  
  addNote = (note) => {
    this.setState({notes: [...this.state.notes, note]})
  }

  addFolder = (folder) => {
    this.setState({folders: [...this.state.folders, folder]})
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) 
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok) 
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()])
      }) 
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  renderNavRoutes() {
    return (
      <CheckError>
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
      </CheckError>
    );
  }

  renderMainRoutes() {
    return (
      <CheckError>
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        ))}
        <Route path='/note/:noteId' component={NotePageMain}/>
      </>
      </CheckError>
    );
  }


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder
    };
    return (
      <CheckError>
      <notefulContext.Provider value={contextValue}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header"> 
            <h1>
              <Link to="/">Noteful</Link>{' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>           
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>  
      </notefulContext.Provider>
      </CheckError>
    );
  }
}

export default App;
