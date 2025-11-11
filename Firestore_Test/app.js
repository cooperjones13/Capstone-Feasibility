// 1. Import ONLY the functions you need from the SDKs

// Your web app's Firebase configuration (This part is correct)
const firebaseConfig = {
  apiKey: "AIzaSyAEcCLknX4N8Fr56hYLlS-9EgAba3165O8",
  authDomain: "firestore-test-64038.firebaseapp.com",
  projectId: "firestore-test-64038",
  storageBucket: "firestore-test-64038.firebasestorage.app",
  messagingSenderId: "604121024706",
  appId: "1:604121024706:web:37ed33c6d975210d22935b",
  measurementId: "G-N77HH2J1S7"
};

// 2. Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// 3. Initialize Cloud Firestore
const db = firebase.firestore();

console.log("Firebase App Initialized!");

// --- WRITE DATA (SET A DOCUMENT) ---
// Use db.collection() syntax
db.collection("concerts").doc("event-001").set({
    name: "Taylor Swift",
    vendor: "TicketMaster",
    price: 150.00
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});

// --- READ DATA (GET ALL DOCUMENTS) ---
// Use db.collection() syntax
db.collection("concerts").get().then((querySnapshot) => {
    const listElement = document.getElementById('data-list');

    querySnapshot.forEach((doc) => {
        // doc.data() is the content of the document
        const concert = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${concert.name} - $${concert.price}`;
        
        // Ensure element exists before appending
        if (listElement) {
            listElement.appendChild(listItem);
        }
    });
});