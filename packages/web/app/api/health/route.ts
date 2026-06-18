import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ status: "ok", name: "rimuru-ai", version: "1.0.0" })
}
