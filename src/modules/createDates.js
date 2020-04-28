/* Native JS Module to construct certain date objects  */

export default function createDates() {
  // create a date object using Date constructor
  let dateObj = new Date();
  let today = dateObj;
  let yesterday = dateObj;
  let lastWeek = dateObj;

  today.setHours(yesterday.getHours() - 4); // Correct for EST
  today = today.toISOString();

  // subtract one day from current time
  yesterday.setHours(yesterday.getHours() - 4);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString();

  lastWeek.setHours(lastWeek.getHours() - 4);
  lastWeek.setDate(lastWeek.getDate() - 6);
  lastWeek = lastWeek.toISOString();

  return { today: today, yesterday: yesterday, lastWeek: lastWeek };
}
