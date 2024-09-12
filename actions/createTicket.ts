"use server";
import axios from "axios";
import { getXToken } from ".";

export async function createTicketAction(
  informer: string,
  issue: string,
  category: string
) {
  try {
    const token = await getXToken();
    return await axios
      .post(
        "https://geni.rs-elisabeth.com/makaryo/create_ticket",
        {
          informer: informer,
          issue: issue,
          category: category,
        },
        {
          headers: {
            "x-token": token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data["Message"];
      });
  } catch (error) {
    console.error(error);
  }
}
