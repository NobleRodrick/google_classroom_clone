import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Drawer, JoinedClasses, Login, Main } from "./components";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";  // Import useLocalContext to access context
import db from "./lib/firebase";

function App() {
  const { loggedInMail } = useLocalContext(); // Access context values

  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    if (loggedInMail) {
      const unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

  useEffect(() => {
    if (loggedInMail) {
      const unsubscribe = db
        .collection("JoinedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
        });

      return () => unsubscribe();
    }
  }, [loggedInMail]);

  return (
    <Router>
      <Routes>
        {createdClasses.map((item, index) => (
          <Route
            key={index}
            path={`/${item.id}`}
            element={
              <>
                <Drawer />
                <Main classData={item} />
              </>
            }
          />
        ))}

        {joinedClasses.map((item, index) => (
          <Route
            key={index}
            path={`/${item.id}`}
            element={
              <>
                <Drawer />
                <Main classData={item} />
              </>
            }
          />
        ))}

        {/* Redirect if already logged in */}
        <Route
          path="/signin"
          element={
            <IsUserRedirect user={loggedInMail} loggedInPath="/">
              <Login />
            </IsUserRedirect>
          }
        />

        {/* Protected route for the main page */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={loggedInMail}>
              <>
                <Drawer />
                <ol className="joined">
                  {createdClasses.map((item) => (
                    <JoinedClasses key={item.id} classData={item} />
                  ))}
                  {joinedClasses.map((item) => (
                    <JoinedClasses key={item.id} classData={item} />
                  ))}
                </ol>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

