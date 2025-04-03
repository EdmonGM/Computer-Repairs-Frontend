import { useParams } from "react-router-dom";
import ProfileModalBtn from "../components/profile/ProfileModalBtn";
import ProfileListItem from "../components/profile/ProfileListItem";
import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "../app/api";
import NotFound from "./NotFound";
import { useUserStore } from "../app/store";
import UserEditModal from "../components/profile/UserEditModal";
import ProfileEditModal from "../components/profile/ProfileEditModal";
import ProfileDeleteModal from "../components/profile/ProfileDeleteModal";

function Profile() {
  const { id } = useParams();
  const { role, id: currentUserId } = useUserStore();
  const {
    data: user,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => GetUserById(id ?? ""),
    queryKey: ["users"],
    staleTime: Infinity,
    refetchOnMount: "always",
    retry: false,
  });

  if (isFetching) return <p>Loading...</p>;

  if (isError) return <NotFound />;

  if (isSuccess)
    return (
      <>
        <section className="my-4">
          {user.id == id ? (
            <h1>Your Profile</h1>
          ) : (
            <h1>{user.userName} Profile</h1>
          )}
          <div className="card profile-border">
            <div className="row">
              <div className="col-md-4 col d-flex justify-content-center">
                <img src="/person-1.png" alt="Profile Picture" className="" />
              </div>
              <div className="col-md-8 col d-flex align-items-center">
                <div className="card-body ">
                  <ul className="list-group list-group-flush">
                    <ProfileListItem title="Id" value={user.id} />
                    <ProfileListItem title="Name" value={user.name} />
                    <ProfileListItem title="Username" value={user.userName} />
                    <ProfileListItem title="Email" value={user.email} />
                    <ProfileListItem title="Salary" value={user.salary + "$"} />
                    <ProfileListItem title="Role" value={user.role} />
                    <ProfileListItem
                      title="Number of tickets"
                      value={user?.tickets?.length}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 d-flex gap-3">
            <ProfileModalBtn id="ProfileEdit" body="Edit Profile" />
            {role === "Admin" && user.id != currentUserId && (
              <ProfileModalBtn
                id="UserDelete"
                body="Delete User"
                color="danger"
              />
            )}
          </div>
        </section>
        {role === "Admin" ? (
          <UserEditModal
            id="ProfileEdit"
            label="ProfileEditModal"
            title="Edit User"
            user={user}
          />
        ) : (
          <ProfileEditModal
            id="ProfileEdit"
            label="ProfileEditModal"
            title="Edit Your Profile"
          />
        )}
        <ProfileDeleteModal id="UserDelete" label="DeleteUserModal" />
      </>
    );
}

export default Profile;
