const showLoading = () => {
    const loadingSection = document.getElementById('loading-section');
    loadingSection.classList.remove('hidden');
    loadingSection.classList.add('flex');
}

const hideLoading = () => {
    const loadingSection = document.getElementById('loading-section');
    loadingSection.classList.add('hidden');
}

const fetchAllData = async() => {
    showLoading();
    const allIssuesPromise = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const allIssuesData = await allIssuesPromise.json();
    hideLoading();
    loadAllIssues(allIssuesData.data);
}
fetchAllData();

const fetchSearchData = () => {
    document.getElementById('new-issue-btn').addEventListener('click', async() => {
    const searchText = searchInput.value;
    const searchValue = searchText.trim().toLowerCase();
    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`).then(res => res.json());
    hideLoading();
    loadSearchIssues(res.data);
    });
}
fetchSearchData();

const fetchOpenData = async() => {
    showLoading();
    const allIssuesPromise = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const allIssuesData = await allIssuesPromise.json();
    hideLoading();
    loadOpenIssues(allIssuesData.data);
}

const fetchClosedData = async() => {
    showLoading();
    const allIssuesPromise = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const allIssuesData = await allIssuesPromise.json();
    hideLoading();
    loadClosedIssues(allIssuesData.data);
}

const cardList = document.getElementById('card-list');
const allContainer = document.getElementById('all-container');
const openContainer = document.getElementById('open-container');
const searchContainer = document.getElementById('search-container');
const searchCardList = document.getElementById('search-card-list');
const openCardList = document.getElementById('open-card-list');
const closedCardList = document.getElementById('closed-card-list');
const closedContainer = document.getElementById('closed-container');
const allTab = document.getElementById('all-tab');
const openTab = document.getElementById('open-tab');
const closedTab = document.getElementById('closed-tab');
const allCardNum = document.getElementById('card-all-num');
const openCardNum = document.getElementById('card-open-num');
const closedCardNum = document.getElementById('card-closed-num');
const searchCardNum = document.getElementById('card-search-num');
const issuesModal = document.getElementById('issues-modal-1');
const logOutBtn = document.getElementById('log-out-btn');
const newIssueBtn = document.getElementById('new-issue-btn');
const searchInput = document.getElementById('search-input');

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
                <p class="capitalize py-1 px-5 bg-red-100 rounded-full text-[12px]">${label}</p>
                `).join('')}
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt.slice(0, 10)}</p>
        `
        cardList.appendChild(div);
        div.addEventListener('click', () => {
            showModal(item.id);
        });
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
                <p class="capitalize py-1 px-5 bg-red-100 rounded-full text-[12px]">${label}</p>
                `).join('')}
            </div>
            <hr class='border-gray-200'>
            <p class="text-sm">#1 by ${item.author}</p>
            <p class="text-sm">${item.createdAt.slice(0, 10)}</p>
        `
        openCardList.appendChild(div);
        div.addEventListener('click', () => {
            showModal(item.id);
        });
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
              <p class="capitalize py-1 px-5 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
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
            <p class="text-sm">${item.createdAt.slice(0, 10)}</p>
        `
        closedCardList.appendChild(div);
        div.addEventListener('click', () => {
            showModal(item.id);
        });
    })
    closedCardNum.innerText = Object.keys(closedIssues).length;
}

const loadSearchIssues = (data) => {
    searchCardList.innerHTML = '';
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
              <p class="capitalize py-1 px-5 bg-red-100 rounded-full text-[12px]">${item.priority}</p>
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
            <p class="text-sm">${item.createdAt.slice(0, 10)}</p>
        `
        searchCardList.appendChild(div);
        div.addEventListener('click', () => {
            showModal(item.id);
        });
    });
    searchCardNum.innerText = Object.keys(data).length;
}

const showContainer = (tab) => {
    if (tab === 'all') {
        allContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');

        allTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');

        allCardNum.classList.remove('hidden');
        openCardNum.classList.add('hidden');
        closedCardNum.classList.add('hidden');
        searchCardNum.classList.add('hidden');
    } else if (tab === 'open') {
        openContainer.classList.remove('hidden');
        allContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');

        openTab.classList.add('btn-primary');
        allTab.classList.remove('btn-primary');
        closedTab.classList.remove('btn-primary');

        openCardNum.classList.remove('hidden');
        allCardNum.classList.add('hidden');
        closedCardNum.classList.add('hidden');
        searchCardNum.classList.add('hidden');
    } else if (tab === 'closed') {
        closedContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        allContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');

        closedTab.classList.add('btn-primary');
        openTab.classList.remove('btn-primary');
        allTab.classList.remove('btn-primary');

        closedCardNum.classList.remove('hidden');
        allCardNum.classList.add('hidden');
        openCardNum.classList.add('hidden');
        searchCardNum.classList.add('hidden');
    } else {
        searchContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        allContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');

        searchCardNum.classList.remove('hidden');
        closedCardNum.classList.add('hidden');
        allCardNum.classList.add('hidden');
        openCardNum.classList.add('hidden');
    }
    
}

const tabSelect = (status) => {
    if (status === 'all') {
        fetchAllData();
        showContainer('all');
    } else if (status === 'open') {
        showContainer('open');
        fetchOpenData();
    } else if (status === 'closed') {
        showContainer('closed');
        fetchClosedData();
    } else {
        showContainer('search');
        fetchSearchData();
    }
}

const showModal = async(id) => {
    issuesModal.innerHTML = '';
    issuesModal.showModal();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`).then(res => res.json());
    const resData = res.data;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="modal-box space-y-5">
    <h3 class="text-xl font-bold">${resData.title}</h3>
    <div class="flex gap-5 items-center">
      <p class="bg-green-500 py-1 px-5 rounded-full text-white capitalize text-sm">opened</p>
      <p class="text-[#64748B] text-sm capitalize">opened by ${resData.author}</p>
      <p class="text-[#64748B] text-sm">${resData.createdAt.slice(0, 10)}</p>
    </div>
    <div class="flex gap-5">
    ${resData.labels.map(label => 
    `<p class="capitalize py-1 px-5 bg-[#FDE68A] rounded-full text-[12px]">${label}</p>`
    ).join('')}
    </div>
    <p>${resData.description}</p>
    <div class="flex">
      <div class="w-[50%]">
        <p class="capitalize font-bold">assignee:</p>
        <p class="capitalize">${resData.assignee}</p>
      </div>
      <div class="w-[50%]">
        <p class="capitalize font-bold">priotrity:</p>
        <p class="capitalize py-1 px-7 bg-[#EF4444] rounded-full text-[12px] text-white w-20">${resData.priority}</p>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
    `
    issuesModal.appendChild(div);
}

const logOut = () => {
    window.location.href = 'index.html';
}