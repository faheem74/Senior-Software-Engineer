import { siteConfig } from "@/config/site";

export type ClientContactPayload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export type ClientMailResult = {
  delivered: boolean;
  needsActivation?: boolean;
  error?: string;
};

/**
 * Browser-side FormSubmit — has a real Origin, which serverless often lacks.
 */
export async function sendContactViaFormSubmitClient(
  input: ClientContactPayload,
): Promise<ClientMailResult> {
  const to = siteConfig.email;

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          _replyto: input.email,
          _subject: `Portfolio inquiry: ${input.projectType} (${input.name})`,
          projectType: input.projectType,
          message: input.message,
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const data = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    const message = String(data?.message || "");
    const successFlag = data?.success === true || data?.success === "true";
    const needsActivation = /activate|activation|confirm|check your email/i.test(
      message,
    );

    if (needsActivation) {
      return { delivered: false, needsActivation: true, error: message };
    }

    if (!res.ok || !successFlag) {
      return {
        delivered: false,
        error: message || `FormSubmit error ${res.status}`,
      };
    }

    return { delivered: true };
  } catch (error) {
    return {
      delivered: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
