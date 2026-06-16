const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://rimurucode.vercel.app" : `https://${stage}.rimurucode.vercel.app`,
  console: stage === "production" ? "https://rimurucode.vercel.app/auth" : `https://${stage}.rimurucode.vercel.app/auth`,
  email: "help@rimuru-ai.dev",
  socialCard: "https://social-cards.rimuru-ai.dev",
  github: "https://github.com/gowdaman/rimuru-ai",
  discord: "https://discord.gg/rimuru-ai",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
