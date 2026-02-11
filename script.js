
document.addEventListener('DOMContentLoaded', function () {
  
  function normalizePath(p) {
    if (!p) return '/';
    try {
      const url = new URL(p, location.origin);
      let pathname = url.pathname;
      if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
      return pathname;
    } catch (e) {
 
      let pathname = p || '/';
      if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
      return pathname;
    }
  }

  const currentPath = (function () {
    let p = location.pathname || '/';
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p;
  })();

  const links = document.querySelectorAll('.main-content nav ul a');
  if (!links || links.length === 0) return;


  let matched = null;
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    const hrefPath = normalizePath(href);
    if (hrefPath === currentPath) matched = a;
  });

  if (!matched) {
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefPath = normalizePath(href);
      if (hrefPath !== '/' && currentPath.indexOf(hrefPath) !== -1 && !matched) {
        matched = a;
      }
    });
  }

  if (!matched && (currentPath === '/' || currentPath === '/index.html')) {
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === 'baitapbaotuonggido.html' || href === 'index.html' || href === '/') {
        matched = a;
      }
    });
  }

  if (matched) matched.classList.add('active');
});
