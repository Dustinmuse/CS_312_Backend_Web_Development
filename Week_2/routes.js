import nodeFetch from "node-fetch";

const fetch = nodeFetch;

// /hello endpoint - returns "Hello World!"
const hello = (req, res) => {
  res.send("Hello World!");
};

// /api/names endpoint - displays a list of usernames and IDs
const apiNames = async (req, res) => {
  const url = "https://www.usemodernfullstack.dev/api/v1/users";
  let data;

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
    return;
  }

  const userList = data.map((user) => `ID: ${user.id} - Username: ${user.name}`).join("<br>");
  res.send(userList);
};

export { hello, apiNames };
