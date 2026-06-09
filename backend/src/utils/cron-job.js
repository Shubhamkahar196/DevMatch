import cron from "node-cron";
import ConnectionModel from "../models/connectionRequest.model.js";
import { subDays, startOfDay, endOfDay } from "date-fns";
import sendEmail from "./sendEmail.js";

cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionModel.find({
      status: "PENDING",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("receiver sender");

    const listOfEmails = [
      ...new Set(
        pendingRequests.map((req) => req.receiver.email)
      ),
    ];

    for (const email of listOfEmails) {
      try {
        await sendEmail.run(
          email,
          "Pending Connection Requests",
          "You have pending connection requests waiting on DevMatch."
        );
      } catch (err) {
        console.error("Email failed:", err);
      }
    }
  } catch (err) {
    console.error("Cron Error:", err);
  }
});