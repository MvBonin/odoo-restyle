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
    col01: "#a8e6a1", // Hellgrün (Highlight)
    col02: "#80c77a", // Kräftiges Mittelgrün
    col03: "#5a9a56", // Gedämpftes Dunkelgrün
    col04: "#376236", // Dunkelgrün
    col05: "#1b331b", // Sehr dunkles Grün
    colbg01: "#2c4d2c", // Hintergrund 1 (etwas dunkler als col04)
    colbg02: "#142614", // Hintergrund 2 (etwas dunkler als col05)
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
const colorsPinker = {
  col01: "#FFD9EC", // Helles Pastellpink
  col02: "#FF8ED2", // Intensives Pink
  col03: "#FF52B6", // Leuchtendes Pink
  col04: "#E62991", // Kräftiges, dunkleres Pink
  col05: "#A61D6B", // Tiefes Dunkelpink
  colbg01: "#731447", // Dunkler Hintergrund (kräftiges Pink)
  colbg02: "#3B0A25", // Sehr dunkler Hintergrund (fast schwarz-pink)
};

const colorsOrange = {
  col01: "#FFC285", // Helles Orange
  col02: "#FF9A49", // Kräftiges Orange
  col03: "#D17A33", // Gedämpftes Mittelorange
  col04: "#8A4E1E", // Dunkel-Orange-Braun
  col05: "#4A2910", // Sehr dunkles Braun
  colbg01: "#633614", // Dunkler Hintergrund
  colbg02: "#2E1A0A", // Noch dunklerer Hintergrund
};

const colorsPurple = {
  col01: "#D7B9FF", // Helles Violett
  col02: "#B18EFF", // Mittleres Violett
  col03: "#8A5DDB", // Gedämpftes Lila
  col04: "#57338A", // Dunkles Violett
  col05: "#301B4A", // Sehr dunkles Lila
  colbg01: "#402561", // Dunkler Hintergrund
  colbg02: "#1C1029", // Noch dunklerer Hintergrund
};

const colorsRed = {
  col01: "#FF9A9A", // Helles Rot-Rosa
  col02: "#FF5E5E", // Kräftiges Rot
  col03: "#C24444", // Dunkleres Rot
  col04: "#7A2B2B", // Dunkelrot
  col05: "#451919", // Sehr dunkles Burgund
  colbg01: "#561F1F", // Dunkler Hintergrund
  colbg02: "#260E0E", // Noch dunklerer Hintergrund
};

const colorsYellow = {
  col01: "#FFE899", // Warmes, helles Gelb (freundlich)
  col02: "#FFD966", // Wärmeres Mittelgelb
  col03: "#D9B13B", // Kräftiges, warmes Goldgelb
  col04: "#947324", // Warmes, dunkles Goldbraun
  col05: "#574312", // Sehr dunkles Braun
  colbg01: "#3C2E0D", // Dunkler Hintergrund
  colbg02: "#1F1706", // Noch dunklerer Hintergrund
};

const colorsGryffindor = {
  col01: "#FFC72C", // Helles Gold
  col02: "#FFB81C", // Gold
  col03: "#9E2A2F", // Dunkles Scharlachrot
  col04: "#7C1F23", // Sehr dunkles Scharlachrot
  col05: "#5A0E0E", // Tiefes Dunkelrot
  colbg01: "#7C1F23", // Hintergrund 1 (dunkles Scharlachrot)
  colbg02: "#5A0E0E", // Hintergrund 2 (tiefes Dunkelrot)
};
const colorsHufflepuff = {
  col01: "#FFF4B1", // Helles Gelb
  col02: "#FFEB3B", // Sonnengelb
  col03: "#FBC02D", // Goldgelb
  col04: "#795548", // Mittelbraun
  col05: "#4E342E", // Dunkelbraun
  colbg01: "#4E342E", // Hintergrund 1 (dunkelbraun)
  colbg02: "#3E2723", // Hintergrund 2 (sehr dunkelbraun)
};
const colorsRavenclaw = {
  col01: "#8E9AAF", // Helles Blau
  col02: "#5B748E", // Mittelblau
  col03: "#2C3E50", // Dunkelblau
  col04: "#A67B5B", // Bronze
  col05: "#7B5A3E", // Dunkles Bronze
  colbg01: "#2C3E50", // Hintergrund 1 (dunkelblau)
  colbg02: "#1C2833", // Hintergrund 2 (sehr dunkelblau)
};
const colorsSlytherin = {
  col01: "#A8D5BA", // Helles Grün
  col02: "#6FA287", // Mittelgrün
  col03: "#3C6E47", // Dunkelgrün
  col04: "#B0B7BC", // Silber
  col05: "#7D8285", // Dunkles Silber
  colbg01: "#3C6E47", // Hintergrund 1 (dunkelgrün)
  colbg02: "#2C4D34", // Hintergrund 2 (sehr dunkelgrün)
};

