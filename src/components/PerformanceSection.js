import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(end * percentage));
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const PerformanceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const specs = [
    {
      category: "Moteur",
      title: "V8 Biturbo",
      specs: [
        { label: "Cylindrée", value: "4.0", unit: "L" },
        { label: "Puissance", value: "700", unit: "ch" },
        { label: "Couple", value: "800", unit: "Nm" }
      ]
    },
    {
      category: "Transmission",
      title: "Séquentielle",
      specs: [
        { label: "Vitesses", value: "7", unit: "" },
        { label: "0-100 km/h", value: "2.9", unit: "s" },
        { label: "Vitesse max", value: "350", unit: "km/h" }
      ]
    },
    {
      category: "Aérodynamisme",
      title: "Actif",
      specs: [
        { label: "Appui", value: "490", unit: "kg" },
        { label: "Cx", value: "0.35", unit: "" },
        { label: "Aileron", value: "3", unit: "positions" }
      ]
    },
    {
      category: "Technologies",
      title: "Connectée",
      specs: [
        { label: "Modes conduite", value: "5", unit: "" },
        { label: "Écran tactile", value: "12", unit: "pouces" },
        { label: "Capteurs", value: "16", unit: "" }
      ]
    }
  ];

  return (
    <div ref={ref} className="min-h-screen w-full bg-black relative py-24 ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl  mb-20 pl-12"
      >
        <h2 className="text-5xl font-bold text-white mb-6 font-serif ">
          Performance & Technologie
        </h2>
        <p className="text-xl text-gray-400 font-light max-w-2xl ">
          Une fusion parfaite entre puissance mécanique et innovation technologique,
          repoussant les limites de l'excellence automobile.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {specs.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <div className="border-b-2 border-white/20 pb-6 mb-6">
              <h3 className="text-white/60 text-sm uppercase tracking-wider font-light mb-2">
                {section.category}
              </h3>
              <p className="text-white text-2xl font-light">
                {section.title}
              </p>
            </div>
            
            <div className="space-y-6">
              {section.specs.map((spec, i) => (
                <div key={spec.label} className="flex justify-between items-baseline">
                  <span className="text-white/40 text-sm">
                    {spec.label}
                  </span>
                  <span className="text-white text-xl font-light">
                    <CountUp end={parseFloat(spec.value)} />
                    <span className="text-white/60 ml-1">{spec.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSection; 