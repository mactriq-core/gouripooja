// Icons
import GroupIcon from "@mui/icons-material/Group";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import HttpsOutlined from "@mui/icons-material/HttpsOutlined";
import ErrorOutline from "@mui/icons-material/ErrorOutline";

export const links = [
  {
    id: 1,
    name: "Accounts",
    icon: <GroupIcon />,
    isActive: false,
    groups: [
      {
        id: 1,
        name: "Accounts Management",
        links: [
          {
            name: "All Accounts",
            url: "/admin/accounts/all-accounts",
            isVisited: true,
          },
          {
            name: "Add New Account",
            url: "/admin/accounts/add-new-account",
            isVisited: false,
          },
        ],
      },
      {
        id: 2,
        name: "User Management",
        links: [
          {
            name: "All Users",
            url: "/",
            isVisited: false,
          },
          {
            name: "Add New User",
            url: "/",
            isVisited: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Clients",
    icon: <Diversity3Icon />,
    isActive: false,
    groups: [
      {
        id: 1,
        name: "Companies",
        links: [
          {
            name: "All Companies",
            url: "/clients/companies/all-companies",
            isVisited: false,
          },
          {
            name: "Add New Company",
            url: "/clients/companies/add-new-company",
            isVisited: false,
          },
        ],
      },
      {
        id: 2,
        name: "Contacts",
        links: [
          {
            name: "All Contacts",
            url: "/clients/contacts/all-contacts",
            isVisited: false,
          },
          {
            name: "Add New Contact",
            url: "/clients/contacts/add-new-contact",
            isVisited: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Catalog",
    icon: <LibraryBooksIcon />,
    isActive: false,
    groups: [
      {
        id: 3,
        name: "Products",
        links: [
          {
            name: "All Products",
            url: "/catalog/products/all-products",
            isVisited: false,
          },
          {
            name: "Add New Product",
            url: "/catalog/products/add-new-product",
            isVisited: false,
          },
        ],
      },
      {
        id: 2,
        name: "Specials",
        links: [
          {
            name: "All Special Products",
            url: "/",
            isVisited: false,
          },
          {
            name: "Add New Special Product",
            url: "/",
            isVisited: false,
          },
        ],
      },
      {
        id: 1,
        name: "Catalog Settings",
        links: [
          {
            name: "Categories",
            url: "/catalog/settings/category",
            isVisited: false,
          },
          {
            name: "Sub Categories",
            url: "/catalog/settings/sub-category",
            isVisited: false,
          },
          {
            name: "Packaging",
            url: "/catalog/settings/packaging",
            isVisited: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Shop",
    icon: <CategoryIcon />,
    isActive: false,
    groups: [
      {
        id: 1,
        name: "Cart",
        links: [
          {
            name: "My Cart",
            url: "/",
            isVisited: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Sales",
    icon: <PriceChangeIcon />,
    isActive: false,
    groups: [
      {
        id: 1,
        name: "Online ",
        links: [
          {
            name: "Orders",
            url: "/",
            isVisited: false,
          },
          {
            name: "Refunds",
            url: "/",
            isVisited: false,
          },
        ],
      },
      {
        id: 2,
        name: "Store",
        links: [
          {
            name: "Orders",
            url: "/",
            isVisited: false,
          },
          {
            name: "Refunds",
            url: "/",
            isVisited: false,
          },
          {
            name: "Specials",
            url: "/",
            isVisited: false,
          },
        ],
      },
    ],
  },
];

export const userSettings = [
  {
    id: 0,
    name: "Profile",
    icon: AccountCircleOutlined,
  },
  {
    id: 1,
    name: "Inbox",
    icon: EmailOutlined,
  },
  {
    id: 2,
    name: "Change Password",
    icon: HttpsOutlined,
  },
  {
    id: 3,
    name: "Confirm Account",
    icon: ErrorOutline,
  },
];