const colorsMario = {
  col01: "#FFB3B3", // Helles Mario-Rot
  col02: "#FF5C5C", // Intensives Mario-Rot
  col03: "#E52521", // Klassisches Mario-Rot
  col04: "#A81B18", // Dunkles Mario-Rot
  col05: "#660F0E", // Sehr dunkles Mario-Rot
  colbg01: "#104E8B", // Mario-Blau (Hose)
  colbg02: "#082542", // Sehr dunkles Blau (fast schwarz-blau)
};

const colorsLuigi = {
  col01: "#D3EFD9", // Sanftes, helles Luigi-Grün
  col02: "#9CD5A7", // Weiches Mittelgrün
  col03: "#64B57A", // Gedämpftes klassisches Luigi-Grün
  col04: "#3E7C4D", // Dunkleres Luigi-Grün
  col05: "#24472C", // Sehr dunkles Luigi-Grün
  colbg01: "#104E8B", // Luigi-Blau (Hose)
  colbg02: "#082542", // Sehr dunkles Blau (fast schwarz-blau)
};
const colorsYoshi = {
  col01: "#fcfcfc", // Weiß (Bauch/Ei)
  col02: "#6fd251", // Klassisches Yoshi-Grün
  col03: "#fd6134", // Orange-Rot (Yoshis Schuhe oder Stacheln)
  col04: "#fc8020", // Warmes Orange (Akzentfarbe)
  col05: "#e71a33", // Intensives Rot (Yoshis Panzer/Kontrast)
  colbg01: "#6fd251", // Hintergrund in Yoshi-Grün
  colbg02: "#2f6823", // Dunkles, gedämpftes Grün (für Kontrast)
};

const colorsPeach = {
  col01: "#FFE9F3", // Sehr helles Peach-Rosa
  col02: "#FFB8D9", // Mittelrosa (weich)
  col03: "#FF7EB9", // Klassisches Peach-Rosa
  col04: "#E25193", // Kräftiges dunkleres Rosa
  col05: "#8A2F59", // Tiefes Dunkelrosa
  colbg01: "#FFAD70", // Dunkleres, warmes Pfirsich-Orange
  colbg02: "#A17F3D", // Sehr dunkles Goldbraun
};



