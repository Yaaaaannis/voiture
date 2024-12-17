import './index.css';
import { Canvas } from '@react-three/fiber';
import { Model } from './3D/Car';
import { OrbitControls, Environment, Stage } from '@react-three/drei';
import { useState } from 'react';


const colors = [
  { name: 'Rouge', value: '#FF0000' },
  { name: 'Noir Métallique', value: '#1E1E1E' },
  { name: 'Blanc Nacré', value: '#FFFFFF' },
  { name: 'Bleu Nuit', value: '#000080' },
  { name: 'Gris Métallisé', value: '#808080' },
  { name: 'Vert Racing', value: '#006400' },
  { name: 'Orange Métallisé', value: '#FF4500' },
];

function App() {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <div className="absolute top-5 left-5 z-10">
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg px-4 py-2 
                     shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer
                     outline-none appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,

          }}
        >
          {colors.map((color) => (
            <option 
              key={color.value} 
              value={color.value}
              className="bg-gray-800 text-white"
            >
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute bottom-5 left-5 z-10 flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 hover:scale-110
                      ${selectedColor === color.value ? 'border-white scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>

      <Canvas 
        shadows 
        camera={{ position: [4, 2, 5], fov: 50 }} 
        style={{ width: '100vw', height: '100vh' }}
      >
        <Environment preset="sunset" />
        <Stage environment={null} intensity={0.5}>
          <Model color={selectedColor} />
        </Stage>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default App;
