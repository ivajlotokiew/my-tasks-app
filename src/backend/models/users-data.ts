import { User } from "../../features/tasks/tasksSlice";

export const users: User[] = [
  {
    id: 1,
    firstName: "Ivaylo",
    lastName: "Tokiev",
    username: "iv4o",
    password: "iv4o123",
    imgURL:
      "https://gravatar.com/avatar/52d4d352d73806258f1cdf65341244c6?s=400&d=robohash&r=x",
  },
  {
    id: 2,
    firstName: "Ivan",
    lastName: "Petrov",
    username: "ivancho",
    password: "ivan123",
    imgURL:
      "https://gravatar.com/avatar/a10b7cc30a246f2f2d2627a250ff3658?s=400&d=robohash&r=x",
  },
  {
    id: 3,
    firstName: "Petko",
    lastName: "Petkov",
    username: "petko",
    password: "petko123",
    imgURL:
      "https://gravatar.com/avatar/b2c11babc045b6357c261aff6b2d3962?s=400&d=robohash&r=x",
  },
];
