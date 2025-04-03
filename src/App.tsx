import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import Profile from "./pages/Profile";
import TicketEdit from "./pages/TicketEdit";
import TicketCreate from "./pages/TicketCreate";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/UsersPage";
import Alert from "./components/Alert";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="/tickets">
            <Route path=":id" element={<TicketEdit />} />
            <Route path="new" element={<TicketCreate />} />
          </Route>
          <Route path="/users">
            <Route index element={<UsersPage />} />
            <Route path=":id" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Alert />
    </>
  );
}

export default App;
