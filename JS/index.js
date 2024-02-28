const loadPhone = async (searchID = '13') => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchID}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phones) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    // display show all button if there are more than 12 phones:
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 15) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }
    //only firts  15 phones show first time:
    phones = phones.slice(0, 15)

    phoneContainer.innerHTML = ``
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-300 p-5 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick = "handleShowDetail('${phone.slug}')" class="btn btn-primary ">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    //loading off
    toggleLoadingSpinner(false);
}



//handle search button:
const handleSearchButton = () => {
    toggleLoadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value
    loadPhone(inputText);
    inputField.value = ``
}


// loading function:
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}



//show details
const handleShowDetail = async (slug) => {
    // console.log('show details', slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
}


const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class="mx-auto " src ="${phone.image}" />
    <p class="font-bold">Storage: <span class="font-medium">${phone.mainFeatures.storage}</span>
    <p class="font-bold">Display-Size: <span class="font-medium">${phone.mainFeatures.displaySize}</span>
    <p class="font-bold">Memory: <span class="font-medium">${phone.mainFeatures.memory}</span>
    <p class="font-bold">Chip: <span class="font-medium">${phone.mainFeatures.chipSet}</span>
    <p class="font-bold">Sensor: <span class="font-medium">${phone.mainFeatures.sensors}</span>
    <p class="font-bold">Rlease Date: <span class="font-medium">${phone.releaseDate}</span>
    `;
    showDetailsModal.showModal()
}


loadPhone()

//showDetailsModal.showModal()