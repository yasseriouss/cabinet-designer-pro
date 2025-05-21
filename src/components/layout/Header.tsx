import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Download } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
            aria-label={sidebarOpen ? t('closeSidebar') : t('openSidebar')}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold">{t('appTitle')}</h1>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <button 
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-foreground/10 transition-colors flex items-center"
            >
              <Download size={18} className="mr-1 rtl:ml-1 rtl:mr-0" />
              <span>{t('export')}</span>
            </button>
            
            {exportMenuOpen && (
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-1 w-48 bg-popover shadow-lg rounded-md overflow-hidden z-50">
                <div className="py-1">
                  {['pdf', 'excel', 'dxf', 'gcode'].map((format) => (
                    <button
                      key={format}
                      className="w-full text-left rtl:text-right px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => {
                        // Export logic will be implemented later
                        setExportMenuOpen(false);
                      }}
                    >
                      {t(`export${format.charAt(0).toUpperCase() + format.slice(1)}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
            aria-label={t('switchLanguage')}
          >
            <Globe size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
