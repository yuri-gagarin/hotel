import { useEffect, useRef } from "react";

// @flow 
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

export function usePrevious<S>(value: S) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}