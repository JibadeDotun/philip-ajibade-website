"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { accessToken, cookieName, passwordsMatch, projectPassword } from "../../lib/project-access";

export async function unlockProject(slug: string, _previous: { error: string }, data: FormData) {
  const password = projectPassword(slug);
  if (!password) return { error: "Access is not available yet. Please contact me for details." };
  const input = data.get("password");
  if (typeof input !== "string" || input.length > 1024 || !passwordsMatch(input, password)) {
    return { error: "That password doesn’t match. Please try again." };
  }
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  (await cookies()).set(cookieName(slug), accessToken(slug, expires, password), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    path: `/product-service-design/${slug}`, maxAge: 8 * 60 * 60,
  });
  redirect(`/product-service-design/${slug}`);
}
