import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosInstance = useAxios();

  const signUpUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userInfo.user;

      // update userinfo in the database
      const createdUserInfo = {
        name: name,
        email: email,
        role: "user", // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", createdUserInfo);

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      return userInfo;
    } catch (error) {
      setLoading(false);
      toast.error(`${error.message}` || "An error occurred during sign-up");
    }
  };

  const signInUser = async (email, password) => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      
      return user;
    } catch (error) {
      setLoading(false);
      toast.error(`${error.message}` || "An error occurred during sign-in");
    }
  };

  const signInUserWithGoogle = async () => {
    //signInUserWithGoogle
    setLoading(true);
    try {
      const user = await signInWithPopup(auth, provider);
      // update userinfo in the database
      const createdUserInfo = {
        name: user.user.displayName,
        email: user.user.email,
        role: "user", // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post("/users", createdUserInfo);
      console.log(userRes.data);
      return user;
    } catch (error) {
      setLoading(false);
      toast.error(`${error.message}` || "An error occurred during sign-in");
    }
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    signUpUser,
    signInUser,
    signOutUser,
    signInUserWithGoogle,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
}

export default AuthProvider;
