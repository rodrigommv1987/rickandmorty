import { Route, Routes } from "react-router-dom";

import PageNotFound from "./404/PageNotFound";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "./home/HomePage";
import CharactersPage from "./characters/CharactersPage";
import CharacterPage from "./characters/CharacterPage";
import withAuth from "../hoc/withAuth";

function SecuredApp() {
  return (
    <>
      <main className="app">
        <Header />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="characters/:characterId" element={<CharacterPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuth(SecuredApp);
