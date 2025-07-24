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
  loading: boolean;
  error: Error | null;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    console.log(pathname === "/auth/register");

    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        pathname !== "/auth/register" && router.push("/auth/login");
      }

      setUser(user);
      setError(error);
      setLoading(false);
    };
    getUser();
  }, [supabase, pathname]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <UserContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
