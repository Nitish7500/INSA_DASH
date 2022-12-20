import { adminRoot, UserRole } from './defaultValues';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'dashboards',
    to: `${adminRoot}/dashboards`,
    roles: [UserRole.Admin, UserRole.Executive],
  },
  {
    id: 'pages-complaints',
    icon: 'iconsminds-digital-drawing',
    label: 'complaints',
    to: `${adminRoot}/pages`,
    roles: [UserRole.Admin, UserRole.Executive],
    subs: [
      {
        id: 'all',
        icon: 'iconsminds-digital-drawing',
        label: 'All Complaints',
        to: {pathname: `${adminRoot}/pages/product/data-list`}
      },
      {
        id: 'pages-pending',
        icon: 'iconsminds-digital-drawing',
        label: 'Pending Complaints',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Pending'},
        roles: [UserRole.Admin, UserRole.Executive],
      },
      {
        id: 'pages-accept',
        icon: 'iconsminds-digital-drawing',
        label: 'Accept',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Accept'},
        roles: [UserRole.Admin, UserRole.Executive],
      },
      {
        id: 'accepted-with-pendency',
        icon: 'iconsminds-digital-drawing',
        label: 'Accepted with Pendency',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'ACCEPTED WITH PENDENCY'},
        roles: [UserRole.Admin, UserRole.Executive],
      },
      {
        id: 'incomplete-info',
        icon: 'iconsminds-digital-drawing',
        label: 'Incomplete Information',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'INCOMPLETE INFORMATION'},
        roles: [UserRole.Admin, UserRole.Executive],
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Expert Mail Drafted',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'EXPERT MAIL DRAFTED'},
        roles: [UserRole.Admin, UserRole.Executive],
      },
      {
        id: '',
        icon: 'iconsminds-digital-drawing',
        label: 'Company Escalation Done',
        to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY ESCALATION DONE'},
        roles: [UserRole.Admin, UserRole.Executive],
      },

      {
        id: 'pages-authorization',
        label: 'Mailing Buckets',
        icon: 'iconsminds-digital-drawing',
        to: '/user',
        roles: [UserRole.Admin, UserRole.Executive],
        subs: [
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Complaint Form Filled',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPLAINT FORM FILLED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Draft Mail Generated',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'DRAFT MAIL GENERATED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Expert Approved Draft Mail',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'EXPERT APPROVED DRAFT MAIL'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Company'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'IGMS',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'IGMS'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company/IGMS',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Company/IGMS'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Escalation Pending',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'ESCALATION PENDING'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Escalation Mail Generated',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'ESCALATION MAIL GENERATED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Escalation Approved',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'ESCALATION APPROVED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company Escalated',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY ESCALATED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'IGMS Escalated',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'IGMS ESCALATED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company / IGMS Escalated',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY/IGMS ESCALATED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'No Response Received',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'NO RESPONSE RECEIVED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Reminder Mail Sent',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'REMINDER MAIL SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company Requirement Received',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY REQUIREMENT RECEIVED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: 'Company Requirement Sent',
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY REQUIREMENT SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
        ],
      },
      
      {
        id: 'ombudsman-buckets',
        label: 'Ombudsman Section',
        to: `${adminRoot}/pages/product`,
        subs: [
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Ombudsman Pending",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Ombudsman Pending'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Complaint Form Sent",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPLAINT FORM SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Without Legal",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Ombudsman without Legal'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Requirement Pending",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'OMBUDSMAN REQUIREMENT PENDING'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Requirement Pushed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'OMBUDSMAN REQUIREMENT PUSHED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Requirement Sent",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'OMBUDSMAN REQUIREMENT SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Form 6a Received",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'FORM 6A RECEIVED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Form 6a Pushed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'FORM 6A PUSHED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Form 6a Sent",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'FORM 6A SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Hearing Date Received",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'HEARING DATE RECEIVED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Hearing Postponed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'HEARING POSTPONED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Hearing Done",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'HEARING DONE'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Award Accepted",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'AWARD ACCEPTED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Award Rejected",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'AWARD REJECTED'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Ombudsman With Legal Pending",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'OMBUDSMAN WITH LEGAL PENDING'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Ombudsman With Legal Sent",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'OMBUDSMAN WITH LEGAL SENT'},
            roles: [UserRole.Admin, UserRole.Executive],
          },
        ],
      },

      {
        id: 'legal-buckets',
        label: 'Legal Buckets',
        to: `${adminRoot}/pages/product`,
        roles: [UserRole.Admin, UserRole.Executive],
        subs: [
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'Legal'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Contract Pending",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL CONTRACT PENDING'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Contract Signed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL CONTRACT SIGNED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Query Raised",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL QUERY RAISED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Query Answered",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL QUERY ANSWERED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Draft For Approval",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL DRAFT FOR APPROVAL'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Court Filing Points",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COURT FILING POINTS'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Court Filing Pending Bucket",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COURT FILING PENDING BUCKET'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Case Filing Done",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'CASE FILING DONE'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Recovery From Customer",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL RECOVERY FROM CUSTOMER'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Notice Received",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL NOTICE RECEIVED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Notice Sent",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL NOTICE SENT'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label:"Legal Recovery From Company",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'LEGAL RECOVERY FROM COMPANY'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Court Issued Summon",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COURT ISSUED SUMMON'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Company Reply Awaited",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPANY REPLY AWAITED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Rejoinder Need To Be Filed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'REJOINDER NEED TO BE FILED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Affidavit Need To Be Filed",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'AFFIDAVIT NEED TO BE FILED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Complainant Evidence",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'COMPLAINANT EVIDENCE'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Defendant Evidence",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'DEFENDANT EVIDENCE'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Settlement Proposal Submission Pending",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'SETTLEMENT PROPOSAL SUBMISSION PENDING'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Settlement Proposal Submitted",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'SETTLEMENT PROPOSAL SUBMITTED'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Agruments",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'AGRUMENTS'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Final Arguments",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'FINAL ARGUMENTS'}
          },
          {
            id: '',
            icon: 'simple-icon-credit-card',
            label: "Order Awaited",
            to: {pathname: `${adminRoot}/pages/product/data-list`, state: 'ORDER AWAITED'}
          }
        ]
      },

      {
        id: 'account-buckets',
        label: 'Account Buckets',
        to: `${adminRoot}/pages/product`,
        roles: [UserRole.Admin, UserRole.Executive],
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'Resolved',
            to: `${adminRoot}/pages/product/data-list`,
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
        roles: [UserRole.Admin, UserRole.Executive],
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
      //   label: 'profile',
      //   to: `${adminRoot}/pages/profile`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-share',
      //       label: 'social',
      //       to: `${adminRoot}/pages/profile/social`,
      //     },
      //     {
      //       icon: 'simple-icon-link',
      //       label: 'portfolio',
      //       to: `${adminRoot}/pages/profile/portfolio`,
      //     },
      //   ],
      // },
      // {
      //   id: 'pages-blog',
      //   label: 'blog',
      //   to: `${adminRoot}/pages/blog`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-share',
      //       label: 'blog-list',
      //       to: `${adminRoot}/pages/blog/blog-list`,
      //     },
      //     {
      //       icon: 'simple-icon-link',
      //       label: 'blog-detail',
      //       to: `${adminRoot}/pages/blog/blog-detail`,
      //     },
      //   ],
      // },
      // {
      //   id: 'pages-miscellaneous',
      //   label: 'miscellaneous',
      //   to: `${adminRoot}/pages/miscellaneous`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-question',
      //       label: 'faq',
      //       to: `${adminRoot}/pages/miscellaneous/faq`,
      //     },
      //     {
      //       icon: 'simple-icon-graduation',
      //       label: 'knowledge-base',
      //       to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
      //     },

      //     {
      //       icon: 'simple-icon-diamond',
      //       label: 'prices',
      //       to: `${adminRoot}/pages/miscellaneous/prices`,
      //     },
      //     {
      //       icon: 'simple-icon-magnifier',
      //       label: 'search',
      //       to: `${adminRoot}/pages/miscellaneous/search`,
      //     },
      //     {
      //       icon: 'simple-icon-envelope-open',
      //       label: 'mailing',
      //       to: `${adminRoot}/pages/miscellaneous/mailing`,
      //     },
      //     {
      //       icon: 'simple-icon-bag',
      //       label: 'invoice',
      //       to: `${adminRoot}/pages/miscellaneous/invoice`,
      //     },

      //     {
      //       icon: 'simple-icon-exclamation',
      //       label: 'error',
      //       to: '/error',
      //       newWindow: true,
      //     },
      //   ],
      // },
    ],
  },
  {
    id:"botTranscript",
    icon:"iconsminds-speach-bubble-dialog",
    label:"Bot Transcript",
    to:`${adminRoot}/botTranscript`,
    roles:[ UserRole.Admin, UserRole.Executive]
  },
  {
    id:"leads",
    icon:" iconsminds-three-arrow-fork    ",
    label:"Leads",
    to:`${adminRoot}/leads`,
    roles:[UserRole.Admin, UserRole.Executive]
  },
  {
    id:"customer",
    icon:"iconsminds-mens",
    label:"Customer",
    to:`${adminRoot}/customer`,
    roles:[UserRole.Admin, UserRole.Executive]
  },
  {
    id:"users",
    icon:"iconsminds-business-man",
    label:"Users",
    to:`${adminRoot}/users`,
    roles:[UserRole.Admin, UserRole.Executive]
  },
  {
    id:"Report",
    icon:"iconsminds-receipt-4    ",
    label:"Reports",
    to:`${adminRoot}/report/user-report`,
    roles:[UserRole.Admin]
  },
  // {
  //   id: 'applications',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'applications',
  //   to: `${adminRoot}/applications`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-check',
  //       label: 'todo',
  //       to: `${adminRoot}/applications/todo`,
  //     },
  //     {
  //       icon: 'simple-icon-calculator',
  //       label: 'survey',
  //       to: `${adminRoot}/applications/survey`,
  //     },
  //     {
  //       icon: 'simple-icon-bubbles',
  //       label: 'chat',
  //       to: `${adminRoot}/applications/chat`,
  //     },
  //   ],
  // },
  // {
  //   id: 'ui',
  //   icon: 'iconsminds-pantone',
  //   label: 'ui',
  //   to: `${adminRoot}/ui`,
  //   subs: [
  //     {
  //       id: 'ui-forms',
  //       label: 'forms',
  //       to: `${adminRoot}/ui/forms`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-notebook',
  //           label: 'layouts',
  //           to: `${adminRoot}/ui/forms/layouts`,
  //         },
  //         {
  //           icon: 'simple-icon-puzzle',
  //           label: 'components',
  //           to: `${adminRoot}/ui/forms/components`,
  //         },
  //         {
  //           icon: 'simple-icon-check',
  //           label: 'validations',
  //           to: `${adminRoot}/ui/forms/validations`,
  //         },
  //         {
  //           icon: 'simple-icon-magic-wand',
  //           label: 'wizard',
  //           to: `${adminRoot}/ui/forms/wizard`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'ui-components',
  //       label: 'components',
  //       to: `${adminRoot}/ui/components`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-bell',
  //           label: 'alerts',
  //           to: `${adminRoot}/ui/components/alerts`,
  //         },
  //         {
  //           icon: 'simple-icon-badge',
  //           label: 'badges',
  //           to: `${adminRoot}/ui/components/badges`,
  //         },
  //         {
  //           icon: 'simple-icon-control-play',
  //           label: 'buttons',
  //           to: `${adminRoot}/ui/components/buttons`,
  //         },
  //         {
  //           icon: 'simple-icon-layers',
  //           label: 'cards',
  //           to: `${adminRoot}/ui/components/cards`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'carousel',
  //           to: `${adminRoot}/ui/components/carousel`,
  //         },
  //         {
  //           icon: 'simple-icon-chart',
  //           label: 'charts',
  //           to: `${adminRoot}/ui/components/charts`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-up',
  //           label: 'collapse',
  //           to: `${adminRoot}/ui/components/collapse`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-down',
  //           label: 'dropdowns',
  //           to: `${adminRoot}/ui/components/dropdowns`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'editors',
  //           to: `${adminRoot}/ui/components/editors`,
  //         },

  //         {
  //           icon: 'simple-icon-star',
  //           label: 'icons',
  //           to: `${adminRoot}/ui/components/icons`,
  //         },
  //         {
  //           icon: 'simple-icon-note',
  //           label: 'input-groups',
  //           to: `${adminRoot}/ui/components/input-groups`,
  //         },
  //         {
  //           icon: 'simple-icon-screen-desktop',
  //           label: 'jumbotron',
  //           to: `${adminRoot}/ui/components/jumbotron`,
  //         },
  //         {
  //           icon: 'simple-icon-map',
  //           label: 'maps',
  //           to: `${adminRoot}/ui/components/maps`,
  //         },
  //         {
  //           icon: 'simple-icon-docs',
  //           label: 'modal',
  //           to: `${adminRoot}/ui/components/modal`,
  //         },
  //         {
  //           icon: 'simple-icon-cursor',
  //           label: 'navigation',
  //           to: `${adminRoot}/ui/components/navigation`,
  //         },
  //         {
  //           icon: 'simple-icon-pin',
  //           label: 'popover-tooltip',
  //           to: `${adminRoot}/ui/components/popover-tooltip`,
  //         },
  //         {
  //           icon: 'simple-icon-shuffle',
  //           label: 'sortable',
  //           to: `${adminRoot}/ui/components/sortable`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'tables',
  //           to: `${adminRoot}/ui/components/tables`,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'menu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'menu',
  //   to: `${adminRoot}/menu`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-logout',
  //       label: 'types',
  //       to: `${adminRoot}/menu/types`,
  //     },
  //     {
  //       icon: 'simple-icon-layers',
  //       label: 'levels',
  //       to: `${adminRoot}/menu/levels`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'third-level-1',
  //           to: `${adminRoot}/menu/levels/third-level-1`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'third-level-2',
  //           to: `${adminRoot}/menu/levels/third-level-2`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-right',
  //           label: 'third-level-3',
  //           to: `${adminRoot}/menu/levels/third-level-3`,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
