import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import PageNotFound from "./404/PageNotFound";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import CharactersPage from "./characters/CharactersPage";
import CharacterPage from "./characters/CharacterPage";
import withAuth from "../hoc/withAuth";

function SecuredApp() {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="characters/:characterId" element={<CharacterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default withAuth(SecuredApp);
