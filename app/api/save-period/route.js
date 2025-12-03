import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), {
                status: 401,
            });
        }

        const { startDate, endDate } = await req.json();

        if (!startDate || !endDate) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            });
        }

        const client = await clientPromise;
        const db = client.db("cycleflow");

        // Fetch existing user record
        const user = await db.collection("users").findOne({
            email: session.user.email,
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }

        // Calculate cycle length based on last logged startDate
        let cycleLength = null;

        if (user.history && user.history.length > 0) {
            const lastEntry = user.history[user.history.length - 1];
            const lastStart = new Date(lastEntry.startDate);
            const newStart = new Date(startDate);

            cycleLength = Math.round(
                (newStart - lastStart) / (1000 * 60 * 60 * 24)
            );
        } else {
            // If first time logging after intro data
            const lastStart = new Date(user.startDate);
            const newStart = new Date(startDate);

            cycleLength = Math.round(
                (newStart - lastStart) / (1000 * 60 * 60 * 24)
            );
        }

        // Create new history entry
        const newEntry = {
            startDate,
            endDate,
            cycleLength,
        };

        // Push into history array
        await db.collection("users").updateOne(
            { email: session.user.email },
            {
                $push: { history: newEntry },
                $set: {
                    cycleLength, // update latest cycle length
                },
            }
        );

        return new Response(
            JSON.stringify({ success: true, entry: newEntry }),
            { status: 200 }
        );
    } catch (error) {
        console.error("SAVE PERIOD ERROR:", error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}
