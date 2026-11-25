import type { FormSubmission } from "@/lib/types";

export async function submitForm(submission: FormSubmission): Promise<{ ok: true }> {
  void submission;

  // The backend developer replaces this placeholder body when submission support is ready.
  await new Promise<void>((resolve) => setTimeout(resolve, 400));

  return { ok: true };
}
