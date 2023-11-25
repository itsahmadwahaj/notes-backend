import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 3, // limit each IP to 3 requests per windowMs
  message: (req) => {
    const remainingTime = req.rateLimit.resetTime - Date.now();
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.ceil((remainingTime % (60 * 1000)) / 1000);

    let timeMessage = "";

    if (days > 0) {
      timeMessage += `${days} ${days === 1 ? "day" : "days"}`;
    }

    if (hours > 0) {
      timeMessage += `${timeMessage.length > 0 ? " and " : ""}${hours} ${
        hours === 1 ? "hour" : "hours"
      }`;
    }

    if (minutes > 0) {
      timeMessage += `${timeMessage.length > 0 ? " and " : ""}${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      }`;
    }

    if (seconds > 0) {
      timeMessage += `${timeMessage.length > 0 ? " and " : ""}${seconds} ${
        seconds === 1 ? "second" : "seconds"
      }`;
    }

    return `Too many attempts. Please try again in ${timeMessage}.`;
  },
});
