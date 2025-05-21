import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CabinetViewerProps {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  cabinetType: string;
  doorStyle: string;
  hasDrawers: boolean;
}

const CabinetViewer = ({
  dimensions,
  material,
  cabinetType,
  doorStyle,
  hasDrawers
}: CabinetViewerProps) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'3d' | 'front' | 'side' | 'top' | 'exploded'>('3d');

  // Convert dimensions from mm to meters for Three.js
  const width = dimensions.width / 1000;
  const height = dimensions.height / 1000;
  const depth = dimensions.depth / 1000;

  // Material colors based on selection
  const getMaterialColor = () => {
    switch(material) {
      case 'wood': return '#8B4513';
      case 'mdf': return '#D2B48C';
      case 'melamine': return '#F5F5F5';
      case 'plywood': return '#DEB887';
      default: return '#8B4513';
    }
  };

  // Camera position based on view mode
  const getCameraPosition = (): [number, number, number] => {
    switch(viewMode) {
      case 'front': return [0, 0, Math.max(width, height, depth) * 2];
      case 'side': return [Math.max(width, height, depth) * 2, 0, 0];
      case 'top': return [0, Math.max(width, height, depth) * 2, 0];
      case 'exploded': return [width, height, depth * 2];
      default: return [width, height, depth * 1.5];
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-2 rtl:space-x-reverse mb-4">
        {(['3d', 'front', 'side', 'top', 'exploded'] as const).map((mode) => (
          <button
            key={mode}
            className={`px-3 py-1 rounded-md ${
              viewMode === mode 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setViewMode(mode)}
          >
            {t(`view${mode}`)}
          </button>
        ))}
      </div>
      
      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-background">
        <Canvas shadows>
          <Suspense fallback={null}>
            <PerspectiveCamera 
              makeDefault 
              position={getCameraPosition()} 
              fov={50}
            />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={viewMode === '3d' || viewMode === 'exploded'}
            />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            
            <Cabinet 
              width={width} 
              height={height} 
              depth={depth} 
              materialColor={getMaterialColor()}
              cabinetType={cabinetType}
              doorStyle={doorStyle}
              hasDrawers={hasDrawers}
              exploded={viewMode === 'exploded'}
            />
            
            <Environment preset="apartment" />
            
            {/* Grid helper */}
            <gridHelper args={[3, 30]} position={[0, -0.01, 0]} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

interface CabinetProps {
  width: number;
  height: number;
  depth: number;
  materialColor: string;
  cabinetType: string;
  doorStyle: string;
  hasDrawers: boolean;
  exploded: boolean;
}

const Cabinet = ({
  width,
  height,
  depth,
  materialColor,
  cabinetType,
  doorStyle,
  hasDrawers,
  exploded
}: CabinetProps) => {
  // Material thickness in meters (18mm)
  const thickness = 0.018;
  
  return (
    <group>
      {/* Left side panel */}
      <mesh 
        position={[-width/2 + thickness/2, height/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial color={materialColor} />
      </mesh>
      
      {/* Right side panel */}
      <mesh 
        position={[width/2 - thickness/2, height/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial color={materialColor} />
      </mesh>
      
      {/* Top panel */}
      <mesh 
        position={[0, height - thickness/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width - thickness*2, thickness, depth]} />
        <meshStandardMaterial color={materialColor} />
      </mesh>
      
      {/* Bottom panel */}
      <mesh 
        position={[0, thickness/2, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width - thickness*2, thickness, depth]} />
        <meshStandardMaterial color={materialColor} />
      </mesh>
      
      {/* Back panel */}
      <mesh 
        position={[0, height/2, -depth/2 + thickness/2]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[width - thickness*2, height - thickness*2, thickness]} />
        <meshStandardMaterial color={materialColor} roughness={0.9} />
      </mesh>
      
      {/* Add doors based on cabinet type and style */}
      {cabinetType !== 'open' && (
        <Doors 
          width={width} 
          height={height} 
          depth={depth} 
          thickness={thickness}
          doorStyle={doorStyle}
          materialColor={materialColor}
          exploded={exploded}
        />
      )}
      
      {/* Add drawers if specified */}
      {hasDrawers && (
        <Drawers 
          width={width} 
          height={height} 
          depth={depth} 
          thickness={thickness}
          materialColor={materialColor}
          exploded={exploded}
        />
      )}
      
      {/* Add shelves for certain cabinet types */}
      {(cabinetType === 'base' || cabinetType === 'tall' || cabinetType === 'wall') && (
        <Shelves 
          width={width} 
          height={height} 
          depth={depth} 
          thickness={thickness}
          materialColor={materialColor}
          cabinetType={cabinetType}
          exploded={exploded}
        />
      )}
    </group>
  );
};

interface DoorsProps {
  width: number;
  height: number;
  depth: number;
  thickness: number;
  doorStyle: string;
  materialColor: string;
  exploded: boolean;
}

const Doors = ({
  width,
  height,
  depth,
  thickness,
  doorStyle,
  materialColor,
  exploded
}: DoorsProps) => {
  // Door offset for exploded view
  const doorOffset = exploded ? 0.2 : 0;
  
  // Slightly darker color for doors
  const doorColor = materialColor === '#F5F5F5' 
    ? materialColor 
    : adjustColor(materialColor, -20);
  
  // For double doors
  const doorWidth = width / 2 - thickness - 0.005; // 5mm gap
  
  return (
    <>
      {/* Left door */}
      <mesh 
        position={[-width/4, height/2, depth/2 + thickness/2 + doorOffset]} 
        castShadow
      >
        <boxGeometry args={[doorWidth, height - 0.01, thickness]} />
        <meshStandardMaterial color={doorColor} />
        
        {/* Add door details based on style */}
        {doorStyle === 'shaker' && (
          <ShakePanel 
            width={doorWidth} 
            height={height - 0.01} 
            thickness={thickness} 
            color={doorColor}
          />
        )}
        
        {doorStyle === 'raised' && (
          <RaisedPanel 
            width={doorWidth} 
            height={height - 0.01} 
            thickness={thickness} 
            color={doorColor}
          />
        )}
      </mesh>
      
      {/* Right door */}
      <mesh 
        position={[width/4, height/2, depth/2 + thickness/2 + doorOffset]} 
        castShadow
      >
        <boxGeometry args={[doorWidth, height - 0.01, thickness]} />
        <meshStandardMaterial color={doorColor} />
        
        {/* Add door details based on style */}
        {doorStyle === 'shaker' && (
          <ShakePanel 
            width={doorWidth} 
            height={height - 0.01} 
            thickness={thickness} 
            color={doorColor}
          />
        )}
        
        {doorStyle === 'raised' && (
          <RaisedPanel 
            width={doorWidth} 
            height={height - 0.01} 
            thickness={thickness} 
            color={doorColor}
          />
        )}
      </mesh>
      
      {/* Door handles */}
      <group position={[-width/4 + doorWidth/2 - 0.02, height/2, depth/2 + thickness + 0.01 + doorOffset]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      <group position={[width/4 - doorWidth/2 + 0.02, height/2, depth/2 + thickness + 0.01 + doorOffset]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </>
  );
};

interface DrawersProps {
  width: number;
  height: number;
  depth: number;
  thickness: number;
  materialColor: string;
  exploded: boolean;
}

const Drawers = ({
  width,
  height,
  depth,
  thickness,
  materialColor,
  exploded
}: DrawersProps) => {
  // Number of drawers
  const drawerCount = 3;
  
  // Drawer dimensions
  const drawerHeight = (height - thickness * (drawerCount + 1)) / drawerCount;
  const drawerWidth = width - thickness * 2 - 0.01; // 10mm gap
  
  // Drawer offset for exploded view
  const drawerOffset = exploded ? 0.15 : 0;
  
  // Slightly different color for drawer fronts
  const drawerColor = adjustColor(materialColor, 10);
  
  return (
    <>
      {Array.from({ length: drawerCount }).map((_, index) => {
        const yPosition = thickness + drawerHeight / 2 + index * (drawerHeight + thickness);
        const zOffset = drawerOffset * (index + 1);
        
        return (
          <group key={index}>
            {/* Drawer front */}
            <mesh 
              position={[0, yPosition, depth/2 + thickness/2 + zOffset]} 
              castShadow
            >
              <boxGeometry args={[drawerWidth, drawerHeight - 0.01, thickness]} />
              <meshStandardMaterial color={drawerColor} />
            </mesh>
            
            {/* Drawer handle */}
            <mesh 
              position={[0, yPosition, depth/2 + thickness + 0.01 + zOffset]} 
              castShadow
            >
              <boxGeometry args={[0.1, 0.01, 0.02]} />
              <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Drawer box (only visible in exploded view) */}
            {exploded && (
              <>
                {/* Drawer bottom */}
                <mesh 
                  position={[0, yPosition - drawerHeight/2 + thickness/2, 0 + zOffset/2]} 
                  castShadow
                >
                  <boxGeometry args={[drawerWidth - 0.02, thickness, depth - thickness - 0.05]} />
                  <meshStandardMaterial color={materialColor} />
                </mesh>
                
                {/* Drawer sides */}
                <mesh 
                  position={[-drawerWidth/2 + thickness/2, yPosition, 0 + zOffset/2]} 
                  castShadow
                >
                  <boxGeometry args={[thickness, drawerHeight - 0.02, depth - thickness - 0.05]} />
                  <meshStandardMaterial color={materialColor} />
                </mesh>
                
                <mesh 
                  position={[drawerWidth/2 - thickness/2, yPosition, 0 + zOffset/2]} 
                  castShadow
                >
                  <boxGeometry args={[thickness, drawerHeight - 0.02, depth - thickness - 0.05]} />
                  <meshStandardMaterial color={materialColor} />
                </mesh>
                
                {/* Drawer back */}
                <mesh 
                  position={[0, yPosition, -depth/2 + thickness + zOffset/2]} 
                  castShadow
                >
                  <boxGeometry args={[drawerWidth - 0.02, drawerHeight - 0.02, thickness]} />
                  <meshStandardMaterial color={materialColor} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </>
  );
};

interface ShelvesProps {
  width: number;
  height: number;
  depth: number;
  thickness: number;
  materialColor: string;
  cabinetType: string;
  exploded: boolean;
}

const Shelves = ({
  width,
  height,
  depth,
  thickness,
  materialColor,
  cabinetType,
  exploded
}: ShelvesProps) => {
  // Number of shelves based on cabinet type
  const shelfCount = cabinetType === 'tall' ? 4 : 2;
  
  // Shelf dimensions
  const shelfWidth = width - thickness * 2 - 0.01; // 10mm gap
  
  // Shelf offset for exploded view
  const shelfOffset = exploded ? 0.1 : 0;
  
  return (
    <>
      {Array.from({ length: shelfCount }).map((_, index) => {
        // Distribute shelves evenly
        const yPosition = thickness * 2 + (height - thickness * 3) * (index + 1) / (shelfCount + 1);
        const explodeY = exploded ? shelfOffset * (index + 1) : 0;
        
        return (
          <mesh 
            key={index}
            position={[0, yPosition + explodeY, 0]} 
            castShadow 
            receiveShadow
          >
            <boxGeometry args={[shelfWidth, thickness, depth - thickness - 0.02]} />
            <meshStandardMaterial color={materialColor} />
          </mesh>
        );
      })}
    </>
  );
};

// Helper components for door styles
interface PanelProps {
  width: number;
  height: number;
  thickness: number;
  color: string;
}

const ShakePanel = ({ width, height, thickness, color }: PanelProps) => {
  const frameWidth = 0.05; // 50mm frame
  const panelColor = adjustColor(color, -10);
  
  return (
    <group position={[0, 0, thickness/2 + 0.001]}>
      <mesh castShadow>
        <boxGeometry args={[width - frameWidth*2, height - frameWidth*2, 0.005]} />
        <meshStandardMaterial color={panelColor} />
      </mesh>
    </group>
  );
};

const RaisedPanel = ({ width, height, thickness, color }: PanelProps) => {
  const frameWidth = 0.06; // 60mm frame
  const panelColor = adjustColor(color, -15);
  
  return (
    <group position={[0, 0, thickness/2 + 0.005]}>
      <mesh castShadow>
        <boxGeometry args={[width - frameWidth*2, height - frameWidth*2, 0.01]} />
        <meshStandardMaterial color={panelColor} />
      </mesh>
    </group>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Convert hex to RGB
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);
  
  // Adjust brightness
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default CabinetViewer;
