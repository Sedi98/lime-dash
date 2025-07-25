"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/shared/Input";
import { LuMail } from "react-icons/lu";
import { LuLock, LuLogIn, LuCircleX } from "react-icons/lu";
import Button from "@/components/shared/Button";
import Alert from "@/components/shared/Alert";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Email və şifrə tələb olunur");
        return false;
      }
      const response = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        
        setLoading(false);
        setError("");
        router.push("/dash");

      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-base-200">
      <div className="flex flex-col gap-4 w-sm mx-auto rounded p-6 bg-base-100">
        <h1 className="text-xl font-semibold text-center">Login</h1>
        {error && (
          <Alert
            icon={<LuCircleX className="text-lg" />}
            variant="solid"
            color="error"
            className="alert-error"
            description={error}
            onClose={() => setError("")}
          />
        )}
        <Input
          changeAction={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="w-full"
          placeholder="Email"
          size="md"
          type="email"
          icon={<LuMail />}
        />
        <Input
          changeAction={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          className="w-full"
          placeholder="Password"
          size="md"
          type="password"
          icon={<LuLock />}
        />
        <Button
          onClick={handleLogin}
          startIcon={<LuLogIn className="text-lg" />}
          loading={loading}
          size="md"
        >
          Daxil ol
        </Button>
        <span className="text-center">
          Hesabınız yoxdur?{" "}
          <Link href="/auth/register" className="text-primary">
            Qeydiyyat
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
