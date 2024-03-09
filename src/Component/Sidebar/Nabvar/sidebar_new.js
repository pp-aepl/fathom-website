export default [
    {
      name: "Dashboard",
      icon: '',
      url: "#item1"
    },
    
    {
      name: "Application Statuses",
      children: [
        {
          name: "Ready to be import",
          url: "#child41"
        },
       
        {
          name: "Under Process",
          children: [
            {
              name: "Awaiting Commodity Purchase",
              url: "#child431"
            },
            {
              name: "Digital: Awaiting Customer acceptance on the Agreement",
              url: "#child432,"
            },
            {
              name: "Physical - Awaiting Customer acceptance on the Agreement",
              url: "#child433"
            },

            {
                name: "Awaiting Agent Appointment and Response.",
                url: "#child433"
              },

              {
                name: "Awaiting funding and Welcome letter issuance",
                url: "#child433"
              }
          ]
        },
        {
            name: "Completed - Welcome Letter issued",
            url: "#child42"
          },
          {
            name: "Rejected - Pending Channel correction",
            url: "#child42"
          },
      ]
    },
    {
        name: "Report",
        children:[
          {
            name: "Disbursal Report",
            url: "#child431"
          },
          {
            name: "Pending / Error",
            url: "#child431"
          },
        ]
      }
  ];
  