import { BRAND_EMAIL } from "@/data/brand";

export type WebFormResult =
  | { ok: true; mode: "email" | "demo" }
  | { ok: false; error: string };

type PostOptions = {
  subject: string;
  message: string;
  fromName: string;
  email: string;
  phone?: string;
  extraFields?: Record<string, string>;
  demoLabel: string;
};

export async function postWeb3Form(options: PostOptions): Promise<WebFormResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim() || BRAND_EMAIL;

  if (!accessKey) {
    if (import.meta.env.DEV) {
      console.info(`[${options.demoLabel} — demo mode, no VITE_WEB3FORMS_ACCESS_KEY]`, {
        adminEmail,
        ...options,
      });
      await new Promise((r) => setTimeout(r, 1200));
      return { ok: true, mode: "demo" };
    }
    return {
      ok: false,
      error:
        "Email is not configured yet. Please add VITE_WEB3FORMS_ACCESS_KEY.",
    };
  }

  const body = {
    access_key: accessKey,
    subject: options.subject,
    from_name: options.fromName,
    email: options.email,
    phone: options.phone ?? "",
    replyto: options.email,
    botcheck: "",
    message: options.message,
    admin_email: adminEmail,
    ...options.extraFields,
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    return {
      ok: false,
      error: data.message ?? "Could not send your message. Please try again.",
    };
  }

  return { ok: true, mode: "email" };
}
