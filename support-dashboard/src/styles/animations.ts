/**
 * Animation styles and keyframes
 * סגנונות אנימציה ו-keyframes
 */

/**
 * CSS keyframes for animations
 * CSS keyframes לאנימציות
 */
export const animationKeyframes = `
  @keyframes modalFadeIn {
    from { 
      opacity: 0; 
      transform: scale(0.95); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  @keyframes overlayFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes marqueeScroll {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
`;

/**
 * Animation style objects for use in React components
 * אובייקטי סגנון אנימציה לשימוש בקומפוננטות React
 */
export const animationStyles = {
  modalFadeIn: "modalFadeIn 0.3s ease-out forwards",
  overlayFadeIn: "overlayFadeIn 0.3s ease-out forwards",
  spin: "spin 1s linear infinite",
  fadeIn: "fadeIn 0.5s ease-out forwards",
  marqueeScroll: "marqueeScroll 40s linear infinite",
} as const;

/**
 * Component to inject animation styles into the document
 * קומפוננטה להזרקת סגנונות אנימציה למסמך
 */
export const AnimationStyles: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: animationKeyframes }} />
);

