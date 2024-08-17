export const initialData = {
  categories: [
    {
      id: 1,
      name: "Executive Dashboard",
      widgets: [
        { id: 1, name: "Revenue Growth", text: "Charts showing revenue growth over the last quarter. " },
        { id: 2, name: "User Activity", text: "Displays user activity trends and patterns." },
        { id: 3, name: "Top Performers", text: "Lists the top-performing departments and individuals." },
        { id: 4, name: "Overall Growth", text: "Lists the top-performing departments and individuals." },
      ],
      selectedWidgets: [1, 2,3],
    },
    {
      id: 2,
      name: "Security Overview",
      widgets: [
        { id: 1, name: "Threat Detection", text: "Overview of detected threats and their severity." },
        { id: 2, name: "Incident Reports", text: "Summarizes recent security incidents and responses." },
        { id: 3, name: "Vulnerability Scans", text: "Displays results from recent vulnerability scans." },
        { id: 4, name: "Compliance Status", text: "Tracks compliance with security standards and regulations." },
        { id: 5, name: "Access Controls", text: "Shows current access control settings and changes." },
        { id: 6, name: "Security Alerts", text: "Alerts for any critical security issues requiring immediate attention." },
        { id: 7, name: "System Health", text: "Monitors overall system health and performance." },
      ],
      selectedWidgets: [1, 2, 3, 4],
    },
    {
      id: 3,
      name: "Performance Metrics",
      widgets: [
        { id: 1, name: "System Uptime", text: "Displays system uptime statistics and trends." },
        { id: 2, name: "Response Times", text: "Tracks average response times and performance metrics." },
        { id: 3, name: "Error Rates", text: "Monitors error rates and their impact on performance." },
      ],
      selectedWidgets: [1],
    },
    {
      id: 4,
      name: "User Engagement",
      widgets: [
        { id: 1, name: "Active Users", text: "Shows the number of active users over time." },
        { id: 2, name: "User Feedback", text: "Aggregates user feedback and satisfaction ratings." },
        { id: 3, name: "Engagement Trends", text: "Tracks engagement trends and user behavior patterns." },
      ],
      selectedWidgets: [1],
    },
  ],
};
