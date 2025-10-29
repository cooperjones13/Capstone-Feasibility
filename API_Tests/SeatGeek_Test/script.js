const API_URL = `https://api.seatgeek.com/2/events?client_id=`

async function fetchAPIData() {
    const response = await fetch();
    const data = await response.json();
    return data;

}

document.getElementById('action').addEventListener('click', async () => {
    const data = await fetchAPIData();
    console.log(data);
    document.querySelector('.data').textContent = JSON.stringify(data, null, 2);
});