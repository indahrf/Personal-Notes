import { showFormattedDate } from "../utils/index";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import ArchiveButton2 from "./ArchiveButton2";
import PropTypes from "prop-types";

function NotesItem({
  title,
  createdAt,
  body,
  archived,
  id,
  onDelete,
  onArchive,
}) {
  const dates = showFormattedDate(createdAt);

  return (
    <div className="note-item">
      <div className="note-item__content">
        <Link className="note-item__title" to={`/notes/${id}`}>
          {title}
        </Link>
        <p className="note-item__date">{dates}</p>
        <p className="note-item__body">{body}</p>
      </div>
      <DeleteButton id={id} onDelete={onDelete} />
      {archived ? (
        <ArchiveButton2 id={id} onArchive={onArchive} />
      ) : (
        <ArchiveButton id={id} onArchive={onArchive} />
      )}
    </div>
  );
}

NotesItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NotesItem;
