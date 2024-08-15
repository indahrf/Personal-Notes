import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NotesList from "../components/NotesList";
import { archiveNote, deleteNote, getActiveNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import LoadingIndicator from "../components/LoadingIndicator";
import { LocaleConsumer } from "../contexts/LocaleContext";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

function HomePage({ defaultKeyword, keywordChange }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(defaultKeyword || "");

  const fetchNotes = async () => {
    try {
      const { data } = await getActiveNotes();
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

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
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
                <h2>{locale === "id" ? "Catatan Aktif" : "Active Note"}</h2>
                <NotesList
                  notes={filteredNotes}
                  onDelete={onDeleteHandler}
                  onArchive={onArchiveHandler}
                />
              </>
            )}
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default HomePageWrapper;
