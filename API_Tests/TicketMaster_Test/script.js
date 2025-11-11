const API_URL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=p6tR5wi2djdWGZBVVl5Fwm71hn3SfrD9&city=Denver`

async function fetchAPIData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;

}

// async function getPrice(eventURL){
//     const response = await fetch(eventURL);
//     const data = await response.json();
//     console.log(data)
//     return data
// }

document.getElementById('action').addEventListener('click', async () => {
    const data = await fetchAPIData();
    const resultsDiv = document.getElementById('results');
    console.log(data);
    // await getPrice('https://www.ticketmaster.com/phoenix-suns-vs-new-orleans-pelicans-phoenix-arizona-11-10-2025/event/19006307EA74753C')
    for (const event of data._embedded.events) {
        // getPrice(event.url)

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