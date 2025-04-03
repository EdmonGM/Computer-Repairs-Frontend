import { useEffect } from "react";
import Navbar from "./Navbar";
import { useUserStore } from "../app/store";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "../app/api";
import { Outlet } from "react-router-dom";

function Layout() {
  const { setData } = useUserStore();
  const { data: user, isSuccess } = useQuery({
    queryFn: GetCurrentUser,
    queryKey: ["current_user"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess)
      setData(user.userName, user.email, user.id, user.name, user.role);
  }, [user?.id]);
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
