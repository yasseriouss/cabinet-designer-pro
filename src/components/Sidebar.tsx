import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({
    dimensions: true,
    cabinetType: true,
    materials: true,
    doors: false,
    drawers: false,
    cnc: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  if (!open) return null;

  return (
    <aside className="w-80 bg-card border-r border-border overflow-y-auto flex-shrink-0 transition-all duration-300">
      <div className="p-4">
        <div className="space-y-4">
          {/* Cabinet Type Section */}
          <SidebarSection 
            title={t('cabinetType')} 
            expanded={expandedSections.cabinetType}
            onToggle={() => toggleSection('cabinetType')}
          >
            <div className="grid grid-cols-2 gap-2">
              {['base', 'wall', 'tall', 'corner'].map((type) => (
                <button
                  key={type}
                  className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="h-12 w-12 mb-2 bg-muted rounded flex items-center justify-center">
                    {/* Icon placeholders - will be replaced with actual cabinet icons */}
                    <div className="w-8 h-8 border-2 border-current rounded"></div>
                  </div>
                  <span className="text-sm">{t(`cabinet${type.charAt(0).toUpperCase() + type.slice(1)}`)}</span>
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* Dimensions Section */}
          <SidebarSection 
            title={t('dimensions')} 
            expanded={expandedSections.dimensions}
            onToggle={() => toggleSection('dimensions')}
          >
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1">{t('width')}</label>
                <input 
                  type="number" 
                  min="300" 
                  max="1200" 
                  defaultValue="600"
                  className="w-full p-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">{t('height')}</label>
                <input 
                  type="number" 
                  min="300" 
                  max="2400" 
                  defaultValue="720"
                  className="w-full p-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">{t('depth')}</label>
                <input 
                  type="number" 
                  min="300" 
                  max="600" 
                  defaultValue="580"
                  className="w-full p-2 border border-border rounded-md bg-background"
                />
              </div>
            </div>
          </SidebarSection>

          {/* Materials Section */}
          <SidebarSection 
            title={t('materials')} 
            expanded={expandedSections.materials}
            onToggle={() => toggleSection('materials')}
          >
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">{t('primaryMaterial')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="wood">{t('wood')}</option>
                  <option value="mdf">{t('mdf')}</option>
                  <option value="melamine">{t('melamine')}</option>
                  <option value="plywood">{t('plywood')}</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('thickness')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="16">16mm</option>
                  <option value="18">18mm</option>
                  <option value="22">22mm</option>
                  <option value="25">25mm</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('edgeBanding')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="matching">{t('matchingEdge')}</option>
                  <option value="contrast">{t('contrastEdge')}</option>
                  <option value="none">{t('noEdgeBanding')}</option>
                </select>
              </div>
            </div>
          </SidebarSection>

          {/* Doors Section */}
          <SidebarSection 
            title={t('doors')} 
            expanded={expandedSections.doors}
            onToggle={() => toggleSection('doors')}
          >
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">{t('doorStyle')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="flat">{t('flatDoor')}</option>
                  <option value="shaker">{t('shakerDoor')}</option>
                  <option value="raised">{t('raisedPanel')}</option>
                  <option value="glass">{t('glassDoor')}</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('hingeType')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="concealed">{t('concealedHinge')}</option>
                  <option value="soft-close">{t('softCloseHinge')}</option>
                  <option value="overlay">{t('overlayHinge')}</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input type="checkbox" id="door-handles" className="rounded border-border" />
                <label htmlFor="door-handles" className="text-sm">{t('includeHandles')}</label>
              </div>
            </div>
          </SidebarSection>

          {/* Drawers Section */}
          <SidebarSection 
            title={t('drawers')} 
            expanded={expandedSections.drawers}
            onToggle={() => toggleSection('drawers')}
          >
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">{t('drawerCount')}</label>
                <input 
                  type="number" 
                  min="0" 
                  max="5" 
                  defaultValue="1"
                  className="w-full p-2 border border-border rounded-md bg-background"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('drawerSlideType')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="standard">{t('standardSlide')}</option>
                  <option value="full-extension">{t('fullExtension')}</option>
                  <option value="soft-close">{t('softCloseSlide')}</option>
                  <option value="push-open">{t('pushOpen')}</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('drawerBoxType')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="standard">{t('standardBox')}</option>
                  <option value="dovetail">{t('dovetailBox')}</option>
                  <option value="metal">{t('metalBox')}</option>
                </select>
              </div>
            </div>
          </SidebarSection>

          {/* CNC Options Section */}
          <SidebarSection 
            title={t('cncOptions')} 
            expanded={expandedSections.cnc}
            onToggle={() => toggleSection('cnc')}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">{t('hingeMortising')}</label>
                <input type="checkbox" className="toggle toggle-sm" />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">{t('drawerSlideGrooves')}</label>
                <input type="checkbox" className="toggle toggle-sm" />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">{t('shelfPinHoles')}</label>
                <input type="checkbox" className="toggle toggle-sm" />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm">{t('joinery')}</label>
                <input type="checkbox" className="toggle toggle-sm" />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">{t('bitDiameter')}</label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="6">6mm</option>
                  <option value="8">8mm</option>
                  <option value="10">10mm</option>
                  <option value="12">12mm</option>
                </select>
              </div>
            </div>
          </SidebarSection>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
            {t('generateCabinet')}
          </button>
          <button className="w-full bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors">
            {t('resetSettings')}
          </button>
        </div>
      </div>
    </aside>
  );
};

interface SidebarSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarSection = ({ title, expanded, onToggle, children }: SidebarSectionProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
        onClick={onToggle}
      >
        <h3 className="font-medium">{title}</h3>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {expanded && (
        <div className="p-3 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
