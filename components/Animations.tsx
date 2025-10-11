import React, { useEffect } from 'react';

const Animations = () => {
  useEffect(() => {
    const container = document.querySelector('main');
    if (!container) {
      console.log('Main container not found');
      return;
    }

    const tabs = document.getElementsByClassName('tabs');
    if (tabs.length === 0) {
      console.log('No tabs found');
      return;
    }

    console.log('Container dimensions:', container.offsetWidth, container.offsetHeight);
    console.log('Tabs found:', tabs.length);

    const getRandomDirection = (index: number) => {
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const angle = (index * (2 * Math.PI) / tabs.length) + (Math.random() - 0.5);
      return {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4
      };
    };

    const moveTabs = () => {
      Array.from(tabs).forEach((tab, index) => {
        let posX = (index * (container.offsetWidth / (tabs.length + 1))) % (container.offsetWidth - tab.offsetWidth);
        let posY = (index * (container.offsetHeight / (tabs.length + 1))) % (container.offsetHeight - tab.offsetHeight);
        let direction = getRandomDirection(index);
        const speed = 0.1; // Further reduced speed from 0.5 to 0.2 for slower movement

        tab.style.left = posX + 'px';
        tab.style.top = posY + 'px';

        const animate = () => {
          posX += direction.x * speed;
          posY += direction.y * speed;

          const containerRect = container.getBoundingClientRect();
          const tabRect = tab.getBoundingClientRect();

          if (posX + tabRect.width > containerRect.width) {
            direction.x = -Math.abs(direction.x);
            posX = containerRect.width - tabRect.width;
          } else if (posX < 0) {
            direction.x = Math.abs(direction.x);
            posX = 0;
          }

          if (posY + tabRect.height > containerRect.height) {
            direction.y = -Math.abs(direction.y);
            posY = containerRect.height - tabRect.height;
          } else if (posY < 0) {
            direction.y = Math.abs(direction.y);
            posY = 0;
          }

          tab.style.left = posX + 'px';
          tab.style.top = posY + 'px';

          requestAnimationFrame(animate);
        };

        animate();
      });
    };

    moveTabs();
  }, []);

  return (
    <div className="container mx-auto p-4 w-full relative z-30">
      {/* Tabs will move within the entire <main> height and width */}
      <div style={{ position: 'absolute', top: '10%', left: '10%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">NEBOSH IGC</section>
      </div>
      <div style={{ position: 'absolute', top: '20%', left: '30%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">First Aid</section>
      </div>
      <div style={{ position: 'absolute', top: '30%', left: '50%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Fire Safety</section>
      </div>
      <div style={{ position: 'absolute', top: '40%', left: '70%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Risk Assessment</section>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '90%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Work at Height</section>
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '20%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Safety Training</section>
      </div>
      <div style={{ position: 'absolute', top: '70%', left: '40%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Incident Investigation</section>
      </div>
      <div style={{ position: 'absolute', top: '80%', left: '60%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Safety Auditing</section>
      </div>
      <div style={{ position: 'absolute', top: '80%', left: '20%' }}>
        <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Computer Science</section>
      </div>
      <div style={{ position: 'absolute', top: '10%', left: '20%' }}>
    <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">Typing speed 50</section>
      </div>
      <div style={{ position: 'absolute', top: '90%', left: '20%' }}>
    <section className="tabs bg-red-500 text-white px-2 py-1 rounded w-max text-[9px] md:text-[13px] transition-all duration-300 ease-out transform">5 years experience</section>
      </div>
    </div>
  );
};

export default Animations;