const fetchData = async() => {
    const issuesPromise = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const issuesData = await issuesPromise.json();
    loadAllIssues(issuesData.data);
}
fetchData();

const cardList = document.getElementById('card-list');
const allContainer = document.getElementById('all-container');
const openContainer = document.getElementById('open-container');
const closedContainer = document.getElementById('closed-container');
const allTab = document.getElementById('all-tab');
const openTab = document.getElementById('open-tab');
const closedTab = document.getElementById('closed-tab');

const loadAllIssues = (data) => {
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card-all', 'space-y-2', 'bg-gray-100', 'p-5', 'rounded-lg');
        div.innerHTML = `
            <div class="flex justify-between items-center">
              ${item.priority === 'low' ? '<i class="fa-solid fa-circle text-purple-500"></i>' : '<i class="fa-regular fa-circle text-green-500"></i>'}
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
            </div>
            <h2 class="font-bold text-lg">${item.title}</h2>
            <p class="text-sm">${item.description}</p>
            <div class="flex justify-between">
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.labels[0]}</p>
              <p class="capitalize py-1 px-7 bg-red-100 rounded-full text-[12px]">${item.labels[1]}</p>
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt}</p>
        `
        cardList.appendChild(div);
    })
}

const showContainer = (tab) => {
    if (tab === 'all') {
        allContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');

        allTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');
    } else if (tab === 'open') {
        openContainer.classList.remove('hidden');
        allContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');

        openTab.classList.add('btn-primary');
        allTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');
    } else {
        closedContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        allContainer.classList.add('hidden');

        closedTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        allTab.classList.remove('btn-primary');
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