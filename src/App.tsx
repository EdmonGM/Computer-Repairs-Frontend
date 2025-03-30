import "./App.css";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import Profile from "./pages/Profile";
import TicketEdit from "./pages/TicketEdit";
import TicketCreate from "./pages/TicketCreate";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "./app/api";
import useStore from "./app/store";
import ProfileEditModal from "./components/profile/ProfileEditModal";

function App() {
  const { setData, username } = useStore();
  const {
    data: user,
    isSuccess,
    isFetching,
  } = useQuery({
    queryFn: GetCurrentUser,
    queryKey: ["users"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (isSuccess) setData(user.userName, user.email, user.id, user.name);
  }, [isSuccess]);
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<HomePage username={username} isFetching={isFetching} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tickets">
            <Route path=":id" element={<TicketEdit />} />
            <Route path="new" element={<TicketCreate />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ProfileEditModal
        id="ProfileEdit"
        label="ProfileEditModal"
        title="Edit Your Profile"
      />
    </>
  );
}

export default App;
