import { Canvas, useFrame } from '@react-three/fiber';
import { Model } from '../3D/Car';
import { Environment, Stage } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

// Composant pour la scène 3D avec animation de caméra
const Scene = ({ inView, targetCameraIndex }) => {
  const modelRef = useRef();
  const timeRef = useRef(0);
  
  // Angles de rotation pour chaque vue (en radians)
  const rotationAngles = [
    0,           // Vue avant
    Math.PI,     // Vue arrière
    Math.PI/2,   // Vue profil
  ];

  useFrame((state, delta) => {
    if (!modelRef.current || !inView) return;

    const targetRotation = rotationAngles[targetCameraIndex];
    timeRef.current += delta * 1.2;
    const t = Math.min(1, timeRef.current);

    // Animation de rotation du modèle
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation,
      t * 0.8
    );

    if (t === 1) {
      timeRef.current = 0;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Stage environment={null} intensity={0.5}>
        <group ref={modelRef} position={[0, 0, 0]}>
          <Model color="#FF0000" />
        </group>
      </Stage>
    </>
  );
};

const ModelPresentation = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const [activeCameraIndex, setActiveCameraIndex] = useState(0);

  const specs = [
    { 
      label: "Performance", 
      value: "700 chevaux", 
      description: "Une puissance brute qui repousse les limites"
    },
    { 
      label: "Accélération", 
      value: "2.9 secondes", 
      description: "Du 0 à 100 km/h en un battement de cil"
    },
    { 
      label: "Vitesse", 
      value: "350 km/h", 
      description: "Une vitesse maximale à couper le souffle"
    }
  ];

  return (
    <div ref={ref} className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Canvas 3D */}
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [-3, 0.5, 3], fov: 50 }}>
          <Scene inView={inView} targetCameraIndex={activeCameraIndex} />
        </Canvas>
      </div>

      {/* Contenu */}
      <div className="relative z-10 h-full min-h-screen flex flex-col justify-between p-12">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-7xl font-bold text-white mb-4 font-serif">
            Lotus Exige
            <span className="text-4xl text-gold-500 ml-4 font-light">230</span>
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            Une fusion parfaite entre puissance brute et élégance raffinée.
            L'expression ultime du luxe automobile.
          </p>
        </motion.div>

        {/* Specs */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specs.map((spec, index) => (
              <motion.button
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.3,
                  ease: "easeOut"
                }}
                onClick={() => setActiveCameraIndex(index)}
                className={`
                  group relative px-8 py-6 text-left
                  border-b-2 ${activeCameraIndex === index ? 'border-white' : 'border-white/20'}
                  hover:border-white transition-all duration-300
                `}
              >
                <div className="space-y-3">
                  <h3 className="text-white/60 text-sm uppercase tracking-wider font-light">
                    {spec.label}
                  </h3>
                  <p className="text-white text-3xl font-light">
                    {spec.value}
                  </p>
                  <p className="text-white/40 text-sm font-light pr-12">
                    {spec.description}
                  </p>
                </div>
                <span className={`
                  absolute right-4 top-1/2 transform -translate-y-1/2
                  text-white/20 group-hover:text-white transition-all duration-300
                  ${activeCameraIndex === index ? 'text-white' : ''}
                `}>
                  →
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPresentation; 