import React, {useEffect} from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router";
import { useNavigation } from "react-router";
import nProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

function BaseLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    if (navigation.state === "loading") {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [navigation.state]);

  if (isNavigating) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default BaseLayout;
