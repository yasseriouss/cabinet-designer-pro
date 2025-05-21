import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from './components/layout/MainLayout';
import CabinetViewer from './components/CabinetViewer';
import './lib/i18n';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [cabinetConfig, setCabinetConfig] = useState({
    dimensions: {
      width: 600,
      height: 720,
      depth: 580
    },
    material: 'mdf',
    cabinetType: 'base',
    doorStyle: 'flat',
    hasDrawers: false
  });

  // Listen for cabinet configuration changes from sidebar
  useEffect(() => {
    const handleConfigChange = (event: CustomEvent) => {
      setCabinetConfig(event.detail);
    };

    window.addEventListener('cabinet-config-change', handleConfigChange as EventListener);
    return () => {
      window.removeEventListener('cabinet-config-change', handleConfigChange as EventListener);
    };
  }, []);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4">{t('view3d')}</h2>
        <div className="flex-1">
          <CabinetViewer 
            dimensions={cabinetConfig.dimensions}
            material={cabinetConfig.material}
            cabinetType={cabinetConfig.cabinetType}
            doorStyle={cabinetConfig.doorStyle}
            hasDrawers={cabinetConfig.hasDrawers}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
