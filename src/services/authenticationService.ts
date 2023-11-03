import axios from "axios";

const loginUserFromServer = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  axios.post("/api/auth/login", {
    username,
    password,
  });

const signupUserToServer = (userDetails: {}) =>
  axios.post("/api/auth/signup", {
    ...userDetails,
    avatarURL: "",
  });

const editUserToServer = ({
  userDetails,
  authToken,
}: {
  userDetails: {};
  authToken: string;
}) =>
  axios.post(
    "/api/users/edit",
    { userDetails },
    {
      headers: { authToken },
    }
  );

export { loginUserFromServer, signupUserToServer, editUserToServer };
