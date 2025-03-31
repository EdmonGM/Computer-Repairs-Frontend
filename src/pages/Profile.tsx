import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "../app/api";
import useStore from "../app/store";
import ProfileListItem from "../components/profile/ProfileListItem";
import ProfileEditModalBtn from "../components/profile/ProfileEditModalBtn";

function Profile() {
  const id = useStore((state) => state.id);
  const { data: user, isFetching } = useQuery({
    queryFn: () => GetUserById(id),
    queryKey: ["users"],
  });

  if (isFetching) return <p>Loading...</p>;

  if (user) {
    return (
      <>
        <section className="my-4">
          <h1>Your Profile</h1>
          <main className="card profile-border">
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
                      value={user.tickets.length}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </main>
          <div className="my-4">
            <ProfileEditModalBtn id="ProfileEdit" body="Edit Profile" />
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
