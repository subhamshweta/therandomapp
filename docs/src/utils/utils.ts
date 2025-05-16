/**
 * Parse comma-separated input into array
 */
export function parseInputData(input: string): string[] {
  if (!input || input.trim() === "") return [];
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

/**
 * Create ripple effect on button click
 */
export function createRippleEffect(
  event: React.MouseEvent<HTMLButtonElement>,
  button: HTMLButtonElement
) {
  const rect = button.getBoundingClientRect();
  
  const ripple = document.createElement("span");
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s linear";
  ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  
  // Position the ripple
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  button.appendChild(ripple);
  
  // Add keyframe styles if they don't exist
  if (!document.querySelector("#ripple-style")) {
    const style = document.createElement("style");
    style.id = "ripple-style";
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Remove the ripple after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Add shimmer animation styles to the document
 */
export function ensureShimmerStyles() {
  if (!document.querySelector("#shimmer-style")) {
    const style = document.createElement("style");
    style.id = "shimmer-style";
    style.textContent = `
      .shimmer {
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
        background-size: 1000px 100%;
      }
      
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
      }
    `;
    document.head.appendChild(style);
  }
}
