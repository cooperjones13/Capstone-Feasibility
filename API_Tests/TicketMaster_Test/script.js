const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=p6tR5wi2djdWGZBVVl5Fwm71hn3SfrD9&keyword=scene+queen`

async function fetchAPIData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;

}

async function getPrice(eventID){
    const response = await fetch(`https://app.ticketmaster.com/inventory-status/v1/availability?events=${eventID}&apikey=p6tR5wi2djdWGZBVVl5Fwm71hn3SfrD9`);
    const data = await response.json();
    console.log(data)
    return data
}

document.getElementById('action').addEventListener('click', async () => {
    const data = await fetchAPIData();
    const resultsDiv = document.getElementById('results');
    console.log(data);
    for (const event of data._embedded.events) {
        await getPrice(event.id)

        const eventContainer = document.createElement('div');
        const eventInfo = document.createElement('p');

        const newButton = document.createElement('button');
        newButton.innerText = "Go To Event"

        eventInfo.textContent += `Event Name: ${event.name}\nDate: ${event.dates.start.localDate}\n\n`;
        newButton.addEventListener('click', ()=>{
            window.open(event.url, '_blank')
        })

        resultsDiv.appendChild(eventContainer)

        eventContainer.appendChild(eventInfo)
        eventContainer.appendChild(newButton)

        
        
    }
});