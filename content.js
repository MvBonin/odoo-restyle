// ==UserScript==
// @name         Lighthouse CORE Markwarts ODOO Theme
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Theme für CORE-Odoo mit zentralisierten Farbvariablen
// @author       Markwart v. Bonin
// @match        https://lighthouse.ridecore.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  const currentOrigin = window.location.origin;
  let isUrlAllowed = false;

  // Define color schemes
  const colorsBlue = {
      col01: "#00b8ff",
      col02: "#009bd6",
      col03: "#00719c",
      col04: "#00415a",
      col05: "#001f2b",
      colbg01: "#00415a",
      colbg02: "#001f2b",
  };

  const colorsGreen = {
  col01: "#B2C9AD",
      col02: "#91AC8F",
      col03: "#66785F",
      col04: "#4B5945",
      col05: "#272e24",
      colbg01: "#4B5945",
      colbg02: "#272e24",
};

  const colorsPink = {
      col01: "#FFCCE1",
      col02: "#ff76c2",
      col03: "#dc64a2",
      col04: "#893e66",
      col05: "#52253d",
      colbg01: "#210f18",
      colbg02: "#0b0508",
};

  let activeColors = colorsGreen;

  // Define CSS templates
  function getCssColors() {
    return `
    :root {

        --col01: ${activeColors.col01};
        --col02: ${activeColors.col02};
        --col03: ${activeColors.col03};
        --col04: ${activeColors.col04};
        --col05: ${activeColors.col05};
        --colbg01: ${activeColors.colbg01};
        --colbg02: ${activeColors.colbg02};

        /* Primäre Farben */
        --color-primary: var(--col03);
        --color-bg-primary: var(--col05);
        --color-primary-hover: var(--col02);    /* Etwas helleres Blau beim Hover */
        --color-primary-active: var(--col01);   /* Noch helleres Blau */

        --text-bg-primary: var(--color-primary);

        /* Sekundäre Farben */
        --color-accent: var(--col04);           /* Dunkelblau am Rand */
        --color-background: var(--colbg02);       /* Hintergrundfarbe */
        --color-background-gradient-start: var(--colbg01);
        --color-background-gradient-end: var(--colbg02);

        /* Textfarben */
        --color-text-white: #ffffff;
        --color-text-link: var(--col02);
        --color-text-link-hover: var(--col01);

        /* Zustandsfarben */
        --color-checked-bg: var(--col03);
        --color-checked-border: #85c1e9;
        --color-active-bg: #3C3E4B;
        --color-active-border: var(--col03);

        /* Schatten */
        --shadow-focus: rgba(58, 123, 213, 0.5);

        /* Zusätzliche Variablen für spezifische Styles */
        --NavBar-entry-color: #E4E4E4;
        --homeMenuCaption-color: #FFF;
    }
    `;
  }

  // Function to update colors and apply CSS
  function updateColors(scheme) {
    if (!isUrlAllowed) return;

    switch(scheme) {
      case 'blue':
        activeColors = colorsBlue;
        break;
      case 'pink':
        activeColors = colorsPink;
        break;
      default:
        activeColors = colorsGreen;
    }

    // Remove existing styles
    removeStyle('custom-css-colors');
    removeStyle('custom-css-main');
    removeStyle('custom-css-web');

    // Apply new styles
    addStyle(getCssColors(), 'custom-css-colors');
    applyCSS();
  }

  // Function to remove all styles
  function removeAllStyles() {
    removeStyle('custom-css-colors');
    removeStyle('custom-css-main');
    removeStyle('custom-css-web');
  }

  // Initialize extension
  chrome.storage.sync.get({ urls: [], colorScheme: 'green', enabled: true }, (settings) => {
    isUrlAllowed = settings.urls.includes(currentOrigin);
    
    if (!isUrlAllowed) {
      console.log('ODOO Theme: URL not in allowed list:', currentOrigin);
      return;
    }

    console.log('ODOO Theme: Applying to', currentOrigin);
    
    // Apply initial color scheme if enabled
    if (settings.enabled) {
      updateColors(settings.colorScheme);
    }

    // Listen for theme changes
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'colorSchemeChanged') {
        console.log('ODOO Theme: Color scheme changed to', message.colorScheme);
        updateColors(message.colorScheme);
      } else if (message.type === 'themeToggled') {
        console.log('ODOO Theme: Theme toggled:', message.enabled ? 'ON' : 'OFF');
        if (message.enabled) {
          updateColors(settings.colorScheme);
        } else {
          removeAllStyles();
        }
      }
    });
  });

  /**
   * Funktion zum Hinzufügen von CSS zum Dokument
   * @param {string} css - Der CSS-Code als String
   * @param {string} id - Die ID des Style-Tags
   */
  function addStyle(css, id) {
      if (!document.getElementById(id)) {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = id;
          style.appendChild(document.createTextNode(css));
          document.head.appendChild(style);
          console.log(`CSS hinzugefügt: ${id}`);
      }
  }

  /**
   * Entfernt das zuvor hinzugefügte CSS
   * @param {string} id - Die ID des Style-Tags
   */
  function removeStyle(id) {
      const existingStyle = document.getElementById(id);
      if (existingStyle) {
          existingStyle.remove();
          console.log(`CSS entfernt: ${id}`);
      }
  }

  /**
   * Funktion zum Anwenden des richtigen CSS basierend auf dem Pfad
   */
  function applyCSS() {
    if (!isUrlAllowed) return;

    const path = window.location.pathname;
    console.log("Aktueller Pfad:", path);

    // Define CSS for different paths
    const cssMain = `
    .o_frontend_to_backend_nav .o_frontend_to_backend_apps_btn {
        background-color: var(--col02);
    }

    .o_frontend_to_backend_nav:hover .o_frontend_to_backend_apps_btn:hover {
        background-color: var(--col01);
    }

    .o_frontend_to_backend_nav::before {
        border-top: 20px solid var(--col02);
        border-left: 20px solid var(--col02);
    }
    `;

    const cssWeb = `
      /* Umfangreicher CSS-Code für /web Pfade */

    /* Direkte Überschreibung der btn-primary Klasse */
    .btn-primary {
        background-color: var(--color-primary) !important;
        border-color: var(--color-primary) !important;
        color: var(--color-text-white) !important;
    }

    .text-primary {
        color: var(--color-primary) !important;
    }

    .text-bg-primary {
        color: #FFF !important;
        background-color: var(--text-bg-primary) !important;
    }

    .o_base_settings_view .o_form_renderer {
        --settings__tab-bg: #1B1D26;
        --settings__tab-bg--active: var(--col04);
    }

    .o_main_navbar {
        --o-navbar-badge-color: #FFF;
        --o-navbar-badge-text-shadow: none;
        --NavBar-menuToggle-color: #FFF;
        --NavBar-brand-color: var(--col03);
        --NavBar-entry-borderColor-active: var(--col01);
        --NavBar-entry-backgroundColor--active: var(--col05);
        --NavBar-entry-backgroundColor--hover: var(--col03);
        --NavBar-entry-backgroundColor--focus: var(--col04);

        background: transparent;
    }
    .o_control_panel {
    background: transparent;
    }
    .o_main_navbar .o_menu_sections .o_nav_entry, .o_main_navbar .o_menu_sections .dropdown-toggle {
      background: transparent;
    }

    .o_kanban_header{

    background: #262A36;


  /* Blur effect behind the element */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px); /* for older Safari support */

   padding-left: 8px;
   padding-right: 8px;
    }

    .o_kanban_renderer {
    //--KanbanGroup-grouped-bg: #262A36;
    //--KanbanRecord__image-bg-color: #E4E4E4;
    //--KanbanColumn__highlight-background: #17373b;
    //--KanbanColumn__highlight-border: #02c7b5;
    //--Kanban-background: #1B1D26;
    background: linear-gradient(45deg, var(--color-background-gradient-start), var(--color-background-gradient-end)) !important;
     }

    .alert-info {
        color: #FFF !important;
        background-color: var(--col05) !important;
        border-color: var(--col02) !important;
    }
    .o_kanban_renderer.o_kanban_grouped .o_kanban_group {
     background: transparent;

    }

    .o_navbar {
       background: transparent;
    }

    .o_web_client {
      background: linear-gradient(45deg, var(--color-background-gradient-start), var(--color-background-gradient-end)) !important;
    }

    .btn-link {
        font-weight: 400;
        color: var(--col02);
        text-decoration: none;
    }

    .btn-link:hover {
        font-weight: 400;
        color: var(--col01);
        text-decoration: none;
    }

    /* Hover- und Fokus-Effekte für btn-primary */
    .btn-primary:hover,
    .btn-primary:focus {
        background-color: var(--color-primary-hover) !important;
        border-color: var(--color-primary-hover) !important;
        color: var(--color-text-white) !important;
    }

    .o_tour_pointer_tip {
        --TourPointer__color-accent: var(--col02);
        --TourPointer__color: var(--col03);
    }

    /* Standard-Stil */
    .btn-outline-primary {
        color: var(--color-primary) !important;
        border-color: var(--color-primary) !important;
        background-color: transparent !important;
    }

    /* Hover-Effekt */
    .btn-outline-primary:hover {
        color: var(--color-text-white) !important;
        background-color: var(--color-primary) !important;
        border-color: var(--color-primary) !important;
    }
    .
    /* Fokus-Effekt */
    .btn-outline-primary:focus {
        box-shadow: 0 0 0 0.2rem var(--shadow-focus) !important;
    }

    a {
        color: var(--color-text-link);
        text-decoration: none;
        transition: color 0.3s ease-in-out;
    }

    a:hover {
        color: var(--color-text-link-hover);
    }

    .o_form_uri > span:first-child {
        color: var(--color-text-link) !important;
        text-decoration: none;
        transition: color 0.3s ease-in-out;
    }

    .o_form_view .o_form_uri > span:first-child {
        color: var(--color-text-link) !important;
    }

    .o_form_uri > span:first-child:hover {
        color: var(--color-text-link-hover) !important;
        text-decoration: underline;
    }

    .form-check-input:checked {
        background-color: var(--color-primary-hover);
        border-color: var(--color-checked-border);
    }

    .list-group-item.active {
        color: var(--color-primary-hover);
        background-color: var(--color-active-bg);
        border-color: var(--color-active-border);
    }

    .o_frontend_to_backend_nav .o_frontend_to_backend_apps_btn {
        background-color: var(--color-primary-hover);
    }

    .o_frontend_to_backend_nav:hover .o_frontend_to_backend_apps_btn:hover {
        background-color: var(--color-active-border);
    }

    .o_frontend_to_backend_nav::before {
        border-top: 20px solid var(--color-primary-hover);
        border-left: 20px solid var(--color-primary-hover);
    }

    .o_home_menu_background {
        --homeMenu-bg-color: var(--color-background);
        background: linear-gradient(45deg, var(--color-background-gradient-start), var(--color-background-gradient-end)) !important;
    }

    .o_home_menu .o_app .o_caption {
        color: var(--homeMenuCaption-color, #FFF) !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75), 0 2px 5px rgba(0, 0, 0, 0.05), 0 0 5px rgba(0, 0, 0, 0.05) !important;
    }

    .o_main_navbar .o_menu_toggle,
    .o_main_navbar .o_menu_brand,
    .o_main_navbar .o_navbar_apps_menu .dropdown-toggle,
    .o_main_navbar .o_nav_entry,
    .o_main_navbar .dropdown-toggle {
        color: var(--NavBar-entry-color, #E4E4E4);
    }
    `;

    // Apply the appropriate CSS
    if (path.startsWith('/web')) {
      addStyle(cssWeb, 'custom-css-web');
      removeStyle('custom-css-main');
    } else {
      addStyle(cssMain, 'custom-css-main');
      removeStyle('custom-css-web');
    }
  }

  // Only set up URL monitoring if we're on an allowed URL
  if (isUrlAllowed) {
    // Überwache URL-Änderungen für SPAs
    let lastPath = window.location.pathname;

    /**
     * Funktion zum Überprüfen von URL-Änderungen
     */
    function checkForUrlChange() {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        console.log("URL geändert zu:", currentPath);
        applyCSS();
      }
    }

    // MutationObserver für DOM-Änderungen
    const observer = new MutationObserver(() => {
      checkForUrlChange();
    });

    // Start observing when document.body is available
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }

    // HashChange-Eventlistener
    window.addEventListener('hashchange', checkForUrlChange);
  }
})();
