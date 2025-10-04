'use client'

import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'

// Step titles
const steps = [
    'Client Information',
    'Project Scope & Requirements',
    'Design Preferences',
    'Content',
    'SEO & Tracking',
    'Timeline & Deadlines',
]

const ServiceInquiryForm = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Navigation
    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (step < steps.length) {
            nextStep()
        } else {
            setLoading(true)
            emailjs
                .send(
                    'service_404lxe7', // Replace with your service ID
                    'template_k27qfsp', // Replace with your template ID
                    formData,
                    'tmUgtXKf_TwGrV1iE' // Replace with your public key
                )
                .then(
                    () => {
                        toast.success('Form submitted successfully!')
                        setFormData({})
                        setStep(1)
                    },
                    (error) => {
                        toast.error('Something went wrong, please try again.')
                    }
                )
                .finally(() => setLoading(false))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 text-white">
            {/* Toaster for notifications */}
            <Toaster position="top-right" reverseOrder={false} />

            <main className="w-full max-w-4xl px-4 sm:px-6 md:px-8 py-10 sm:py-16">
                {/* Title */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="text-orange-500">Service Inquiry</span> Form
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
                        Click any section below to view or edit that part of your project inquiry.
                    </p>
                </div>

                {/* Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
                    {steps.map((label, idx) => {
                        const isActive = step === idx + 1
                        const isCompleted = step > idx + 1

                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setStep(idx + 1)}
                                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 text-center ${isActive
                                        ? 'bg-orange-500/10 border border-orange-500 text-orange-400'
                                        : isCompleted
                                            ? 'bg-green-500/10 border border-green-500 text-green-400'
                                            : 'bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800/70 hover:text-orange-400'
                                    }`}
                            >
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium ${isActive
                                            ? 'border-orange-400 text-orange-400'
                                            : isCompleted
                                                ? 'border-green-400 text-green-400'
                                                : 'border-gray-600 text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle size={18} /> : idx + 1}
                                </div>
                                <span className="text-sm sm:text-base font-medium">{label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-lg space-y-6 transition-all duration-300"
                >
                    {/* Step 1: Client Info */}
                    {step === 1 && (
                        <>
                            <InputField label="Business Name *" name="businessName" required onChange={handleChange} placeholder="Your Business Name" />
                            <InputField label="Point of Contact Name *" name="contactName" required onChange={handleChange} placeholder="John Doe" />
                            <InputField label="Point of Contact Email *" name="contactEmail" type="email" required onChange={handleChange} placeholder="john@example.com" />
                            <InputField label="Point of Contact Phone" name="contactPhone" onChange={handleChange} placeholder="+44 20 1234 5678" />
                            <TextAreaField label="Business Address" name="businessAddress" onChange={handleChange} placeholder="Street, City, Country" />
                            <InputField label="Industry/Niche" name="industry" onChange={handleChange} placeholder="E.g., Healthcare, Retail" />
                        </>
                    )}

                    {/* Step 2: Project Scope */}
                    {step === 2 && (
                        <>
                            <SelectField label="Type of Website *" name="websiteType" required onChange={handleChange}>
                                <option value="">Select type</option>
                                <option value="informational">Informational</option>
                                <option value="e-commerce">E-commerce</option>
                                <option value="booking">Booking</option>
                                <option value="portfolio">Portfolio</option>
                                <option value="other">Other</option>
                            </SelectField>
                            <InputField label="Number of Pages" name="numberOfPages" onChange={handleChange} placeholder="E.g., Home, About, Services, Contact" />
                            <TextAreaField label="Services Offered" name="servicesOffered" onChange={handleChange} placeholder="Describe the type of work you conduct" />
                            <TextAreaField label="Specific Functionality" name="specificFunctionality" onChange={handleChange} placeholder="E.g., contact form, online booking, gallery, blog" />
                            <SelectField label="Platform Preference" name="platformPreference" onChange={handleChange}>
                                <option value="">Select platform</option>
                                <option value="wordpress">WordPress</option>
                                <option value="react">React</option>
                                <option value="other">Other</option>
                            </SelectField>
                            <TextAreaField label="Hosting and Domain Info" name="hostingDomainInfo" onChange={handleChange} placeholder="Who provides hosting/domain or if already owned" />
                        </>
                    )}

                    {/* Step 3: Design Preferences */}
                    {step === 3 && (
                        <>
                            <InputField label="Design Style" name="designStyle" onChange={handleChange} placeholder="Modern, minimal, bold, professional..." />
                            <InputField label="Color Scheme" name="colorScheme" onChange={handleChange} placeholder="Preferred colors or hex codes" />
                            <InputField label="Font Preferences" name="fontPreferences" onChange={handleChange} placeholder="Specific fonts or styles" />
                            <TextAreaField label="Logos and Branding Assets" name="logosAssets" onChange={handleChange} placeholder="Upload or describe logo files, brand guidelines" />
                            <TextAreaField label="Reference Websites" name="referenceWebsites" onChange={handleChange} placeholder="Examples you like or dislike" />
                        </>
                    )}

                    {/* Step 4: Content */}
                    {step === 4 && (
                        <>
                            <TextAreaField label="Text Content for Each Page" name="textContent" onChange={handleChange} placeholder="Who will provide the text content?" />
                            <TextAreaField label="Legal Pages" name="legalPages" onChange={handleChange} placeholder="Privacy Policy, Terms, etc." />
                        </>
                    )}

                    {/* Step 5: SEO & Tracking */}
                    {step === 5 && (
                        <>
                            <TextAreaField label="Keywords / SEO Goals" name="seoGoals" onChange={handleChange} placeholder="Important keywords or goals" />
                            <TextAreaField label="Google Analytics / Tag Manager Access" name="analytics" onChange={handleChange} placeholder="Provide access info or accounts" />
                            <TextAreaField label="Meta Titles & Descriptions" name="metaData" onChange={handleChange} placeholder="If available" />
                        </>
                    )}

                    {/* Step 6: Timeline & Deadlines */}
                    {step === 6 && (
                        <>
                            <InputField label="Project Start Date" name="startDate" type="date" onChange={handleChange} />
                            <TextAreaField label="Key Milestones or Deadlines" name="milestones" onChange={handleChange} placeholder="Describe important milestones" />
                            <InputField label="Go-Live Date (if known)" name="goLiveDate" type="date" onChange={handleChange} />
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="group flex items-center px-5 py-2.5 rounded-md border border-gray-700 text-white hover:bg-gray-800 transition-all"
                            >
                                <ArrowLeft
                                    className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
                                />
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    Back
                                </span>
                            </button>

                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group flex items-center justify-center px-6 py-2.5 rounded-md bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-medium shadow-md transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            <span
                                className={`transition-transform duration-300 ${!loading ? 'group-hover:-translate-x-1' : ''
                                    }`}
                            >
                                {loading ? 'Submitting...' : step === steps.length ? 'Submit' : 'Next'}
                            </span>
                            {!loading && (
                                <ArrowRight
                                    className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            )}
                        </button>

                    </div>
                </form>
            </main>
        </div>
    )
}

/* Reusable Components */
const InputField = ({ label, name, type = 'text', required, placeholder, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
            type={type}
            name={name}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
    </div>
)

const TextAreaField = ({ label, name, placeholder, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <textarea
            name={name}
            placeholder={placeholder}
            rows="3"
            onChange={onChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        />
    </div>
)

const SelectField = ({ label, name, required, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <select
            name={name}
            required={required}
            onChange={onChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
        >
            {children}
        </select>
    </div>
)

export default ServiceInquiryForm
