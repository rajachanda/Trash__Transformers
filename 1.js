const accounts = []; 

function signIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    if (account) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').textContent = username;
    } else {
        alert('Invalid credentials or account does not exist. Please try again.');
    }
}

function signUp() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const aadharNumber = document.getElementById('aadharNumber').value;
    if (!username || !password || !confirmPassword || !aadharNumber) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    const accountExists = accounts.some(acc => acc.username === username);
    if (accountExists) {
        alert('Account already exists. Please choose a different username.');
        return;
    }
    accounts.push({ username, password, aadharNumber });
    alert('Account created successfully! You can now sign in.');
    showSignIn();
}

function showSignIn() {
    document.getElementById('sign-in').style.display = 'block';
    document.getElementById('sign-up').style.display = 'none';
}

function showSignUp() {
    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('sign-up').style.display = 'block';
}
function openQrScanner() {
    alert("QR Scanner opened (Simulating)...");
    setTimeout(() => {
        alert("Machine Linked Successfully!");
        document.getElementById("waste-section").style.display = "block";
        document.getElementById("dashboard").style.display = "none";
    }, 2000);
}
function throwWaste() {
    let wasteType = document.getElementById("waste-type").value;
    if (wasteType) {
        document.getElementById("processing-message").style.display = "block";
        setTimeout(() => {
            let points = calculatePoints(wasteType);
            let currentPoints = parseInt(document.getElementById("reward-points").innerText);
            currentPoints += points;
            document.getElementById("reward-points").innerText = currentPoints;
            alert(`Earned ${points} points for ${wasteType}`);
            document.getElementById("processing-message").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        }, 5000);
    } else {
        alert("Please select a waste type!");
    }
}

function calculatePoints(wasteType) {
    let points;
    switch (wasteType) {
        case "wet":
            points = Math.floor(Math.random() * 10 + 1);
            break;
        case "dry":
            points = Math.floor(Math.random() * 15 + 5);
            break;
        case "ewaste":
            points = Math.floor(Math.random() * 20 + 10);
            break;
        default:
            points = 0;
            break;
    }
    return points;
}
const sampleRewards = [
    { id: 1, name: "Google Item 1", points: 50, img: "https://media.istockphoto.com/id/827465154/photo/white-rice-in-burlap-sack-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=be5ELHFTbZ3DlBcAnPgCX4AkLjA867Mc7nBRjWKqNkI=" },
    { id: 2, name: "Google Item 2", points: 30, img: "https://media.istockphoto.com/id/827465154/photo/white-rice-in-burlap-sack-bag-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=be5ELHFTbZ3DlBcAnPgCX4AkLjA867Mc7nBRjWKqNkI=" },
    { id: 3, name: "Google Item 3", points: 20, img: "https://via.placeholder.com/150?text=Google+Item+3" },
    { id: 4, name: "Google Item 4", points: 40, img: "https://via.placeholder.com/150?text=Google+Item+4" },
    { id: 5, name: "Google Item 5", points: 10, img: "https://via.placeholder.com/150?text=Google+Item+5" },
    { id: 6, name: "Google Item 6", points: 20, img: "https://via.placeholder.com/150?text=Google+Item+6" },
    { id: 7, name: "Google Item 7", points: 15, img: "https://via.placeholder.com/150?text=Google+Item+7" },
    { id: 8, name: "Google Item 8", points: 25, img: "https://via.placeholder.com/150?text=Google+Item+8" },
    { id: 9, name: "Google Item 9", points: 50, img: "https://via.placeholder.com/150?text=Google+Item+9" },
    { id: 10, name: "Google Item 10", points: 30, img: "https://via.placeholder.com/150?text=Google+Item+10" },
    { id: 11, name: "Google Item 11", points: 20, img: "https://via.placeholder.com/150?text=Google+Item+11" },
    { id: 12, name: "Google Item 12", points: 40, img: "https://via.placeholder.com/150?text=Google+Item+12" },
];
// Repeat items for a total of 48 for demonstration
// for (let i = 13; i <= 48; i++) {
//     sampleRewards.push({
//         id: i,
//         name: Google Item ${i},
//         points: Math.floor(Math.random() * 50) + 10,
//         img: https://via.placeholder.com/150?text=Google+Item+${i},
//     });
// }

function redeemRewards() {
    document.getElementById('redeem-section').style.display = 'block';
    const currentPoints =0;
    document.getElementById('current-points').textContent = currentPoints;

    const couponsGrid = document.getElementById('coupons-grid');
    couponsGrid.innerHTML = '';
    sampleRewards.forEach(reward => {
        const couponCard = document.createElement('div');
        couponCard.className = 'coupon-card';
        couponCard.innerHTML = `
            <img src="${reward.img}" alt="${reward.name}">
            <h3>${reward.name}</h3>
            <p>Required Points: ${reward.points}</p>
            <button onclick="redeem(${reward.id}, ${reward.points})">Redeem</button>
        `;
        couponsGrid.appendChild(couponCard);
    });
}

function redeem(id, points) {
    const currentPointsElement = document.getElementById('current-points');
    let currentPoints = parseInt(currentPointsElement.textContent);

    if (currentPoints >= points) {
        currentPoints -= points;
        currentPointsElement.textContent = currentPoints;
        alert('Successfully redeemed ${points} points for item ID: ${id}');
    } else {
        alert('Insufficient points to redeem this item.');
    }
}