const colorsDonkeyKong = {
  col01: "#F3E3D3", // Sehr helles Beige
  col02: "#D7B48A", // Mittelbeige
  col03: "#A87C4F", // Warmes Braun (Donkey Kong Fell)
  col04: "#8B572A", // Klassisches DK-Braun
  col05: "#553419", // Sehr dunkles Braun
  colbg01: "#EAB464", // DK-Goldbraun (Fell-Kontrast)
  colbg02: "#7E5C32", // Sehr dunkles Goldbraun
};


  let activeColors = colorsBlue;

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
      case 'green':
        activeColors = colorsGreen;
        break;
      case 'orange':
        activeColors = colorsOrange;
        break;
      case 'purple':
        activeColors = colorsPurple;
        break;
      case 'red':
        activeColors = colorsRed;
        break;
      case 'yellow':
        activeColors = colorsYellow;
        break;
      case 'pink':
        activeColors = colorsPink;
        break;
      case 'pinker':  
        activeColors = colorsPinker;
        break;
      case 'gryffindor':
        activeColors = colorsGryffindor;
        break;
      case 'hufflepuff':
        activeColors = colorsHufflepuff;
        break;
      case 'ravenclaw':
        activeColors = colorsRavenclaw;
        break;
      case 'slytherin':
        activeColors = colorsSlytherin;
        break;
      case 'mario':
        activeColors = colorsMario;
        break;
      case 'luigi':
        activeColors = colorsLuigi;
        break;
      case 'yoshi':
        activeColors = colorsYoshi;
        break;
      case 'peach':
        activeColors = colorsPeach;
        break;
      case 'donkeykong':
        activeColors = colorsDonkeyKong;
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
    .fs-4 {
    text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
}
    .o_nav_entry {
    text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
    }
    .dropdown-toggle {
    text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
    }
    .o_menu_brand {
    text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
    }
    .o_menu_toggle {
    text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
    }
    /* Direkte Überschreibung der btn-primary Klasse */
    .btn-primary {
        background-color: var(--color-primary) !important;
        border-color: var(--color-primary) !important;
        color: var(--color-text-white) !important;
    }

    .text-primary {
        color: var(--color-primary) !important;
        
    }
        .text-info {
        color: var(--color-text-link) !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;

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
    .o_control_panel .breadcrumb{
        background: transparent;
        text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
    }
    .text-600 {
        --color: RGBA(200, 200, 200, var(--text-opacity, 1));
        color: #FFF !important;
    }
    .o-mail-Chatter-top,.o_control_panel_navigation,.o_last_breadcrumb_item,.o-form-buttonbox,.oe_stat_button,.o_button_more{
        background: transparent;
        color: #FFF;
    }
    i {
        color: #FFF;
    }
   .o_form_button_save,.o_form_button_cancel,.o-mail-Chatter-content,.o-mail-Chatter-follow {
        color: #FFF;
        background: transparent;
    }
    .text-muted {
        text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
        color: #FFF !important;
    }
    .o_stat_value {
      text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
      color: var(--color-text-link) !important;
      background-color: transparent !important;
      border-color: var(--color-text-link) !important;     
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
        color: var(--color-text-link) !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
        border-color: var(--color-text-link) !important;
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

    .o_form_view .o_form_sheet{
        background-color: rgba(38, 42, 54, 0.5) !important;
        backdrop-filter: blur(10px) !important; /* blur effect */
        -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
    }
    .o_kanban_renderer .o_kanban_record > div:not(.o_dropdown_kanban), .o_kanban_renderer .o_kanban_quick_create {
        background-color: rgba(38, 42, 54, 0.5) !important;
        backdrop-filter: blur(10px) !important; /* blur effect */
        -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
    }


 .btn-secondary, .o_searchview_dropdown_toggler, .o-dropdown--menu {
        background-color: rgba(38, 42, 54, 0.2) !important;
        color: #FFF !important;
        backdrop-filter: blur(10px) !important; /* blur effect */
        -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
        border-color: var(--color-primary) !important;
    }

 

      .btn-secondary:hover, .o_searchview_dropdown_toggler:hover {
        background-color: rgba(38, 42, 54, 0.3) !important;
        color: #FFF !important;
        backdrop-filter: blur(10px) !important; /* blur effect */
        -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
        border-color: var(--color-text-link) !important;
    }

    .o_searchview {
    background-color: rgba(38, 42, 54, 0.2) !important;
    border-color: var(--color-text-link) !important;
    }
    .o_arrow_button {
    border-color: var(--color-primary) !important;
    }
    .o_arrow_button_current::before {
        border-color-left: var(--color-primary) !important;
    }

        .o_searchview_input::placeholder {
    color: #EEEEEE;
    opacity: 1; /* ensures full opacity across browsers */
}

/* For cross-browser compatibility */
.o_searchview_input::-webkit-input-placeholder { /* Chrome, Safari, Edge */
    color: #EEEEEE;
    opacity: 1;
}
.o_searchview_input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #EEEEEE;
    opacity: 1;
}
.o_searchview_input::-moz-placeholder { /* Firefox 19+ */
    color: #EEEEEE;
    opacity: 1;
}
.o_searchview_input:-moz-placeholder { /* Firefox 4-18 */
    color: #EEEEEE;
    opacity: 1;
}

    .nav-tabs {
        background-color: rgba(38, 42, 54, 0.5) !important;
        backdrop-filter: blur(10px) !important; /* blur effect */
        -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
    }
    .nav-link {
        border-color: var(--color-primary) !important;
        border-radius: 0.25rem !important;
        margin: 2px;
    }
        .nav-item {}
    .nav-link.active {
        background-color: transparent !important;
        border-color: var(--color-primary-hover) !important;
        border-radius: 0.25rem !important;
        
    }
    .o_home_menu_background {
        --homeMenu-bg-color: var(--color-background);
        background: linear-gradient(45deg, var(--color-background-gradient-start), var(--color-background-gradient-end)) !important;
    }
    .o_menu_sections {
    color: #FFF !important;
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
