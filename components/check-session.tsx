'use client'
import { useEffect } from 'react';
import { getUserSession } from "@/actions/api/obtain_session";
import { signOut } from "next-auth/react";


export default function CheckSession() {

  const testSession = async () => {
    const data = await getUserSession();
    if (data.error) {
      signOut({ redirectTo: '/auth/signin' });
    }
  };

  useEffect(() => {   
    testSession();
  }, []);

  return (
    null
  );
}
