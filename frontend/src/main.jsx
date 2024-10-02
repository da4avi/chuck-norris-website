import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next'

import global_en from './components/Locales/en/global.json'
import global_pt from './components/Locales/pt/global.json'

i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: {
           global: global_en
        },
        pt: {
            global: global_pt
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
)

