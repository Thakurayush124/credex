import React from 'react';
import { ShieldCheck, Clock, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg"
          >
            {icon}
          </motion.div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: 'Secure Transactions',
      description: 'All license transfers follow legal requirements with our secure verification process.',
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: 'Fast Processing',
      description: 'Get valuations within 24 hours and payment within days, not weeks.',
    },
    {
      icon: <DollarSign className="h-6 w-6 text-blue-600" />,
      title: 'Maximum Value',
      description: 'Our market expertise ensures you get the highest possible return on your licenses.',
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Expert Support',
      description: 'Our dedicated team guides you through every step of the selling process.',
    },
  ];

  return (
    <section id="why-choose-us" className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Why Choose SoftSell?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              We've helped hundreds of businesses recover costs from underutilized software. Here's why companies trust us:
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100 rounded-full blur-3xl"
              ></motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-soft"
              >
                <div className="p-6 bg-gradient-to-r from-blue-600 to-teal-600">
                  <h3 className="text-2xl font-bold text-white mb-2">Recovery Rate</h3>
                  <p className="text-white/80">Average license value recovery</p>
                </div>
                
                <div className="bg-white p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Adobe Creative Cloud', value: 65 },
                      { name: 'Microsoft Office', value: 70 },
                      { name: 'Autodesk Suite', value: 60 },
                      { name: 'Salesforce', value: 75 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.name}</span>
                          <span className="font-semibold">Up to {item.value}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="h-full bg-blue-600 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;