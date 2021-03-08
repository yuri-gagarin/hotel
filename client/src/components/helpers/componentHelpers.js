export const navbarCollapseListener = () => {
  // Navbar collapse implementation // 
  const mainNav = $("#mainNav");
  if (mainNav) {
    mainNav.css("backgroundColor", "#2c3531");
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
  
}