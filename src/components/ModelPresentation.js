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
    timeRef.current += delta * 2;
    const t = Math.min(1, timeRef.current);

    // Animation de rotation du modèle
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotation,
      t
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
      icon: "⚡",
      description: "Une puissance brute qui repousse les limites"
    },
    { 
      label: "Accélération", 
      value: "2.9 secondes", 
      icon: "🏃",
      description: "Du 0 à 100 km/h en un battement de cil"
    },
    { 
      label: "Vitesse", 
      value: "350 km/h", 
      icon: "🏎️",
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
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`
                  group relative overflow-hidden rounded-lg p-8
                  bg-gradient-to-br from-white/10 to-white/5
                  backdrop-blur-md border border-white/10
                  hover:border-white/20 transition-all duration-300
                  ${activeCameraIndex === index ? 'border-gold-500' : ''}
                `}
                onClick={() => setActiveCameraIndex(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{spec.icon}</div>
                  <div className="text-white font-medium text-xl mb-2">{spec.label}</div>
                  <div className="text-gold-500 font-bold text-2xl mb-3">{spec.value}</div>
                  <div className="text-gray-400 text-sm font-light">{spec.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPresentation; 