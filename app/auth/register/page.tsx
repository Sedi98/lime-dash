"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/shared/Input";
import { LuMail } from "react-icons/lu";
import { LuLock, LuCircleX, LuUser, LuUserPlus } from "react-icons/lu";
import Button from "@/components/shared/Button";
import Alert from "@/components/shared/Alert";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Email və şifrə tələb olunur");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Düzgün email ünvanı daxil edin");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Şifrə ən az 6 simvol olmalıdır");
        return false;
      }
      if (!formData.first_name || !formData.last_name) {
        setError("Ad və soyad tələb olunur");
        return false;
      }

      console.log(formData);
      
      const response = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        
        setLoading(false);
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
        <h1 className="text-xl font-semibold text-center">Qeydiyyat</h1>
        {error && (
          <Alert
            icon={<LuCircleX className="text-lg" />}
            variant="solid"
            color="error"
            description={error}
            onClose={() => setError("")}
          />
        )}
        <Input
          changeAction={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, first_name: e.target.value });
          }}
          className="w-full"
          placeholder="Ad"
          size="md"
          type="text"
          icon={<LuUser />}
        />
        <Input
          changeAction={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, last_name: e.target.value });
          }}
          className="w-full"
          placeholder="Soyad"
          size="md"
          type="text"
          icon={<LuUser />}
        />
        <Input
          changeAction={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="w-full"
          placeholder="Email"
          size="md"
          type="email"
          icon={<LuMail />}
        />
        <Input
          changeAction={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          className="w-full"
          placeholder="Password"
          size="md"
          type="password"
          icon={<LuLock />}
        />
        <Button
          onClick={handleRegister}
          startIcon={<LuUserPlus className="text-lg" />}
          loading={loading}
          size="md"
        >
          Qeydiyyat
        </Button>
        <span className="text-center">
          Hesabınız var?{" "}
          <Link href="/auth/login" className="text-primary">
            Daxil olun
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
