"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 获取 localStorage 中的 token 来检查登录状态
    const token = localStorage.getItem('token');

    // 如果有 token，跳转到 dashboard
    if (token) {
      router.push('/dashboard');
    }
    // 如果没有 token，跳转到 login
    else {
      router.push('/login');
    }
  }, [router]);

  // 返回空内容，因为会立即重定向
  return null;
}
