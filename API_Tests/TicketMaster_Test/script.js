const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=p6tR5wi2djdWGZBVVl5Fwm71hn3SfrD9`

async function fetchAPIData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;

}

document.getElementById('action').addEventListener('click', async () => {
    const data = await fetchAPIData();
    console.log(data);
    for (const event of data._embedded.events) {
        document.querySelector('.data').textContent += `Event Name: ${event.name}\nDate: ${event.dates.start.localDate}\n\n`;
     
    }
});