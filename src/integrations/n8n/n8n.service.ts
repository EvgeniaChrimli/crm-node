import { Meeting } from "../../modules/meetings/meetings.types.js";

export const sendMeetingCreated = async (meeting: Meeting) => {
  try {
    const response = await fetch(
      "http://localhost:5678/webhook/meeting-created2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meeting),
      },
    );

    const text = await response.text();
  } catch (error) {
    console.error("Cannot send meeting to n8n", error);
  }
};
