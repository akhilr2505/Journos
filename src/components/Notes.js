import React, { Component } from "react";
import axios from "axios";
import "./Notes.css";
const bingOptions = {
  method: "GET",
  url: "https://bing-web-search1.p.rapidapi.com/search",
  params: {
    q: "Facebook",
    mkt: "en-us",
    safeSearch: "Off",
    textFormat: "Raw",
    freshness: "Day",
  },
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-web-search1.p.rapidapi.com",
    "x-rapidapi-key": "f307f52238msh3dcf619b228e213p15342djsn8de64caae052",
  },
};
// const bingSubscriptionKey =
//   "f307f52238msh3dcf619b228e213p15342djsn8de64caae052";
const urlForClearBit = (searchText) =>
  `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchText}`;
const urlForBing = (searchText) =>
  `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(
    searchText
  )}`;
const urlFor = (endpoint) =>
  `https://express-journal-app.herokuapp.com/${endpoint}`;

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: {},
      getAllNotes: [],
      searchData: [],
    };
  }
  // componentDidMount() {
  //   this.getNotes();
  // }

  getNotes = () => {
    axios
      .get(urlFor("notes"))
      .then((res) => this.setState({ notes: res.data }))
      .catch(console.error);
  };
  // Search Start
  handleSearch = (e) => {
    const searchText = e.target.value;
    // axios
    //   .get(urlForBing(searchText), {
    //     headers: { "Ocp-Apim-Subscription-Key": bingSubscriptionKey }
    //   })
    //   .then((res) => console.log(res))
    // .then((data) => {
    //   this.setState({
    //     searchData: data
    //   });
    // })
    // .catch(console.error);
    axios.request(bingOptions).then((res) => {
      console.log(res);
    });
  };

  // search end

  addNote = (note) => {
    axios
      .post(urlFor("notes"), note)
      .then((response) => {
        this.getNotes();
      })
      .catch((err) => {
        console.log(err, "not added try again");
      });
  };

  editNote = (note) => {
    this.setState({ note });
  };
  deleteNote = (noteId) => {
    axios
      .delete(urlFor(`notes/${noteId}`))
      .then(this.getNotes)
      .catch((err) => console.log(err));
  };
  updateNote = ({ id, title, content }) => {
    axios
      .put(urlFor(`notes/${id}`), { title, content })
      .then(this.getNotes)
      .then(this.setState({ note: {} }))
      .catch((err) => console.log(err));
  };

  render() {
    this.getNotes();
    const { note, notes } = this.state;

    return (
      <div className="notes">
        <h1 className="title">Journos</h1>

        <div className="mainNotesDiv">
          {/* Search Start */}
          {/*this.state.searchData.map((v, i) => (
            <a href={`https://www.${v.domain}`} target="_blank">
               <pre>{`https://www.${v.domain}`}</pre> 
              <img src={v.logo} />
            </a>
          ))*/}
          {/* <input type="text" onChange={this.handleSearch} /> */}
          {/* search end */}
          {/* <pre>{JSON.stringify(this.state.searchData, null, 2)}</pre> */}
          <div className="journal">
            <div className="leftPanel">
              {notes.map((note, id) => (
                <Note
                  note={note}
                  key={note._id}
                  editNote={this.editNote}
                  deleteNote={this.deleteNote}
                />
              ))}
            </div>
            <div className="rightPanel">
              <NoteForm
                key={note && note._id}
                note={note}
                addNote={this.addNote}
                updateNote={this.updateNote}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Note({ deleteNote, editNote, note }) {
  const { _id: noteId, title, content } = note;

  const handleDelete = () => deleteNote(noteId);
  const handleEdit = () => editNote(note);

  return (
    <div className="outerCardDiv">
      <div className="cardDiv">
        <div className="">
          <h5 className="cardTitle">{title}</h5>
        </div>
        <div className="cardBody">
          <p className="cardText">{content}</p>
        </div>
        <div className="cardFooter">
          <button className="editButton" onClick={handleEdit}>
            <i className="fa fa-edit" />
          </button>

          <button className="deleteButton" onClick={handleDelete}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
}

class NoteForm extends Component {
  state = {
    id: this.props.note._id || "",
    content: this.props.note.content || "",
    title: this.props.note.title || "",
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.note._id) {
      this.props.updateNote(this.state);
    } else {
      this.props.addNote(this.state);
    }
    this.setState({ content: "", title: "" });
  };

  render() {
    const { title, content } = this.state;

    return (
      <div className="journalForm">
        <form onSubmit={this.handleSubmit}>
          <div className="journalTitle">
            <label className="journalTitleLabel">Title</label>
            <input
              type="text"
              name="title"
              className="journalTitleInput"
              placeholder="Enter journal entry title"
              value={title}
              onChange={this.handleInput}
              required
            />
          </div>
          <div className="journalContent">
            <label className="journalContentLabel">Content</label>
            <textarea
              className="journalContentInput"
              name="content"
              rows="3"
              placeholder="Enter journal entry..."
              value={content}
              onChange={this.handleInput}
              required
            />
          </div>
          <button className="saveButton">Save Note</button>
        </form>
      </div>
    );
  }
}

export default Notes;
