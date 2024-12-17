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

const Showcase = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {showColorPicker && (
          <div className="mb-4 p-3 rounded-lg bg-white/10 backdrop-blur-md">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md 
                     flex items-center justify-center hover:bg-white/20 
                     transition-all duration-300"
            title="Color Picker"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
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
                          ? 'ring-2 ring-offset-2 ring-white scale-105' 
                          : 'ring-1 ring-white/20'}`}
              style={{ 
                backgroundColor: color.value,
                transform: selectedColor === color.value ? 'translateY(-4px)' : 'translateY(0)',
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Canvas 
        shadows 
        camera={{ position: [4, 2, 5], fov: 50 }} 
        className="w-full h-full"
      >
        <Environment preset="sunset" />
        <Stage environment={null} intensity={0.5}>
          <Model color={selectedColor} />
        </Stage>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Showcase; 