import React, { useState, useEffect, useCallback } from 'react';

/**
 * Provides accessible More/Less functionality for long inline metadata values.
 */
export default function ExpandableField({ targetId, targetEl }) {

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!targetEl) return;
    targetEl.setAttribute('data-expanded', expanded ? 'true' : 'false');
  }, [expanded, targetEl]);

  const handleToggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  return (
    <button
      className="expander-btn"
      aria-controls={targetId}
      aria-expanded={expanded}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {expanded ? 'Less' : 'More'}
    </button>
  );
}
