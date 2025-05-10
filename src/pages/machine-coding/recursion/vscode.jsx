import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { File, Folder, Pencil, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { v4 } from "uuid";

const vscodeData = [
  {
    id: "root",
    name: "Project Root",
    children: [
      {
        id: "src",
        name: "src",
        children: [
          {
            id: "components",
            name: "components",
            children: [
              {
                id: "auth",
                name: "auth",
                children: [
                  {
                    id: "Login",
                    name: "Login.tsx",
                  },
                  {
                    id: "Register",
                    name: "Register.tsx",
                  },
                  {
                    id: "AuthProvider",
                    name: "AuthProvider.tsx",
                  },
                ],
              },
              {
                id: "layout",
                name: "layout",
                children: [
                  {
                    id: "Header",
                    name: "Header.tsx",
                  },
                  {
                    id: "Footer",
                    name: "Footer.tsx",
                  },
                  {
                    id: "Sidebar",
                    name: "Sidebar.tsx",
                  },
                ],
              },
            ],
          },
          {
            id: "hooks",
            name: "hooks",
            children: [
              {
                id: "useAuth",
                name: "useAuth.ts",
              },
              {
                id: "useTheme",
                name: "useTheme.ts",
              },
              {
                id: "useLocalStorage",
                name: "useLocalStorage.ts",
              },
            ],
          },
        ],
      },
      {
        id: "tests",
        name: "tests",
        children: [
          {
            id: "unit",
            name: "unit",
            children: [
              {
                id: "auth.test",
                name: "auth.test.ts",
              },
              {
                id: "components.test",
                name: "components.test.ts",
              },
            ],
          },
          {
            id: "e2e",
            name: "e2e",
            children: [
              {
                id: "login.spec",
                name: "login.spec.ts",
              },
              {
                id: "register.spec",
                name: "register.spec.ts",
              },
            ],
          },
        ],
      },
      {
        id: "config",
        name: "config",
        children: [
          {
            id: "webpack",
            name: "webpack.config.js",
          },
          {
            id: "jest",
            name: "jest.config.js",
          },
          {
            id: "tsconfig",
            name: "tsconfig.json",
          },
        ],
      },
    ],
  },
  {
    id: "docs",
    name: "Documentation",
    children: [
      {
        id: "api",
        name: "API Reference",
        children: [
          {
            id: "auth-api",
            name: "Authentication.md",
          },
          {
            id: "endpoints",
            name: "Endpoints.md",
          },
        ],
      },
      {
        id: "guides",
        name: "Guides",
        children: [
          {
            id: "getting-started",
            name: "Getting Started.md",
          },
          {
            id: "deployment",
            name: "Deployment.md",
          },
        ],
      },
    ],
  },
];

const VsCodeLikeTree = () => {
  const [data, setData] = useState(vscodeData);

  return (
    <div suppressHydrationWarning className="max-w-xl mx-auto mt-56">
      <Tree items={data} setData={setData} depth={1} />
    </div>
  );
};

export default VsCodeLikeTree;

const Tree = ({ items, setData, depth = 1 }) => {
  const addItem = (ID, newOne) => {
    setData((prev) => {
      const prevState = structuredClone(prev);
      const findItem = (nodes) => {
        return nodes.map((item) => {
          if (item.id === ID) {
            return {
              ...item,
              children: [...(item.children || []), { id: v4(), name: newOne }],
            };
          } else if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: findItem(item.children),
            };
          }
          return item;
        });
      };
      return findItem(prevState);
    });
  };

  const editItem = (ID, newOne) => {
    setData((prev) => {
      const prevState = structuredClone(prev);
      const findItem = (nodes) => {
        return nodes.map((item) => {
          if (item.id === ID) {
            return {
              ...item,
              name: newOne,
            };
          } else if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: findItem(item.children),
            };
          }
          return item;
        });
      };
      return findItem(prevState);
    });
  };

  const deleteItem = (ID) => {
    setData((prev) => {
      const prevState = structuredClone(prev);
      const findItems = (items) => {
        return items.filter((item) => {
          if (item.id === ID) {
            return false;
          } else if (item.children && item.children.length > 0) {
            item.children = findItems(item.children);
          }
          return true;
        });
      };
      return findItems(prevState);
    });
  };

  return (
    <div>
      <Accordion collapsible>
        {items?.map((item) => {
          if (item.children) {
            return (
              <AccordionItem key={item.id} className="relative" value={item.id}>
                <div style={{ marginLeft: `${depth * 8}px` }}>
                  <AccordionTrigger className="hover:no-underline group">
                    <div className="flex items-center gap-2">
                      <Folder
                        size={20}
                        className="text-gray-500 group-hover:text-white transition-colors duration-200"
                      />
                      {item.name}
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-3 ml-4 transition-all duration-200">
                        <Plus
                          className="hover:text-white cursor-pointer"
                          size={15}
                          onClick={(e) => {
                            e.stopPropagation();
                            const newOne = window.prompt("Enter file name");
                            if (newOne) addItem(item.id, newOne);
                          }}
                        />
                        <Pencil
                          className="hover:text-white cursor-pointer"
                          size={15}
                          onClick={(e) => {
                            e.stopPropagation();
                            const newOne = window.prompt("Edit name", item.name);
                            if (newOne?.length) editItem(item.id, newOne);
                          }}
                        />
                        <Trash
                          className="hover:text-white cursor-pointer"
                          size={15}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm("Are you sure you want to delete this item?")) {
                              deleteItem(item.id);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </AccordionTrigger>

                  {item.children?.length > 0 && (
                    <AccordionContent>
                      <Tree items={item.children} setData={setData} depth={depth + 1} />
                    </AccordionContent>
                  )}
                </div>
              </AccordionItem>
            );
          } else {
            return (
              <div
                key={item.id}
                className="flex cursor-pointer items-center gap-2 py-2 hover:text-white group"
                style={{ marginLeft: `${depth * 8}px` }}
              >
                <File
                  size={20}
                  className="text-gray-500 group-hover:text-white transition-colors duration-200"
                />
                <div className="w-4 h-0.5 bg-gray-500" />
                {item.name}
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-3 ml-4 transition-all duration-200">
                  <Plus
                    className="hover:text-white cursor-pointer"
                    size={15}
                    onClick={() => {
                      const newOne = window.prompt("Enter file name");
                      if (newOne) addItem(item.id, newOne);
                    }}
                  />
                  <Pencil
                    className="hover:text-white cursor-pointer"
                    size={15}
                    onClick={() => {
                      const newOne = window.prompt("Edit name", item.name);
                      if (newOne?.length) editItem(item.id, newOne);
                    }}
                  />
                  <Trash
                    className="hover:text-white cursor-pointer"
                    size={15}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this item?")) {
                        deleteItem(item.id);
                      }
                    }}
                  />
                </div>
              </div>
            );
          }
        })}
      </Accordion>
    </div>
  );
};