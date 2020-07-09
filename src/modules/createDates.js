/* Native JS Module to construct certain date objects  */

export default function createDates() {
  // create a date object using Date constructor
  let dateObj = new Date();
  let today = dateObj;
  let yesterday = dateObj;
  let lastWeek = dateObj;
  let twoWeeksAgo = new Date();
 
  today.setHours(yesterday.getHours() - 4); // Correct for EST
  today = today.toISOString();
  today = today.slice(0, 10);

  // subtract one day from current time
  yesterday.setHours(yesterday.getHours() - 4);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString();
  yesterday = yesterday.slice(0, 10);
  
  lastWeek.setHours(lastWeek.getHours() - 4);
  lastWeek.setDate(lastWeek.getDate() - 6);
  lastWeek = lastWeek.toISOString();
  lastWeek = lastWeek.slice(0, 10);
 
  twoWeeksAgo.setHours(twoWeeksAgo.getHours() - 4);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  twoWeeksAgo = twoWeeksAgo.toISOString();
  twoWeeksAgo = twoWeeksAgo.slice(0, 10);
  
  return {
    today: today,
    yesterday: yesterday,
    lastWeek: lastWeek,
    twoWeeksAgo: twoWeeksAgo,
  };
}
