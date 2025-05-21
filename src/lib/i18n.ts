import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
const resources = {
  en: {
    translation: {
      // App general
      appTitle: 'Cabinet Designer Pro',
      switchLanguage: 'Switch language',
      openSidebar: 'Open sidebar',
      closeSidebar: 'Close sidebar',
      
      // Cabinet types
      cabinetType: 'Cabinet Type',
      cabinetBase: 'Base Cabinet',
      cabinetWall: 'Wall Cabinet',
      cabinetTall: 'Tall Cabinet',
      cabinetCorner: 'Corner Cabinet',
      
      // Dimensions
      dimensions: 'Dimensions',
      width: 'Width',
      height: 'Height',
      depth: 'Depth',
      
      // Materials
      materials: 'Materials',
      primaryMaterial: 'Primary Material',
      wood: 'Natural Wood',
      mdf: 'MDF',
      melamine: 'Melamine',
      plywood: 'Plywood',
      thickness: 'Thickness',
      edgeBanding: 'Edge Banding',
      matchingEdge: 'Matching Edge',
      contrastEdge: 'Contrast Edge',
      noEdgeBanding: 'No Edge Banding',
      
      // Doors
      doors: 'Doors',
      doorStyle: 'Door Style',
      flatDoor: 'Flat Door',
      shakerDoor: 'Shaker Style',
      raisedPanel: 'Raised Panel',
      glassDoor: 'Glass Door',
      hingeType: 'Hinge Type',
      concealedHinge: 'Concealed Hinge',
      softCloseHinge: 'Soft Close Hinge',
      overlayHinge: 'Overlay Hinge',
      includeHandles: 'Include Handles',
      
      // Drawers
      drawers: 'Drawers',
      drawerCount: 'Number of Drawers',
      drawerSlideType: 'Drawer Slide Type',
      standardSlide: 'Standard Slide',
      fullExtension: 'Full Extension',
      softCloseSlide: 'Soft Close Slide',
      pushOpen: 'Push-to-Open',
      drawerBoxType: 'Drawer Box Type',
      standardBox: 'Standard Box',
      dovetailBox: 'Dovetail Joinery',
      metalBox: 'Metal Box System',
      
      // CNC Options
      cncOptions: 'CNC Options',
      hingeMortising: 'Hinge Mortising',
      drawerSlideGrooves: 'Drawer Slide Grooves',
      shelfPinHoles: 'Shelf Pin Holes',
      joinery: 'Advanced Joinery',
      bitDiameter: 'Bit Diameter',
      
      // Actions
      generateCabinet: 'Generate Cabinet',
      resetSettings: 'Reset Settings',
      export: 'Export',
      exportPdf: 'Export as PDF',
      exportExcel: 'Export as Excel',
      exportDxf: 'Export as DXF',
      exportGcode: 'Export G-code',
      
      // Views
      view3d: '3D View',
      viewFront: 'Front View',
      viewSide: 'Side View',
      viewTop: 'Top View',
      viewExploded: 'Exploded View',
      viewCutting: 'Cutting List',
      
      // Parts
      sidePanel: 'Side Panel',
      topPanel: 'Top Panel',
      bottomPanel: 'Bottom Panel',
      backPanel: 'Back Panel',
      shelf: 'Shelf',
      door: 'Door',
      drawer: 'Drawer',
      drawerFront: 'Drawer Front',
      
      // Notifications
      cabinetGenerated: 'Cabinet generated successfully!',
      exportComplete: 'Export completed successfully!',
      confirmReset: 'Are you sure you want to reset all settings?',
      yes: 'Yes',
      no: 'No'
    }
  },
  ar: {
    translation: {
      // App general
      appTitle: 'مصمم الخزانات برو',
      switchLanguage: 'تغيير اللغة',
      openSidebar: 'فتح الشريط الجانبي',
      closeSidebar: 'إغلاق الشريط الجانبي',
      
      // Cabinet types
      cabinetType: 'نوع الخزانة',
      cabinetBase: 'خزانة أرضية',
      cabinetWall: 'خزانة حائط',
      cabinetTall: 'خزانة طويلة',
      cabinetCorner: 'خزانة ركنية',
      
      // Dimensions
      dimensions: 'الأبعاد',
      width: 'العرض',
      height: 'الارتفاع',
      depth: 'العمق',
      
      // Materials
      materials: 'المواد',
      primaryMaterial: 'المادة الأساسية',
      wood: 'خشب طبيعي',
      mdf: 'MDF',
      melamine: 'ميلامين',
      plywood: 'خشب رقائقي',
      thickness: 'السماكة',
      edgeBanding: 'شريط الحواف',
      matchingEdge: 'حواف متطابقة',
      contrastEdge: 'حواف متباينة',
      noEdgeBanding: 'بدون شريط حواف',
      
      // Doors
      doors: 'الأبواب',
      doorStyle: 'نمط الباب',
      flatDoor: 'باب مسطح',
      shakerDoor: 'نمط شيكر',
      raisedPanel: 'لوح بارز',
      glassDoor: 'باب زجاجي',
      hingeType: 'نوع المفصلة',
      concealedHinge: 'مفصلة مخفية',
      softCloseHinge: 'مفصلة إغلاق ناعم',
      overlayHinge: 'مفصلة تراكب',
      includeHandles: 'إضافة مقابض',
      
      // Drawers
      drawers: 'الأدراج',
      drawerCount: 'عدد الأدراج',
      drawerSlideType: 'نوع مجرى الدرج',
      standardSlide: 'مجرى قياسي',
      fullExtension: 'تمديد كامل',
      softCloseSlide: 'إغلاق ناعم',
      pushOpen: 'فتح بالضغط',
      drawerBoxType: 'نوع صندوق الدرج',
      standardBox: 'صندوق قياسي',
      dovetailBox: 'وصلات ذيل الحمامة',
      metalBox: 'نظام صندوق معدني',
      
      // CNC Options
      cncOptions: 'خيارات CNC',
      hingeMortising: 'تفتيح المفصلات',
      drawerSlideGrooves: 'أخاديد مجاري الأدراج',
      shelfPinHoles: 'ثقوب دبابيس الرفوف',
      joinery: 'وصلات متقدمة',
      bitDiameter: 'قطر القاطعة',
      
      // Actions
      generateCabinet: 'توليد الخزانة',
      resetSettings: 'إعادة تعيين',
      export: 'تصدير',
      exportPdf: 'تصدير كـ PDF',
      exportExcel: 'تصدير كـ Excel',
      exportDxf: 'تصدير كـ DXF',
      exportGcode: 'تصدير G-code',
      
      // Views
      view3d: 'عرض ثلاثي الأبعاد',
      viewFront: 'واجهة أمامية',
      viewSide: 'واجهة جانبية',
      viewTop: 'واجهة علوية',
      viewExploded: 'عرض مفكك',
      viewCutting: 'قائمة القطع',
      
      // Parts
      sidePanel: 'لوح جانبي',
      topPanel: 'لوح علوي',
      bottomPanel: 'لوح سفلي',
      backPanel: 'لوح خلفي',
      shelf: 'رف',
      door: 'باب',
      drawer: 'درج',
      drawerFront: 'واجهة الدرج',
      
      // Notifications
      cabinetGenerated: 'تم توليد الخزانة بنجاح!',
      exportComplete: 'تم التصدير بنجاح!',
      confirmReset: 'هل أنت متأكد من إعادة تعيين جميع الإعدادات؟',
      yes: 'نعم',
      no: 'لا'
    }
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
