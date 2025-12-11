"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onError: () => {
        window.alert("something went wrong");
      },
      onSuccess: () => {
        window.alert("success");
      }
    });
  }
  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
        <input placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }} />
        <input placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />

        <Button onClick={onSubmit}>
          Create user
        </Button>
      </div>

    </div>
  )
}
