import React, { useMemo } from "react";

/**
 * Replaces the standard login link with a personalized welcome message
 * featuring a rounded avatar with user initials.
 */
export default function HeaderProfile({ name = "Guest", onClick }) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <div
      className="user-profile"
      role="button"
      aria-label={`Welcome, ${name}`}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="user-avatar">
        <span className="user-initials">{initials}</span>
      </div>
      <span className="welcome-text">Welcome, {name}</span>
    </div>
  );
}
