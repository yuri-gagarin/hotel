// @flow 
import { useEffect, useRef } from "react";
import $ from "jquery";

export const navbarCollapseListener = () => {
  // Navbar collapse implementation // 
  const mainNav = $("#mainNav");
  if (mainNav) {
    (function (){
      // Collapse Navbar
      var navbarCollapse = function() {
        if (mainNav && mainNav.offset()) {
          if (mainNav.offset().top > 100) {
            mainNav.addClass("navbar-shrink");
          } else {
            mainNav.removeClass("navbar-shrink");
          }
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);
    })();

  }
};

export function usePrevious<S>(value: S): any {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}
export const splitStringByUppercase = (stringToSplit: string): string => {
  if (!stringToSplit || typeof stringToSplit !== "string") {
    return "No string to split";
  }
  const matchResults = stringToSplit.match(/([A-Z]?[^A-Z]*)/g);
  if (matchResults && Array.isArray(matchResults)) {
    return matchResults.slice(0, -1).join(" ");
  } else {
    return stringToSplit;
  }
}