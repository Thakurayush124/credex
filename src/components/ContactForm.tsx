import React, { useRef, useEffect, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  licenseType?: string;
  message?: string;
}

const licenseTypes = [
  'Adobe Creative Cloud',
  'Microsoft Office',
  'Autodesk Suite',
  'Salesforce',
  'SAP',
  'Oracle',
  'Other'
];

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formState.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formState.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormState({
          name: '',
          email: '',
          company: '',
          licenseType: '',
          message: ''
        });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="section bg-white" ref={formRef}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unlock the Value of Your Software?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out the form and one of our license valuation experts will get back to you within 24 hours with an estimate.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
              <ol className="space-y-3">
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">1</span>
                  <span>We'll review your information</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">2</span>
                  <span>A license expert will contact you</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">3</span>
                  <span>We'll provide a valuation estimate</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3">4</span>
                  <span>You decide to proceed or not</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {isSubmitted ? (
              <div className="card h-full flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      value={formState.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      value={formState.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="form-label">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className={`input ${errors.company ? 'border-red-500' : ''}`}
                      value={formState.company}
                      onChange={handleChange}
                    />
                    {errors.company && <p className="form-error">{errors.company}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="licenseType" className="form-label">License Type</label>
                    <select
                      id="licenseType"
                      name="licenseType"
                      className={`input ${errors.licenseType ? 'border-red-500' : ''}`}
                      value={formState.licenseType}
                      onChange={handleChange}
                    >
                      <option value="">Select License Type</option>
                      {licenseTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.licenseType && <p className="form-error">{errors.licenseType}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`input ${errors.message ? 'border-red-500' : ''}`}
                      value={formState.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;