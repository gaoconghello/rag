"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Book, MessageSquare, ArrowRight, Plus } from "lucide-react";
import { api, ApiError } from "@/lib/api";

interface KnowledgeBase {
  id: number;
  name: string;
  description: string;
  documents: any[];
}

interface Chat {
  id: number;
  title: string;
  messages: any[];
}

interface Stats {
  knowledgeBases: number;
  chats: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ knowledgeBases: 0, chats: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [kbData, chatData] = await Promise.all([
          api.get("/api/knowledge-base"),
          api.get("/api/chat"),
        ]);

        setStats({
          knowledgeBases: kbData.length,
          chats: chatData.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        if (error instanceof ApiError && error.status === 401) {
          return;
        }
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome 
            </h2>
            <p className="text-muted-foreground mt-2">
              管理知识库和聊天会话
            </p>
          </div>
          <div className="flex gap-4">

            <a
              href="/dashboard/knowledge/new"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              创建知识库
            </a>
          </div>
        </div>


        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-purple-500/5 p-8 backdrop-blur-sm transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    知识库
                  </p>
                  <h3 className="text-3xl font-bold mt-1">
                    {stats.knowledgeBases}
                  </h3>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-purple-500/5 p-8 backdrop-blur-sm transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">聊天会话</p>
                  <h3 className="text-3xl font-bold mt-1">{stats.chats}</h3>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-purple-500/5 p-8">
          <h3 className="text-xl font-semibold mb-6">Getting Started</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-lg border p-6 transition-all hover:border-primary hover:shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">创建知识库</h4>
                  <a href="/dashboard/knowledge/new">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </a>

                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  开始创建一个新知识库并上传您的文档
                </p>

              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border p-6 transition-all hover:border-primary hover:shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">上传文档</h4>
                  <a href="/dashboard/knowledge">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </a>

                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  上传您的 PDF、DOCX、MD 或 TXT 文件以构建您的知识库
                </p>

              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border p-6 transition-all hover:border-primary hover:shadow-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">开始聊天</h4>
                  <a href="/dashboard/chat/new">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-primary" />

                  </a>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  使用 AI 与您的知识库聊天以获得即时答案
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
