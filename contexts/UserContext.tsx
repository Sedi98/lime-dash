"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type UserContextType = {
  user: {
    id: string;
    email: string;
    user_metadata: {
      first_name: string;
      last_name: string;
    };
  } | null;

  logout: () => void;
  getUser: () => Promise<any>;
};

const UserContext = createContext<UserContextType>({
  user: null,

  logout: () => {},
  getUser: () => Promise.resolve(null),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [supabase] = useState(() => createClient());

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return null;
    } else {
      return user;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <UserContext.Provider value={{ getUser, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
