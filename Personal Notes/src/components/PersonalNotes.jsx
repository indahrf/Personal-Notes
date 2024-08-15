import React from "react";
import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import ArchivePage from "../pages/ArchivePage";
import DetailPage from "../pages/DetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";
import ToggleTheme from "../components/ToggleTheme";
import ToggleLanguage from "../components/ToggleLanguage";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LocaleProvider } from "../contexts/LocaleContext";

class PersonalNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="personal-notes">
              <header className="note-app__header">
                <h1>
                  {this.state.localeContext.locale === "id"
                    ? "Aplikasi Catatan"
                    : "Notes App"}
                </h1>
                <ToggleLanguage />
                <ToggleTheme />
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      );
    }

    return (
      <>
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <header>
              <div className="note-app__header">
                <h1>
                  {this.state.localeContext.locale === "id"
                    ? "Catatan"
                    : "Notes"}
                </h1>
                <ToggleLanguage />
                <ToggleTheme />
                <Navigation
                  logout={this.onLogout}
                  name={this.state.authedUser.name}
                />
              </div>
            </header>
            <main>
              <div className="note-app__body">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/archives" element={<ArchivePage />} />
                  <Route path="/add" element={<AddPage />} />
                  <Route path="/notes/:id" element={<DetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </main>
          </ThemeProvider>
        </LocaleProvider>
      </>
    );
  }
}

PersonalNotes.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
  toggleTheme: PropTypes.func,
  toggleLanguage: PropTypes.func,
  localeContext: PropTypes.shape({
    locale: PropTypes.oneOf(["id", "en"]),
    toggleLocale: PropTypes.func,
  }),
};

export default PersonalNotes;
