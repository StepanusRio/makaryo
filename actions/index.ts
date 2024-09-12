"use server";

import axios from "axios";

export async function getXToken() {
  const token = await axios
    .post(
      "https://geni.rs-elisabeth.com/authentication/create_token?username=rsses&password=Rzxdiablo12"
    )
    .then((res) => res.data["X-Token"]);
  return token;
}

export async function getAllTicket() {
  const token = await getXToken();
  const ticket = await axios
    .get("https://geni.rs-elisabeth.com/makaryo/all_ticket", {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => res.data["Data"]);
  return ticket;
}

export async function getAllCategory() {
  const token = await getXToken();
  const category = await axios
    .get("https://geni.rs-elisabeth.com/makaryo/category", {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => res.data["Data"]);
  return category;
}

export async function getUserFromApi(username: string, password: string) {
  const token = await getXToken();
  const user = await axios
    .post(
      "https://geni.rs-elisabeth.com/makaryo/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      return data;
    });
  return user["Data"][0];
}

// TODO: UPDATE STATUS ACTION

// TODO: UPDATE NOTE ACTION

// TODO: CLOSE TICKET ACTION
