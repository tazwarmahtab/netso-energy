/**
 * Utility to split text into characters or words for animation.
 * Replaces the need for external libraries like SplitType in simple cases.
 */
export function splitWords(element: HTMLElement | null): HTMLElement[] {
  if (!element) return [];

  const text = element.innerText;
  const words = text.split(" ");
  element.innerHTML = "";

  return words.map((word, i) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    span.style.paddingBottom = "0.05em"; // Prevent clipping
    
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.innerText = word + (i < words.length - 1 ? "\u00A0" : "");
    
    span.appendChild(inner);
    element.appendChild(span);
    
    return inner;
  });
}

export function splitCharacters(element: HTMLElement | null): HTMLElement[] {
  if (!element) return [];

  const text = element.innerText;
  element.innerHTML = "";

  return Array.from(text).map((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.innerText = char === " " ? "\u00A0" : char;
    
    span.appendChild(inner);
    element.appendChild(span);
    
    return inner;
  });
}
