import React, { useRef, useEffect, useState } from 'react';
import { Upload, Search, CreditCard } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, index, isVisible }) => {
  return (
    <div
      className={`card bg-white p-6 rounded-lg shadow transition-all duration-500 hover:shadow-xl hover:scale-105 hover:bg-blue-50 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 transition-all duration-300 hover:bg-blue-200 hover:rotate-6 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 transition-colors duration-300 hover:text-blue-600">{title}</h3>
        <p className="text-gray-600 transition-colors duration-300 hover:text-gray-800">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: 'Upload License',
      description: 'Share your software license details through our secure portal for a quick evaluation.',
    },
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: 'Get Valuation',
      description: 'Our market experts analyze your license and provide you with a competitive offer within 24 hours.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: 'Get Paid',
      description: 'Accept our offer and receive payment through your preferred method within 3-5 business days.',
    },
  ];

  return (
    <section id="how-it-works" className="section bg-gray-50 py-16" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Our streamlined process makes it easy to turn your unused software licenses into cash.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;