export default [
  {
    name: "Dashboard",
    icon: "",
    url: "/admin/dashboard",
  },

  {
    name: "Application Statuses",
    children: [
      {
        name: "Ready to be import",
        url: "/admin/application/upload",
      },

      {
        name: "Under Process",
        children: [
          {
            name: "Awaiting Commodity Purchase",
            url: "/admin/application/list",
          },
          {
            name: "Digital: Awaiting Customer acceptance on the Agreement",
            url: "/admin/application/sent",
          },
          {
            name: "Physical - Awaiting Customer acceptance on the Agreement",
            url: "/admin/application/sent",
          },

          {
            name: "Awaiting Agent Appointment and Response.",
            url: "/admin/application/sent",
          },
          {
            name: "Awaiting funding and Welcome letter issuance",
            url: "/admin/application/commodity",
          },
        ],
      },
      {
        name: "Completed - Welcome Letter issued",
        url: "/admin/application/completed",
      },
      {
        name: "Rejected - Pending Channel correction",
        url: "/admin/application/rejected",
      },
    ],
  },
  {
    name: "Report",
    children:[
      {
        name: "Disbursal Report",
        url: "/admin/reports/disbursal"
      },
      {
        name: "Pending / Error",
        url: "/admin/reports/error"
      },
    ]
  }
];
