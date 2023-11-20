import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

// import Books from "./components/Books";
// import Add from "./components/Add";
// import Update from "./components/Update";

const Books = lazy(() => import("./components/Books"));
const Add = lazy(() => import("./components/Add"));
const Update = lazy(() => import("./components/Update"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Books />
            </Suspense>
          }
        />
        <Route
          path="/add"
          element={
            <Suspense fallback={<Loading />}>
              <Add />
            </Suspense>
          }
        />
        <Route
          path="/update/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Update />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
