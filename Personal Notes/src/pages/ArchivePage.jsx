import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NotesListArchive from "../components/NotesListArchive";
import SearchBar from "../components/SearchBar";
import { deleteNote, unarchiveNote, getArchivedNotes } from "../utils/api";
import LoadingIndicator from "../components/LoadingIndicator";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

function ArchivePage({ defaultKeyword, keywordChange }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(defaultKeyword || "");

  const fetchNotes = async () => {
    try {
      const { data } = await getArchivedNotes();
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    await fetchNotes();
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    await fetchNotes();
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    keywordChange(keyword);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section>
            <SearchBar
              keyword={keyword}
              keywordChange={onKeywordChangeHandler}
            />
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <h2>{locale === "id" ? "Catatan Arsip" : "Archive Note"}</h2>
                <NotesListArchive
                  notes={filteredNotes}
                  onDelete={onDeleteHandler}
                  onArchive={onUnarchiveHandler}
                />
              </>
            )}
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default ArchivePageWrapper;
