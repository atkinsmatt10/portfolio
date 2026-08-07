import type { LifelineMarker } from "@/components/lifeline"

export const mattTimeline: LifelineMarker[] = [
  {
    id: "born-near-boston",
    year: 1993,
    events: ["Born outside of Boston."],
  },
  {
    id: "weston-high-school",
    year: 2012,
    events: [
      "Graduated from Weston High School.",
      "Got my first job at Gentle Giant Moving Company.",
    ],
  },
  {
    id: "year-2013",
    year: 2013,
    events: [],
  },
  {
    id: "year-2014",
    year: 2014,
    events: [],
  },
  {
    id: "year-2015",
    year: 2015,
    events: [],
  },
  {
    id: "penn-state-and-icf",
    year: 2016,
    companies: [{ id: "penn-state", name: "Penn State University" }],
    events: [
      "Graduated from Penn State University.",
      "Moved to Philadelphia.",
      [
        { type: "text", value: "Started my career as a data analyst at " },
        {
          type: "link",
          value: "ICF International",
          href: "https://www.icf.com/",
        },
        { type: "text", value: "." },
      ],
    ],
  },
  {
    id: "year-2017",
    year: 2017,
    events: [],
  },
  {
    id: "xfinity-communities",
    year: 2018,
    companies: [{ id: "comcast", name: "Comcast" }],
    events: [
      [
        {
          type: "text",
          value: "Joined Comcast and launched the ",
        },
        {
          type: "link",
          value: "Xfinity Communities app",
          href: "https://corporate.comcast.com/stories/local/illinois/xfinity-communities-launches-its-first-commercial-smart-communities-platform-at-two-kass-management-services-properties-in-chicago",
        },
        {
          type: "text",
          value: " for apartment residents.",
        },
      ],
    ],
  },
  {
    id: "year-2019",
    year: 2019,
    events: [],
  },
  {
    id: "year-2020",
    year: 2020,
    events: [],
  },
  {
    id: "join-smartrent",
    year: 2021,
    companies: [{ id: "smartrent", name: "SmartRent" }],
    events: [
      [
        { type: "text", value: "Joined " },
        {
          type: "link",
          value: "SmartRent",
          href: "https://smartrent.com/",
        },
        {
          type: "text",
          value: " to lead hardware, software, and access products.",
        },
      ],
      [
        { type: "text", value: "Launched " },
        {
          type: "link",
          value: "Alloy Video Intercom",
          href: "https://smartrent.com/hardware/intercoms/",
        },
        {
          type: "text",
          value: " for secure, modern visitor entry.",
        },
      ],
    ],
  },
  {
    id: "year-2022",
    year: 2022,
    events: [],
  },
  {
    id: "alloy-access",
    year: 2023,
    events: [
      [
        { type: "text", value: "Helped launch the " },
        {
          type: "link",
          value: "AAC-2001 access controller",
          href: "https://smartrent.com/news/gate-access-control/",
        },
        {
          type: "text",
          value: ", a more capable, cost-effective access platform.",
        },
      ],
      [
        { type: "text", value: "Built the " },
        {
          type: "link",
          value: "Mercury extension for Raycast",
          href: "https://www.raycast.com/atkinsmatt101/mercury",
        },
        {
          type: "text",
          value: ". More than 250 installs.",
        },
      ],
    ],
  },
  {
    id: "got-married",
    year: 2024,
    events: [
      [
        {
          type: "link",
          value: "Got married",
          href: "https://www.nicolematt.com/",
        },
        { type: "text", value: "." },
      ],
      [
        { type: "text", value: "Launched " },
        {
          type: "link",
          value: "Alloy Deadbolt+ with Apple Wallet",
          href: "https://investors.smartrent.com/news/news-details/2024/SmartRent-launches-Alloy-Deadbolt-with-Apple-Wallet-integration-enhancing-access-efficiency-and-management/default.aspx",
        },
        {
          type: "text",
          value: " for tap-to-unlock access on iPhone and Apple Watch.",
        },
      ],
    ],
  },
  {
    id: "team-nate-the-great",
    year: 2025,
    companies: [{ id: "team-nate", name: "Team Nate the Great" }],
    events: [
      "My son Nate was born.",
      [
        { type: "text", value: "Started " },
        {
          type: "link",
          value: "Team Nate the Great",
          href: "https://www.gonatego.com/",
        },
        {
          type: "text",
          value: " to fund pediatric brain tumor research.",
        },
      ],
    ],
    photos: [
      {
        src: "/timeline/team-nate-shirt.png",
        alt: "A Team Nate the Great fundraising shirt",
        x: 0,
        y: 260,
        rotate: -2,
        width: 190,
      },
    ],
  },
  {
    id: "now",
    year: 2026,
    events: [
      "Nate is officially brain tumor free.",
      [
        { type: "text", value: "Launched " },
        {
          type: "link",
          value: "Virtual Intercom",
          href: "https://investors.smartrent.com/news/news-details/2026/SmartRent-Launches-Hardware-Free-Virtual-Intercom/default.aspx",
        },
        {
          type: "text",
          value: ", a hardware-free, QR-based visitor entry system.",
        },
      ],
      [
        { type: "text", value: "Launched " },
        {
          type: "link",
          value: "Climate Protection Mode",
          href: "https://investors.smartrent.com/news/news-details/2026/SmartRent-Launches-Industry-First-Automated-Smart-Thermostat-Climate-Protection-Function/default.aspx",
        },
        {
          type: "text",
          value: " to protect properties during temperature and humidity extremes.",
        },
      ],
    ],
    photos: [
      {
        src: "/timeline/virtual-intercom.jpg",
        alt: "SmartRent Virtual Intercom QR code guest entry sign",
        x: 0.03,
        y: 240,
        rotate: -3,
        width: 170,
      },
    ],
  },
]
