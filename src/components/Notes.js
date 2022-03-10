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
        <div className="mainNotesDiv">
          <h1>React Notes App</h1>

          {/* Search Start */}
          {this.state.searchData.map((v, i) => (
            <a href={`https://www.${v.domain}`} target="_blank">
              {/* <pre>{`https://www.${v.domain}`}</pre> */}
              <img src={v.logo} />
            </a>
          ))}
          <br />
          <input type="text" onChange={this.handleSearch} />
          {/* search end */}
          <pre>{JSON.stringify(this.state.searchData, null, 2)}</pre>
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
    <div className="card p-3 m-3   box-shadow">
      <div className="card-header">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
      <div className="card-footer text-muted">
        <button className="btn btn-default float-none" onClick={handleEdit}>
          <i className="fa fa-edit" />
        </button>

        <button className="btn btn-danger float-none" onClick={handleDelete}>
          <i className="fa fa-trash" />
        </button>
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
      <div className="p-3 m-3 jumbotron ">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className=" font-weight-bold col-sm-2 col-form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control m-2"
              placeholder="Enter Note Title"
              value={title}
              onChange={this.handleInput}
              required
            />
          </div>
          <div className="form-group row">
            <label className="font-weight-bold col-sm-2 col-form-label">
              Content
            </label>
            <textarea
              className="form-control m-2"
              name="content"
              rows="3"
              placeholder="Enter Note Content"
              value={content}
              onChange={this.handleInput}
              required
            />
          </div>
          <button className=" font-weight-bold btn btn-outline-primary form-group row m-4">
            Save Note
          </button>
        </form>
      </div>
    );
  }
}

export default Notes;
