import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Executive],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'Leads',
        to: `${adminRoot}/dashboards/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-pie-chart',
        label: 'Registration',
        to: `${adminRoot}/dashboards/analytics`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-basket-loaded',
        label: 'Resolution',
        to: `${adminRoot}/dashboards/ecommerce`,
        // roles: [UserRole.Executive],
      },
      {
        icon: 'simple-icon-doc',
        label: 'Legal',
        to: `${adminRoot}/dashboards/content`,
        // roles: [UserRole.Executive],
      },
      {
        icon: 'simple-icon-user',
        label: 'Ombudsman',
        to: `${adminRoot}/dashboards/ecommerce`,
        // roles: [UserRole.Executive],
      },
      {
        icon: 'simple-icon-envelope',
        label: 'Mailing',
        to: `${adminRoot}/dashboards/content`,
        // roles: [UserRole.Executive],
      },
    ],
  },
  {
    id: 'complaints',
    icon: 'iconsminds-digital-drawing',
    label: 'Complaints',
    to: `${adminRoot}/pages`,
    subs: [
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'All Complaints',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Pending Complaints',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Accept',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Accepted with Pendency',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Incomplete Information',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Expert Mail Drafted',
        to: `${adminRoot}/pages/product/data-list`
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Company Escalation Done',
        to: `${adminRoot}/pages/product/data-list`
      },

      {
        id: 'pages-authorization',
        label: 'Mailing Buckets',
        to: '/user',
        subs: [
          {
            label: 'COMPLAINT FORM FILLED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'DRAFT MAIL GENERATED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'EXPERT APPROVED DRAFT MAIL',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'Company',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'IGMS',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'Company/IGMS',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'ESCALATION PENDING',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'ESCALATION MAIL GENERATED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'ESCALATION APPROVED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'COMPANY ESCALATED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'IGMS ESCALATED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'COMPANY/IGMS ESCALATED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'NO RESPONSE RECEIVED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'REMINDER MAIL SENT',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'COMPANY REQUIREMENT RECEIVED',
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            label: 'COMPANY REQUIREMENT SENT',
            to: `${adminRoot}/pages/product/data-list`
          },
        ],
      },
      
      {
        id: 'ombudsman-buckets',
        label: 'Ombudsman Section',
        to: `${adminRoot}/pages/product`,
        subs: [
          {
            icon: 'simple-icon-credit-card',
            label: "Ombudsman Pending",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Complaint Form Sent",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Without Legal",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Requirement Pending",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Requirement Pushed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Requirement Sent",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Form 6a Received",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Form 6a Pushed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Form 6a Sent",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Hearing Date Received",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Hearing Postponed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Hearing Done",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Award Accepted",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Award Rejected",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Ombudsman With Legal Pending",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Ombudsman With Legal Sent",
            to: `${adminRoot}/pages/product/data-list`
          },
        ],
      },

      {
        id: 'legal-buckets',
        label: 'Legal Buckets',
        to: `${adminRoot}/pages/product`,
        subs: [
          {
            icon: 'simple-icon-credit-card',
            label:"Legal",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Contract Pending",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Contract Signed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Query Raised",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Query Answered",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Draft For Approval",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Court Filing Points",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Court Filing Pending Bucket",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Case Filing Done",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Recovery From Customer",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Notice Received",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Notice Sent",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label:"Legal Recovery From Company",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Court Issued Summon",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Company Reply Awaited",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Rejoinder Need To Be Filed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Affidavit Need To Be Filed",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Complainant Evidence",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Defendant Evidence",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Settlement Proposal Submission Pending",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Settlement Proposal Submitted",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Agruments",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Final Arguments",
            to: `${adminRoot}/pages/product/data-list`
          },
          {
            icon: 'simple-icon-credit-card',
            label: "Order Awaited",
            to: `${adminRoot}/pages/product/data-list`
          }
        ]
      },

      {
        id: 'account-buckets',
        label: 'Account Buckets',
        to: `${adminRoot}/pages/profile`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'Resolved',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'Invoice Raised',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
          {
            icon: 'simple-icon-share',
            label: 'Settled',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'Invoice Processing',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
        ],
      },

      {
        id: 'rejected-buckets',
        label: 'Rejected Buckets',
        to: `${adminRoot}/pages/profile`,
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'Insa Rejected',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'Rejected',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
          {
            icon: 'simple-icon-share',
            label: 'Customer Withdraw',
            to: `${adminRoot}/pages/profile/social`,
          },
          {
            icon: 'simple-icon-link',
            label: 'Customer Rejected',
            to: `${adminRoot}/pages/profile/portfolio`,
          },
        ],
      },

      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'REIMBURSEMENT',
        to: `${adminRoot}/pages/product/data-list`
      },

      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'ASSERVICES',
        to: `${adminRoot}/pages/product/data-list`
      },

      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'UNRESOLVED',
        to: `${adminRoot}/pages/product/data-list`
      },
      
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'COMPANY PAYMENT PENDING',
        to: `${adminRoot}/pages/product/data-list`
      },


      // {
      //   id: 'pages-profile',
      //   label: 'menu.profile',
      //   to: `${adminRoot}/pages/profile`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-share',
      //       label: 'menu.social',
      //       to: `${adminRoot}/pages/profile/social`,
      //     },
      //     {
      //       icon: 'simple-icon-link',
      //       label: 'menu.portfolio',
      //       to: `${adminRoot}/pages/profile/portfolio`,
      //     },
      //   ],
      // },
      // {
      //   id: 'pages-blog',
      //   label: 'menu.blog',
      //   to: `${adminRoot}/pages/blog`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-share',
      //       label: 'menu.blog-list',
      //       to: `${adminRoot}/pages/blog/blog-list`,
      //     },
      //     {
      //       icon: 'simple-icon-link',
      //       label: 'menu.blog-detail',
      //       to: `${adminRoot}/pages/blog/blog-detail`,
      //     },
      //   ],
      // },
      // {
      //   id: 'pages-miscellaneous',
      //   label: 'menu.miscellaneous',
      //   to: `${adminRoot}/pages/miscellaneous`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-question',
      //       label: 'menu.faq',
      //       to: `${adminRoot}/pages/miscellaneous/faq`,
      //     },
      //     {
      //       icon: 'simple-icon-graduation',
      //       label: 'menu.knowledge-base',
      //       to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
      //     },

      //     {
      //       icon: 'simple-icon-diamond',
      //       label: 'menu.prices',
      //       to: `${adminRoot}/pages/miscellaneous/prices`,
      //     },
      //     {
      //       icon: 'simple-icon-magnifier',
      //       label: 'menu.search',
      //       to: `${adminRoot}/pages/miscellaneous/search`,
      //     },
      //     {
      //       icon: 'simple-icon-envelope-open',
      //       label: 'menu.mailing',
      //       to: `${adminRoot}/pages/miscellaneous/mailing`,
      //     },
      //     {
      //       icon: 'simple-icon-bag',
      //       label: 'menu.invoice',
      //       to: `${adminRoot}/pages/miscellaneous/invoice`,
      //     },

      //     {
      //       icon: 'simple-icon-exclamation',
      //       label: 'menu.error',
      //       to: '/error',
      //       newWindow: true,
      //     },
      //   ],
      // },
    ],
  },
  {
    id: 'applications',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.applications',
    to: `${adminRoot}/applications`,
    subs: [
      {
        icon: 'simple-icon-check',
        label: 'menu.todo',
        to: `${adminRoot}/applications/todo`,
      },
      {
        icon: 'simple-icon-calculator',
        label: 'menu.survey',
        to: `${adminRoot}/applications/survey`,
      },
      {
        icon: 'simple-icon-bubbles',
        label: 'menu.chat',
        to: `${adminRoot}/applications/chat`,
      },
    ],
  },
  {
    id: 'ui',
    icon: 'iconsminds-pantone',
    label: 'menu.ui',
    to: `${adminRoot}/ui`,
    subs: [
      {
        id: 'ui-forms',
        label: 'menu.forms',
        to: `${adminRoot}/ui/forms`,
        subs: [
          {
            icon: 'simple-icon-notebook',
            label: 'menu.layouts',
            to: `${adminRoot}/ui/forms/layouts`,
          },
          {
            icon: 'simple-icon-puzzle',
            label: 'menu.components',
            to: `${adminRoot}/ui/forms/components`,
          },
          {
            icon: 'simple-icon-check',
            label: 'menu.validations',
            to: `${adminRoot}/ui/forms/validations`,
          },
          {
            icon: 'simple-icon-magic-wand',
            label: 'menu.wizard',
            to: `${adminRoot}/ui/forms/wizard`,
          },
        ],
      },
      {
        id: 'ui-components',
        label: 'menu.components',
        to: `${adminRoot}/ui/components`,
        subs: [
          {
            icon: 'simple-icon-bell',
            label: 'menu.alerts',
            to: `${adminRoot}/ui/components/alerts`,
          },
          {
            icon: 'simple-icon-badge',
            label: 'menu.badges',
            to: `${adminRoot}/ui/components/badges`,
          },
          {
            icon: 'simple-icon-control-play',
            label: 'menu.buttons',
            to: `${adminRoot}/ui/components/buttons`,
          },
          {
            icon: 'simple-icon-layers',
            label: 'menu.cards',
            to: `${adminRoot}/ui/components/cards`,
          },
          {
            icon: 'simple-icon-picture',
            label: 'menu.carousel',
            to: `${adminRoot}/ui/components/carousel`,
          },
          {
            icon: 'simple-icon-chart',
            label: 'menu.charts',
            to: `${adminRoot}/ui/components/charts`,
          },
          {
            icon: 'simple-icon-arrow-up',
            label: 'menu.collapse',
            to: `${adminRoot}/ui/components/collapse`,
          },
          {
            icon: 'simple-icon-arrow-down',
            label: 'menu.dropdowns',
            to: `${adminRoot}/ui/components/dropdowns`,
          },
          {
            icon: 'simple-icon-book-open',
            label: 'menu.editors',
            to: `${adminRoot}/ui/components/editors`,
          },

          {
            icon: 'simple-icon-star',
            label: 'menu.icons',
            to: `${adminRoot}/ui/components/icons`,
          },
          {
            icon: 'simple-icon-note',
            label: 'menu.input-groups',
            to: `${adminRoot}/ui/components/input-groups`,
          },
          {
            icon: 'simple-icon-screen-desktop',
            label: 'menu.jumbotron',
            to: `${adminRoot}/ui/components/jumbotron`,
          },
          {
            icon: 'simple-icon-map',
            label: 'menu.maps',
            to: `${adminRoot}/ui/components/maps`,
          },
          {
            icon: 'simple-icon-docs',
            label: 'menu.modal',
            to: `${adminRoot}/ui/components/modal`,
          },
          {
            icon: 'simple-icon-cursor',
            label: 'menu.navigation',
            to: `${adminRoot}/ui/components/navigation`,
          },
          {
            icon: 'simple-icon-pin',
            label: 'menu.popover-tooltip',
            to: `${adminRoot}/ui/components/popover-tooltip`,
          },
          {
            icon: 'simple-icon-shuffle',
            label: 'menu.sortable',
            to: `${adminRoot}/ui/components/sortable`,
          },
          {
            icon: 'simple-icon-grid',
            label: 'menu.tables',
            to: `${adminRoot}/ui/components/tables`,
          },
        ],
      },
    ],
  },
  {
    id: 'menu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.menu',
    to: `${adminRoot}/menu`,
    subs: [
      {
        icon: 'simple-icon-logout',
        label: 'menu.types',
        to: `${adminRoot}/menu/types`,
      },
      {
        icon: 'simple-icon-layers',
        label: 'menu.levels',
        to: `${adminRoot}/menu/levels`,
        subs: [
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-1',
            to: `${adminRoot}/menu/levels/third-level-1`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-2',
            to: `${adminRoot}/menu/levels/third-level-2`,
          },
          {
            icon: 'simple-icon-arrow-right',
            label: 'menu.third-level-3',
            to: `${adminRoot}/menu/levels/third-level-3`,
          },
        ],
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
