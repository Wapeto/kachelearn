import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import L1Page from "./components/L1Page";
import L2Page from "./components/L2Page";
import L3Page from "./components/L3Page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedPage from "./components/ProtectedPage";
import { AuthProvider } from "./contexts/AuthContext";
import NotFound from "./components/NotFound";
import UploadPortfolio from "./components/UploadPortfolio";
import UploadObjectives from "./components/UploadObjectives";
import UploadBibliography from "./components/UploadBibliography";
import VocabularyPage from "./components/VocabularyPage";
import GrammarPage from "./components/GrammarPage";
import YoutubePage from "./components/YoutubePage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/test" element={<h2>It works</h2>} />
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <ProtectedPage />
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/L1" element={<L1Page />} />
            <Route
              path="/L1/upld-port"
              element={<UploadPortfolio classx={"L1"} />}
            />
            <Route
              path="/L1/upld-obj"
              element={<UploadObjectives classx={"L1"} />}
            />
            <Route
              path="/L1/vocab"
              element={<VocabularyPage classx={"L1"} />}
            />
            <Route path="/L1/grammar" element={<GrammarPage classx={"L1"} />} />
            <Route path="/L1/ytb" element={<YoutubePage classx={"L1"} />} />
            <Route path="/L2" element={<L2Page />} />
            <Route
              path="/L2/upld-biblio"
              element={<UploadBibliography classx={"L2"} />}
            />
            <Route
              path="/L2/vocab"
              element={<VocabularyPage classx={"L2"} />}
            />
            <Route path="/L2/grammar" element={<GrammarPage classx={"L2"} />} />
            <Route path="/L2/ytb" element={<YoutubePage classx={"L2"} />} />
            <Route path="/L3" element={<L3Page />} />
            <Route
              path="/L3/upld-biblio"
              element={<UploadBibliography classx={"L3"} />}
            />
            <Route
              path="/L3/vocab"
              element={<VocabularyPage classx={"L3"} />}
            />
            <Route path="/L3/grammar" element={<GrammarPage classx={"L3"} />} />
            <Route path="/L3/ytb" element={<YoutubePage classx={"L3"} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
library.add(fab, fas, far);
