import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null); // Initially null to prevent early redirection
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        setIsAdmin(userSnap.exists() && userSnap.data().role === "admin");
      } else {
        setIsAdmin(false);
      }
    };

    if (user !== null) {
      checkAdmin();
    }
  }, [user]);

  if (loading || isAdmin === null) return <p>Loading...</p>;

  return user && isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;