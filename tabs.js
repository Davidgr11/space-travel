const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

// Function to get the current tab from URL
function getCurrentTabFromUrl() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1];
    
    // Map URL segments to tab IDs
    const urlToTabMap = {
        'destination-moon': 'moon-tab',
        'destination-mars': 'mars-tab',
        'destination-europa': 'europa-tab',
        'destination-titan': 'titan-tab',
        'crew-commander': 'commander-tab',
        'crew-specialist': 'mission-tab',
        'crew-pilot': 'pilot-tab',
        'crew-engineer': 'crew-tab',
        'technology-vehicle': 'launch-tab',
        'technology-spaceport': 'spaceport-tab',
        'technology-capsule': 'capsule-tab'
    };
    
    return urlToTabMap[lastSegment];
}

// Function to update URL without page reload
function updateUrl(tabId) {
    const tabToUrlMap = {
        'moon-tab': 'destination-moon',
        'mars-tab': 'destination-mars',
        'europa-tab': 'destination-europa',
        'titan-tab': 'destination-titan',
        'commander-tab': 'crew-commander',
        'mission-tab': 'crew-specialist',
        'pilot-tab': 'crew-pilot',
        'crew-tab': 'crew-engineer',
        'launch-tab': 'technology-vehicle',
        'spaceport-tab': 'technology-spaceport',
        'capsule-tab': 'technology-capsule'
    };
    
    const newPath = tabToUrlMap[tabId];
    if (newPath) {
        const basePath = window.location.pathname.split('/')[1];
        window.history.pushState({}, '', `/${basePath}/${newPath}`);
    }
}

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

// Initialize tab based on URL
document.addEventListener('DOMContentLoaded', () => {
    const currentTabId = getCurrentTabFromUrl();
    if (currentTabId) {
        const tab = document.querySelector(`[aria-controls="${currentTabId}"]`);
        if (tab) {
            changeTabPanel({ target: tab });
        }
    }
});

let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }
    
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }
    
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
        
    targetTab.setAttribute("aria-selected", true);
    
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
    
    // Update URL when tab changes
    updateUrl(targetPanel);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
     parent.querySelector(content).removeAttribute('hidden');
}