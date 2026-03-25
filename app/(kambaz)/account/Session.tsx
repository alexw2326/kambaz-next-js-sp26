/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    const currentUser = await client.profile();
    dispatch(setCurrentUser(currentUser));
    setPending(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);
  if (!pending) {
    return children;
  }
}
