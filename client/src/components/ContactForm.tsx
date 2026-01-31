import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { useContactMutation } from "@/hooks/use-portfolio";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

const formSchema = api.contact.submit.input;
type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useContactMutation();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20"
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full md:w-auto px-8 py-4 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2"
      >
        {mutation.isPending ? (
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
