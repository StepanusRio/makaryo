import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getXToken(){
  const token = await fetch(`https://geni.rs-elisabeth.com/authentication/create_token?username=rsses&password=Rzxdiablo12`,{
    method:"POST",
  }).then(res => res.json()).then(data => {
    return data["X-Token"];
  });
  return token;
}

export async function getUserFromApi(token:string,username:string,password:string){
  const user = await fetch("https://geni.rs-elisabeth.com/makaryo/login",{
    method:"POST",
    headers:{
      "x-token":token,
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      username:username,
      password:password,
    })
  }).then(res => res.json()).then(data => {
    return data;
  });
  return user["Data"][0];
}