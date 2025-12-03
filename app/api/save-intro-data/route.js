import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401 }
      );
    }
    console.log("🔥 SESSION:", session);

    const { startDate, endDate, cycleLength } = await req.json();

    if (!startDate || !endDate || !cycleLength) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("cycleflow");

    // Save the intro data under the logged in user
    await db.collection("users").updateOne(
      { email: session.user.email }, // unique identity
      {
        $set: {
          startDate,
          endDate,
          cycleLength,
        },
      },
      { upsert: true }
    );

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("SAVE INTRO ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
