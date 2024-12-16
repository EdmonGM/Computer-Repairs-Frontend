import useStore from "../app/store";

export function HomePage() {
  const { username } = useStore();

  return (
    <>
      <h1>Welcome {username}</h1>
      <p></p>
    </>
  );
}
