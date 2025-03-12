document.addEventListener('DOMContentLoaded', async () => {
    // Load saved settings
    const settings = await chrome.storage.sync.get({
        colorScheme: 'green',
        urls: [],
        enabled: true
    });

    // Initialize theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.checked = settings.enabled;

    // Handle theme toggle changes
    themeToggle.addEventListener('change', async () => {
        settings.enabled = themeToggle.checked;
        await chrome.storage.sync.set({ enabled: settings.enabled });

        // Notify content script of the change
        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
            try {
                await chrome.tabs.sendMessage(tab.id, { 
                    type: 'themeToggled',
                    enabled: settings.enabled 
                });
                console.log('Theme toggle updated for tab:', tab.url);
            } catch (error) {
                console.log('Tab not ready for theme toggle:', tab.url);
            }
        }
    });

  // Extended Color scheme definitions
const colorSchemes = {
    green: {
        primary: '#4B5945',
        hover: '#66785F',
        background: '#f5f5f5'
    },
    blue: {
        primary: '#00719c',
        hover: '#009bd6',
        background: '#e3f2fd'
    },
    pink: {
        primary: '#893e66',
        hover: '#dc64a2',
        background: '#fce4ec'
    },
    pinker: {
        primary: '#893e66',
        hover: '#dc64a2',
        background: '#fce4ec'
    },
    orange: {
        primary: '#8A4E1E',
        hover: '#FF9A49',
        background: '#fff3e0'
    },
    purple: {
        primary: '#57338A',
        hover: '#B18EFF',
        background: '#f3e5f5'
    },
    red: {
        primary: '#7A2B2B',
        hover: '#FF5E5E',
        background: '#ffebee'
    },
    yellow: {
        primary: '#8A6F21',
        hover: '#FFDE70',
        background: '#FFF8C2'
    },
    gryffindor: {
        primary: '#9E2A2F',
        hover: '#FFC72C',
        background: '#FFEDE7'
    },
    hufflepuff: {
        primary: '#FBC02D',
        hover: '#FFEB3B',
        background: '#FFFBE6'
    },
    ravenclaw: {
        primary: '#2C3E50',
        hover: '#5B748E',
        background: '#E8F0FE'
    },
    slytherin: {
        primary: '#3C6E47',
        hover: '#6FA287',
        background: '#E8F5E9'
    },
    mario: {
        primary: '#E52521',    // Klassisches Mario-Rot
        hover: '#049CD8',      // Mario-Blau (Hose)
        background: '#FFE5E5'  // Sehr helles Rot-Rosa als freundlicher Hintergrund
    },
    luigi: {
        primary: '#4CAF50',    // Luigi-Grün
        hover: '#039BE5',      // Luigi-Blau (Hose)
        background: '#E8F5E9'  // Sehr helles Grün als Hintergrund
    },
    yoshi: {
        primary: '#6EBE49',    // Yoshi-Grün
        hover: '#E63946',      // Yoshi-Rot (Panzer)
        background: '#F1F8E9'  // Helles Grün als Hintergrund
    },
    peach: {
        primary: '#FF7EB9',    // Peach-Rosa
        hover: '#FFD166',      // Peach-Gold (Krone/Haar)
        background: '#FFF0F6'  // Zartrosa Hintergrund
    },
    donkeykong: {
        primary: '#8B572A',    // DK-Braun
        hover: '#EAB464',      // DK-Goldbraun (Fell-Kontrast)
        background: '#F3E9E0'  // Beige Hintergrund
    }
    
};

    // Function to update UI colors
    function updateUIColors(scheme) {
        const colors = colorSchemes[scheme];
        document.documentElement.style.setProperty('--theme-primary', colors.primary);
        document.documentElement.style.setProperty('--theme-hover', colors.hover);
        document.documentElement.style.setProperty('--theme-background', colors.background);
    }

    // Initialize color scheme select
    const colorScheme = document.getElementById('colorScheme');
    colorScheme.value = settings.colorScheme;
    updateUIColors(settings.colorScheme);

    colorScheme.addEventListener('change', async () => {
        if (!settings.enabled) return;
        
        // Update local settings and storage
        settings.colorScheme = colorScheme.value;
        await chrome.storage.sync.set({ colorScheme: colorScheme.value });
        
        // Update UI colors
        updateUIColors(colorScheme.value);

        // Notify content script of the change
        const tabs = await chrome.tabs.query({});
        for (const tab of tabs) {
            try {
                await chrome.tabs.sendMessage(tab.id, { 
                    type: 'colorSchemeChanged',
                    colorScheme: colorScheme.value 
                });
                console.log('Color scheme updated for tab:', tab.url);
            } catch (error) {
                // Ignore errors for tabs where content script isn't running
                console.log('Tab not ready for color change:', tab.url);
            }
        }
    });

    // Initialize URL list
    const urlList = document.getElementById('urlList');
    const addCurrentUrlBtn = document.getElementById('addCurrentUrl');

    function updateUrlList() {
        urlList.innerHTML = '';
        settings.urls.forEach(url => {
            const div = document.createElement('div');
            div.className = 'url-item';
            div.innerHTML = `
                <span>${url}</span>
                <button class="delete-url" data-url="${url}">
                    <svg viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                </button>
            `;
            urlList.appendChild(div);
        });

        // Update manifest matches
        chrome.runtime.sendMessage({ 
            type: 'updateMatches', 
            urls: settings.urls.map(url => url + '/*')
        });
    }

    // Add current URL
    addCurrentUrlBtn.addEventListener('click', async () => {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs.length === 0) return;
            
            let url = new URL(tabs[0].url).origin;
            
            if (!settings.urls.includes(url)) {
                settings.urls.push(url);
                await chrome.storage.sync.set({ urls: settings.urls });
                updateUrlList();
            }
        } catch (error) {
            console.error('Error adding current URL:', error);
        }
    });

    // Delete URL
    urlList.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.delete-url');
        if (deleteBtn) {
            const urlToDelete = deleteBtn.dataset.url;
            settings.urls = settings.urls.filter(url => url !== urlToDelete);
            await chrome.storage.sync.set({ urls: settings.urls });
            updateUrlList();
        }
    });

    updateUrlList();
});
