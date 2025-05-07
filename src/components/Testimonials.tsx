import React, { useRef, useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  index: number;
  isVisible: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, name, title, company, index, isVisible 
}) => {
  return (
    <div 
      className={`card hover:shadow-lg transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <Quote className="h-10 w-10 text-blue-200 mb-4" />
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{title}, {company}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
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

  const testimonials = [
    {
      quote: "SoftSell helped us recover nearly 70% of the value from our unused Adobe licenses after downsizing. The process was seamless and exceeded our expectations.",
      name: "Sarah Johnson",
      title: "CTO",
      company: "TechNova Solutions"
    },
    {
      quote: "When we migrated to cloud solutions, we had dozens of unused licenses. SoftSell turned what would have been a total loss into a significant cost recovery.",
      name: "Michael Chen",
      title: "IT Director",
      company: "Horizon Financial"
    }
  ];

  return (
    <section id="testimonials" className="section bg-gray-50" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;