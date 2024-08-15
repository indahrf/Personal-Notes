import NotesItem from "./NotesItem";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function NotesListArchive({ notes, onDelete, onArchive }) {
  const archivedNotes = notes.filter((note) => note.archived === true);
  const noActiveNotes = archivedNotes.length === 0;

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <>
            {noActiveNotes ? (
              <p>
                {locale === "id"
                  ? "Tidak ada catatan yang diarsipkan."
                  : "No notes."}
              </p>
            ) : (
              <div className="notes-list">
                {archivedNotes.map((note) => (
                  <NotesItem
                    key={note.id}
                    id={note.id}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    {...note}
                  />
                ))}
              </div>
            )}
          </>
        );
      }}
    </LocaleConsumer>
  );
}

NotesListArchive.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesListArchive;
