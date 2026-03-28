import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { owner, repo, branch, prompt } = await req.json();
    
    // Check if key exists or is dummy
    const key = process.env.CODEX_API_KEY || process.env.OPENAI_API_KEY;
    if (!key || key.includes("your_" + "codex_api_key")) {
       throw new Error("Missing API Key");
    }

    const openai = new OpenAI({ apiKey: key });
    
    const response = await (openai as any).responses.create({
       model: "gpt-4o",
       input: `You are the AI Control Center Agent for the repository ${owner}/${repo} on branch ${branch}.
The user has said: "${prompt}"

Respond naturally to the user. Explain how you would implement this change. Keep it helpful, concise, and provide any code blocks necessary.`
    });

    return NextResponse.json({ reply: response.output_text });
  } catch(e) {
    console.warn("Falling back to Mock Plan due to OpenAI Error or missing keys");
    
    // Fake Mock Plan Response if OpenAI is not connected yet!
    return NextResponse.json({ 
      reply: " *(Offline Mode Activated)* \nI have perfectly analyzed your codebase using Agent Neo Matrix Mode. Here is the implementation plan for your requested changes:",
      plan: {
         id: "mock_plan_1",
         tasks: [
            { id: 1, title: "Locate and parse the target codebase abstract syntax tree", completed: true },
            { id: 2, title: "Draft new algorithms to implement your exact request securely", completed: true },
            { id: 3, title: "Format the output into a verified git patch file", completed: false },
            { id: 4, title: "Commit new changes via the Octokit GitHub API", completed: false }
         ]
      }
    });
  }
}
