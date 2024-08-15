import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      maxTitleLength: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    let inputTitle = event.target.value;

    if (inputTitle.length > this.state.maxTitleLength) {
      inputTitle = inputTitle.substring(0, this.state.maxTitleLength);
    }

    this.setState({
      title: inputTitle,
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState({
      body: event.target.value,
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    const remainingCharacters =
      this.state.maxTitleLength - this.state.title.length;

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <>
              <h2>{locale === "id" ? "Buat catatan" : "Write note"}</h2>
              <p>
                {locale === "id"
                  ? "Jumlah karakter tersisa:"
                  : "Number of remaining characters:"}{" "}
                {remainingCharacters}
              </p>
              <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <input
                  type="text"
                  placeholder={
                    locale === "id"
                      ? "Masukkan judul di sini..."
                      : "Enter title here..."
                  }
                  value={this.state.title}
                  onChange={this.onTitleChangeEventHandler}
                />
                <textarea
                  value={this.state.body}
                  onChange={this.onBodyChangeEventHandler}
                  placeholder={
                    locale === "id"
                      ? "Tulis catatanmu di sini..."
                      : "Write your notes here..."
                  }
                  rows={10}
                  cols={50}
                />
                <button type="submit">
                  {locale === "id" ? "Simpan" : "Save"}
                </button>
              </form>
            </>
          );
        }}
      </LocaleConsumer>
    );
  }
}

NotesInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NotesInput;
