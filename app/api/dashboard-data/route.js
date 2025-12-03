import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("cycleflow");

    const user = await db.collection("users").findOne({
      email: session.user.email
    });

    if (!user || !user.startDate) {
      return new Response(
        JSON.stringify({ error: "No intro data found" }),
        { status: 404 }
      );
    }

    // ---------- HISTORY ----------
    const history = user.history || [];

    // ---------- AVERAGE CYCLE LENGTH ----------
    const avgCycle = history.length > 0
      ? history.reduce((acc, h) => acc + h.cycleLength, 0) / history.length
      : Number(user.cycleLength);

    // ---------- AVERAGE PERIOD LENGTH ----------
    const avgPeriod = history.length > 0
      ? history.reduce((acc, h) => {
        const diff =
          (new Date(h.endDate) - new Date(h.startDate)) / (1000 * 3600 * 24);
        return acc + diff;
      }, 0) / history.length
      : (new Date(user.endDate) - new Date(user.startDate)) / (1000 * 3600 * 24);

    // ---------- LAST PERIOD ----------
    const lastEntry = history.length > 0 ? history[history.length - 1] : user;
    const lastStart = new Date(lastEntry.startDate);

    // ---------- NEXT PERIOD ----------
    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(nextPeriod.getDate() + Math.round(avgCycle));

    // ---------- FERTILE WINDOW ----------
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(ovulation.getDate() - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    return new Response(
      JSON.stringify({
        nextPeriod,
        fertileStart,
        fertileEnd,
        avgCycle: Math.round(avgCycle),
        avgPeriod: Math.round(avgPeriod),
        history: history.slice(-9)
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
