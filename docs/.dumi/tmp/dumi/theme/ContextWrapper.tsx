// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React, { useState, useEffect, useRef } from 'react';
import { useOutlet, history } from 'dumi';
import { SiteContext } from '/Users/guhuan/Documents/Personal/NailyProjects/naily/v21/node_modules/.pnpm/dumi@2.2.14_@babel+core@7.23.3_@types+node@20.9.2_eslint@8.54.0_prettier@3.1.0_react-dom@18.2_ub3efl4qlos6enj4swh32rt6bm/node_modules/dumi/dist/client/theme-api/context.js';
import { demos, components } from '../meta';
import { locales } from '../locales/config';

const entryExports = {
  
  
};

export default function DumiContextWrapper() {
  const outlet = useOutlet();
  const [loading, setLoading] = useState(false);
  const prev = useRef(history.location.pathname);

  useEffect(() => {
    return history.listen((next) => {
      if (next.location.pathname !== prev.current) {
        prev.current = next.location.pathname;

        // scroll to top when route changed
        document.documentElement.scrollTo(0, 0);
      }
    });
  }, []);

  return (
    <SiteContext.Provider value={{
      pkg: {"name":"docs","description":"Progressive fullstack web framework for Node.js","version":"0.21.2","authors":["Zero <gczgroup@qq.com>"]},
      historyType: "browser",
      entryExports,
      demos,
      components,
      locales,
      loading,
      setLoading,
      hostname: undefined,
      themeConfig: {"logo":"assets/logo_black_fixed.png","footer":"Copyright © 2023 | Powered by <a href=\"https://d.umijs.org\" target=\"_blank\" rel=\"noreferrer\">dumi</a>","prefersColor":{"default":"light","switch":true},"nprogress":true,"lastUpdated":true,"name":"Naily","showLineNum":true,"socialLinks":{"github":"https://github.com/org-naily/core"}},
      _2_level_nav_available: true,
    }}>
      {outlet}
    </SiteContext.Provider>
  );
}
