const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "query",
  avatar: "m",
};
function User() {
  function handleClick() {}
  const user = FAKE_USER;
  return (
    <div>
      <img src="" alt="" />
      <span>Welcome,{user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
