import React, { Suspense } from 'react';
import './index.css';
import Hero from './components/Hero';
const Showcase = React.lazy(() => import('./components/Showcase'));

function App() {
  const scrollToConfigurator = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full h-[200vh]">
      {/* Section Hero */}
      <section className="h-screen top-0">
        <Hero scrollToConfigurator={scrollToConfigurator} />
      </section>

      {/* Section Showcase */}
      <section className="h-screen">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-black text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Chargement du configurateur...</p>
            </div>
          </div>
        }>
          <Showcase />
        </Suspense>
      </section>
    </div>
  );
}

export default App;
