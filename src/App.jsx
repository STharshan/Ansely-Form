import { useState } from 'react'
import ServiceInquiryForm from './page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/Term'
import GDPRConsent from './components/GDPRBanner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceInquiryForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>
      <GDPRConsent />
    </BrowserRouter>
  )
}

export default App
