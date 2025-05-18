// Utility to start all timers in a category
export const startAllInCategory = (timers, category) => {
  return timers.map(timer =>
    timer.category === category && timer.status !== 'Completed'
      ? { ...timer, status: 'Running' }
      : timer
  );
};

// Utility to pause all timers in a category
export const pauseAllInCategory = (timers, category) => {
  return timers.map(timer =>
    timer.category === category && timer.status === 'Running'
      ? { ...timer, status: 'Paused' }
      : timer
  );
};

// Utility to reset all timers in a category
export const resetAllInCategory = (timers, category) => {
  return timers.map(timer =>
    timer.category === category
      ? { ...timer, status: 'Paused', remaining: timer.duration }
      : timer
  );
};
