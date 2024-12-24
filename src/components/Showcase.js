import { Canvas } from '@react-three/fiber';
import { Model } from '../3D/Car';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const colors = [
  { name: 'Rouge', value: '#FF0000' },
  { name: 'Noir Métallique', value: '#1E1E1E' },
  { name: 'Blanc Nacré', value: '#FFFFFF' },
  { name: 'Bleu Nuit', value: '#000080' },
  { name: 'Gris Métallisé', value: '#808080' },
  { name: 'Vert Racing', value: '#006400' },
  { name: 'Orange Métallisé', value: '#FF4500' },
];

const rimColors = [
  { name: 'Chrome', value: '#CCCCCC' },
  { name: 'Noir Brillant', value: '#1A1A1A' },
  { name: 'Or', value: '#FFD700' },
  { name: 'Titane', value: '#303030' },
  { name: 'Bronze', value: '#CD7F32' },
  { name: 'Graphite', value: '#3C3C3C' },
];

const glassColors = [
  { name: 'Transparent', value: '#FFFFFF' },
  { name: 'Fumé', value: '#1A1A1A' },
  { name: 'Bleuté', value: '#A3D4FF' },
  { name: 'Bronze', value: '#CD7F32' },
];

const Showcase = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [selectedRimColor, setSelectedRimColor] = useState(null);
  const [selectedGlassColor, setSelectedGlassColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showRimColorPicker, setShowRimColorPicker] = useState(false);
  const [showGlassColorPicker, setShowGlassColorPicker] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
    setShowColorPicker(false);
    setShowRimColorPicker(false);
    setShowGlassColorPicker(false);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {/* Menu Carrosserie */}
        <div className="w-64">
          <button
            onClick={() => toggleMenu('body')}
            className="w-full p-4 rounded-lg bg-black/80 backdrop-blur-md 
                     hover:bg-black/90 transition-all duration-300
                     border-b border-white/10"
          >
            <h3 className="text-white/60 text-sm uppercase tracking-wider font-light mb-1">
              Carrosserie
            </h3>
            <p className="text-white text-xl font-light">
              Personnalisation
            </p>
          </button>
          {openMenu === 'body' && (
            <div className="mt-3 p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
              {showColorPicker && (
                <div className="mb-4 p-3 bg-black/40 rounded-lg">
                  <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
                </div>
              )}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-10 h-10 rounded-full bg-white/10 
                           flex items-center justify-center hover:bg-white/20
                           transition-all duration-300"
                  title="Color Picker"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                  </svg>
                </button>
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-300 
                              hover:scale-105 hover:shadow-lg hover:shadow-${color.value}/20
                              ${selectedColor === color.value 
                                ? 'ring-2 ring-white shadow-lg shadow-${color.value}/30' 
                                : 'ring-1 ring-white/20'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Jantes */}
        <div className="w-64">
          <button
            onClick={() => toggleMenu('rims')}
            className="w-full p-4 rounded-lg bg-black/80 backdrop-blur-md 
                     hover:bg-black/90 transition-all duration-300
                     border-b border-white/10"
          >
            <h3 className="text-white/60 text-sm uppercase tracking-wider font-light mb-1">
              Jantes
            </h3>
            <p className="text-white text-xl font-light">
              Finition
            </p>
          </button>
          {openMenu === 'rims' && (
            <div className="mt-3 p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
              {showRimColorPicker && (
                <div className="mb-4 p-3 bg-black/40 rounded-lg">
                  <HexColorPicker color={selectedRimColor} onChange={setSelectedRimColor} />
                </div>
              )}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setShowRimColorPicker(!showRimColorPicker)}
                  className="w-10 h-10 rounded-full bg-white/10 
                           flex items-center justify-center hover:bg-white/20
                           transition-all duration-300"
                  title="Rim Color Picker"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                  </svg>
                </button>
                {rimColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedRimColor(color.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-300 
                              hover:scale-105 hover:shadow-lg hover:shadow-${color.value}/20
                              ${selectedRimColor === color.value 
                                ? 'ring-2 ring-white shadow-lg shadow-${color.value}/30' 
                                : 'ring-1 ring-white/20'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Vitres */}
        <div className="w-64">
          <button
            onClick={() => toggleMenu('glass')}
            className="w-full p-4 rounded-lg bg-black/80 backdrop-blur-md 
                     hover:bg-black/90 transition-all duration-300
                     border-b border-white/10"
          >
            <h3 className="text-white/60 text-sm uppercase tracking-wider font-light mb-1">
              Vitres
            </h3>
            <p className="text-white text-xl font-light">
              Teinte
            </p>
          </button>
          {openMenu === 'glass' && (
            <div className="mt-3 p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
              {showGlassColorPicker && (
                <div className="mb-4 p-3 bg-black/40 rounded-lg">
                  <HexColorPicker color={selectedGlassColor || '#FFFFFF'} onChange={setSelectedGlassColor} />
                </div>
              )}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setShowGlassColorPicker(!showGlassColorPicker)}
                  className="w-10 h-10 rounded-full bg-white/10 
                           flex items-center justify-center hover:bg-white/20
                           transition-all duration-300"
                  title="Glass Color Picker"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                  </svg>
                </button>
                {glassColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedGlassColor(color.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-300 
                              hover:scale-105 hover:shadow-lg hover:shadow-${color.value}/20
                              ${selectedGlassColor === color.value 
                                ? 'ring-2 ring-white shadow-lg shadow-${color.value}/30' 
                                : 'ring-1 ring-white/20'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Canvas 
        shadows 
        camera={{ position: [-4, 1, 5], fov: 50 }} 
        className="w-full h-full"
      >
        <Environment preset="sunset" />
        <Stage environment={null} intensity={0.5}>
          <group position={[6, 0, 0]}>
            <Model color={selectedColor} rimColor={selectedRimColor} glassColor={selectedGlassColor} />
          </group>
        </Stage>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Showcase; 