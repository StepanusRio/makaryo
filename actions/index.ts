"use server";
import { EmployeeType } from "@/types";
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

// Get all Employee by Devisi
export async function getEmployee(bagian: string) {
  const token = await getXToken();
  const allEmployee = await axios
    .get("https://geni.rs-elisabeth.com/makaryo/all_employee", {
      headers: {
        "x-token": token,
      },
    })
    .then((res) => {
      const employee = res.data["Data"];
      const filtered = employee.filter(
        (employer: EmployeeType) => employer.MAKARYO_BAGIAN === bagian
      );
      return filtered;
    });
  return allEmployee;
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
export async function updateStatusAction(
  ticket_id: string,
  status_ticket: string
) {
  const token = await getXToken();
  const status = await axios
    .post(
      "https://geni.rs-elisabeth.com/makaryo/update_ticket",
      { ticket_id, status_ticket },
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
  return status;
}

// TODO: UPDATE NOTE ACTION
export async function updateNotesAction(ticket_id: string, note: string) {
  const token = await getXToken();
  const notes = await axios
    .post(
      "https://geni.rs-elisabeth.com/makaryo/modify_note",
      { ticket_id, note },
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
  return notes;
}

// TODO: CLOSE TICKET ACTION
export async function closeTicketAction(
  ticket_id: string,
  worker: string,
  summary: string,
  issue_type: string
) {
  const token = await getXToken();
  const closeTicket = await axios
    .post(
      "https://geni.rs-elisabeth.com/makaryo/close_ticket",
      {
        ticket: ticket_id,
        worker,
        summary,
        issue_type,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      return data["Message"];
    });
  return closeTicket;
}

export async function delegateTicketAction(
  ticket_id: string,
  category: string
) {
  const token = await getXToken();
  const delegateTicket = await axios
    .post(
      "https://geni.rs-elisabeth.com/makaryo/delegate_ticket",
      {
        ticket_id,
        category,
      },
      {
        headers: {
          "x-token": token,
        },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      return data["Message"];
    });
  return delegateTicket;
}
