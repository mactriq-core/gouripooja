// React
import React, { useState, useEffect } from "react";

// Lodash
import _ from "lodash";

// Components
import AppBar from "./AppBar";
import MiniSideNav from "./SideNav/Mini";
import FullSideNav from "./SideNav/Full";
import Content from "./Content";
import Footer from "./Footer";

// Nav Config
import { links as Links } from "@/constants/config";

// Libs
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";

const Authenticated = ({
  children,
  mounted,
}: {
  children: React.ReactNode;
  mounted: boolean;
}) => {
  // States
  const [showNav, setShowNav] = useState(false);
  const [links, setLinks] = useState(Links);

  // Update Links
  const updateLinks = (parentName: string) => {
    const finalLinks = links?.map((parent) => ({
      ...parent,
      isActive:
        parent?.name?.toLowerCase() === parentName?.toLowerCase()
          ? true
          : false,
    }));
    setLinks(finalLinks);
  };

  // Update Links In Local Storage
  const updateLinksInLocalStorage = (parentName: string, fullUrl: string) => {
    const localStorageLinks: typeof links = getLocalStorage("links");
    const updatedLinks = localStorageLinks?.map((parent) => ({
      ...parent,
      isActive:
        parent?.name?.toLowerCase() === parentName?.toLowerCase()
          ? true
          : false,
      groups:
        parent?.name?.toLowerCase() === parentName?.toLowerCase()
          ? parent?.groups?.map((group) => ({
              ...group,
              links: group?.links?.map((link) => ({
                ...link,
                isVisited: link?.url === fullUrl ? true : false,
              })),
            }))
          : parent?.groups,
    }));
    setLocalStorage("links", updatedLinks);
    setLinks(updatedLinks);
  };
  console.log(links);
  console.log(updateLinksInLocalStorage);
  // Update Sidebar On Initial Render
  useEffect(() => {
    if (mounted) {
      // const localStorageLinks: typeof links = getLocalStorage("links");
      // if (
      //   localStorageLinks &&
      //   _.isEqual(
      //     links?.map((parent) => parent?.name),
      //     localStorageLinks?.map((parent) => parent?.name)
      //   )
      // ) {
      setLinks(links);
      setLocalStorage("links", links);
      // } else setLocalStorage("links", links);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    // <>
    //   <div>This is an authenticated page</div>
    // </>
    <>
      <AppBar setShowNav={setShowNav} updateLinks={updateLinks} />
      <MiniSideNav
        showNav={showNav}
        setShowNav={setShowNav}
        links={links}
        updateLinks={updateLinks}
      />
      <FullSideNav
        showNav={showNav}
        setShowNav={setShowNav}
        links={links}
        updateLinks={updateLinks}
        updateLinksInLocalStorage={updateLinksInLocalStorage}
      />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Authenticated;
