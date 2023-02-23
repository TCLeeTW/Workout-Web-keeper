export function formatDate(timeStamp) {
    const date = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    return formatter.format(date);
}

