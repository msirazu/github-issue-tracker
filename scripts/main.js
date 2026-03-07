const fetchData = async() => {
    const allIssuesPromise = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const allIssuesData = await allIssuesPromise.json();
    loadAllIssues(allIssuesData.data);
    loadOpenIssues(allIssuesData.data);
    loadClosedIssues(allIssuesData.data);
}
fetchData();

const cardList = document.getElementById('card-list');
const allContainer = document.getElementById('all-container');
const openContainer = document.getElementById('open-container');
const openCardList = document.getElementById('open-card-list');
const closedCardList = document.getElementById('closed-card-list');
const closedContainer = document.getElementById('closed-container');
const allTab = document.getElementById('all-tab');
const openTab = document.getElementById('open-tab');
const closedTab = document.getElementById('closed-tab');
const allCardNum = document.getElementById('card-all-num');
const openCardNum = document.getElementById('card-open-num');
const closedCardNum = document.getElementById('card-closed-num');
const issuesModal = document.getElementById('issues-modal-1');

const loadAllIssues = (data) => {
    cardList.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card-all', 'space-y-2', 'bg-gray-100', 'p-5', 'rounded-lg');
        if (item.status === 'open') {
            div.classList.add('border-t-3', 'border-green-500');
        } else {
            div.classList.add('border-t-3', 'border-purple-500');
        }
        div.innerHTML = `
            <div class="flex justify-between items-center">
              ${item.priority === 'low' ? '<i class="fa-solid fa-circle text-purple-500"></i>' : '<i class="fa-regular fa-circle text-green-500"></i>'}
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
            </div>
            <h2 class="font-bold text-lg">${item.title}</h2>
            <p class="text-sm">${item.description}</p>
            <div class="flex justify-between">
              ${item.labels.map(label => `
                <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${label}</p>
                `).join('')}
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt}</p>
        `
        cardList.appendChild(div);
    })
    allCardNum.innerText = Object.keys(data).length;
}

const loadOpenIssues = (data) => {
    openCardList.innerHTML = '';
    const openIssues = data.filter(item => item.status === 'open');
    openIssues.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card-all', 'space-y-2', 'bg-gray-100', 'p-5', 'rounded-lg');
        if (item.status === 'open') {
            div.classList.add('border-t-3', 'border-green-500');
        } else {
            div.classList.add('border-t-3', 'border-purple-500');
        }
        div.innerHTML = `
            <div class="flex justify-between items-center">
              ${item.priority === 'low' ? '<i class="fa-solid fa-circle text-purple-500"></i>' : '<i class="fa-regular fa-circle text-green-500"></i>'}
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
            </div>
            <h2 class="font-bold text-lg">${item.title}</h2>
            <p class="text-sm">${item.description}</p>
            <div class="flex justify-between">
              ${item.labels.map(label => `
                <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${label}</p>
                `).join('')}
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt}</p>
        `
        openCardList.appendChild(div);
    })
    openCardNum.innerText = Object.keys(openIssues).length;
}

const loadClosedIssues = (data) => {
    closedCardList.innerHTML = '';
    const closedIssues = data.filter(item => item.status === 'closed');
    closedIssues.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card-all', 'space-y-2', 'bg-gray-100', 'p-5', 'rounded-lg');
        if (item.status === 'open') {
            div.classList.add('border-t-3', 'border-green-500');
        } else {
            div.classList.add('border-t-3', 'border-purple-500');
        }
        div.innerHTML = `
            <div class="flex justify-between items-center">
              ${item.priority === 'low' ? '<i class="fa-solid fa-circle text-purple-500"></i>' : '<i class="fa-regular fa-circle text-green-500"></i>'}
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
            </div>
            <h2 class="font-bold text-lg">${item.title}</h2>
            <p class="text-sm">${item.description}</p>
            <div class="flex justify-between">
              ${item.labels.map(label => `
                <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${label}</p>
                `).join('')}
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt}</p>
        `
        closedCardList.appendChild(div);
    })
    closedCardNum.innerText = Object.keys(closedIssues).length;
}

const showContainer = (tab) => {
    if (tab === 'all') {
        allContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');

        allTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');

        allCardNum.classList.remove('hidden');
        openCardNum.classList.add('hidden');
        closedCardNum.classList.add('hidden');
    } else if (tab === 'open') {
        openContainer.classList.remove('hidden');
        allContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');

        openTab.classList.add('btn-primary');
        allTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');

        openCardNum.classList.remove('hidden');
        allCardNum.classList.add('hidden');
        closedCardNum.classList.add('hidden');
    } else {
        closedContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        allContainer.classList.add('hidden');

        closedTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        allTab.classList.remove('btn-primary');

        closedCardNum.classList.remove('hidden');
        allCardNum.classList.add('hidden');
        openCardNum.classList.add('hidden');
    }
}

const tabSelect = (status) => {
    if (status === 'all') {
        fetchData();
        showContainer('all');
    } else if (status === 'open') {
        showContainer('open');
    } else {
        showContainer('closed');
    }
}