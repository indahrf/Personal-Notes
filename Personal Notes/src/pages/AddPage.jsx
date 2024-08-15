import PropTypes from "prop-types";
import { addNote } from "../utils/api";
import NotesInput from "../components/NotesInput";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(contact) {
    await addNote(contact);
    navigate("/");
  }

  return (
    <section>
      <NotesInput addNote={onAddNoteHandler} />
    </section>
  );
}

AddPage.propTypes = {
  addNote: PropTypes.func,
};

export default AddPage;
