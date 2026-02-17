"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("pending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const result = await res.json();
      setStatus("success");
      setStatusMessage(result.message);
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Failed to send message");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-400 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20"
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="text-red-400 text-xs">{errors.message.message}</p>
        )}
      </div>

      {status === "success" && (
        <p className="text-sm text-green-400">{statusMessage}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{statusMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full md:w-auto px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2"
      >
        {status === "pending" ? (
          <>
            <Loader2 className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
