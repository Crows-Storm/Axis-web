"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("邮箱格式不正确"),
  notifyAudit: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function SettingsView() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "user@example.test", notifyAudit: true },
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>安全中心</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline">启用 2FA</Button>
          <Button variant="outline">修改密码</Button>
          <p className="text-xs text-slate-500">API Key 仅展示前缀，密钥不会下发到浏览器。</p>
          <code className="block rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">pfc_live_****k3m9</code>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>通知偏好</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(() => toast.success("已保存通知偏好"))}
          >
            <label className="block space-y-1 text-sm">
              <span>
                邮箱 <span className="text-rose-500">*</span>
              </span>
              <Input {...form.register("email")} />
              {form.formState.errors.email && (
                <span className="text-xs text-rose-500">{form.formState.errors.email.message}</span>
              )}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...form.register("notifyAudit")} />
              审计告警推送
            </label>
            <Button type="submit">保存</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
