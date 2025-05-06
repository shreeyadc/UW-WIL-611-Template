function setupAccordionToggle(buttonId, collapseClass) {
    const toggleBtn = document.getElementById(buttonId);
    if (!toggleBtn) return;
  
    toggleBtn.addEventListener('click', () => {
      const panels = document.querySelectorAll('.' + collapseClass);
      const allOpen = Array.from(panels).every(p => p.classList.contains('show'));
  
      panels.forEach(panel => {
        const collapse = bootstrap.Collapse.getInstance(panel) || new bootstrap.Collapse(panel, { toggle: false });
        if (allOpen) {
          collapse.hide(); // Close all if all are currently open
        } else {
          collapse.show(); // Else open all
        }
      });
    });
  }
  
  // Call this for each accordion
  setupAccordionToggle('toggleAll1', 'multi-collapseB');
  setupAccordionToggle('toggleAll2', 'multi-collapseB2');