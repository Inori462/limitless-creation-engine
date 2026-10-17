import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    toast.success("Thanks! Your message was recorded (demo — no email is sent).");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section id="contact" className="bg-muted py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold">Get in touch</h2>
          <p className="mt-3 text-muted-foreground">Questions about the BHUMIJA prototype, pilots or partnerships? Send us a note.</p>
          <p className="mt-6 text-sm text-muted-foreground">Team BHUMIJA · PCCOE International Grand Challenge 2026</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-card p-6 shadow-soft" noValidate>
          <div><Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}</div>
          <div><Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}</div>
          <div><Textarea placeholder="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}</div>
          <Button type="submit" className="w-full">Send message</Button>
        </form>
      </div>
    </section>
  );
}
