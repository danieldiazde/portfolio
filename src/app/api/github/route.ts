import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { getGitHubSnapshot } from "@/lib/github";

export async function GET() {
  const snapshot = await getGitHubSnapshot(site.githubUsername);

  return NextResponse.json({
    ok: Boolean(snapshot),
    snapshot,
  });
}
