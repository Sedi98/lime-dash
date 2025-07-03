"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  pathNames?: Record<string, string>;
  homeName?: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  pathNames = {},
  homeName = "Home",
}) => {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname
  const breadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const items = [];
    
    // Add home breadcrumb
    items.push({
      name: homeName,
      href: "/dash",
      isCurrent: paths.length === 0,
    });

    // Generate other breadcrumbs
    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      
      items.push({
        name: pathNames[path] || path.replace(/-/g, " "),
        href: isLast ? undefined : currentPath,
        isCurrent: isLast,
      });
    });

    return items;
  };

  const breadcrumbItems = breadcrumbs();

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl">{title}</h3>
      <div className="breadcrumbs text-sm">
        <ul>
          {breadcrumbItems.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <span className={item.isCurrent ? "text-primary font-medium" : ""}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageHeader;