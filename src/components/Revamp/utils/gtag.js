export const GA_MEASUREMENT_ID = 'G-FVM5WF3HZ3'; // Replace with your GA4 ID

// Log page views
export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Log custom events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
