import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '../3D/Car';
import { Environment, Stage } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ scrollToConfigurator }) => {
  return (
    <div className="relative h-full w-full">
      {/* Vidéo d'arrière-plan */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="./showcase.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
        <div className="h-full flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl font-bold text-white mb-6">
              L'excellence <br />
              automobile
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-md">
              Explorez chaque détail, personnalisez chaque aspect,
              créez votre chef-d'œuvre automobile.
            </p>
            <button
              onClick={scrollToConfigurator}
              className="group relative px-8 py-4 bg-white text-black
                       hover:bg-gray-100 transition-all duration-300"
            >
              Commencer la personnalisation
              <span className="absolute -right-2 top-1/2 transform -translate-y-1/2
                             group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 