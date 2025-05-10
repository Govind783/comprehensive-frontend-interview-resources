import React, { useState } from "react";
const checkboss = [
  {
    id: "electronics",
    label: "Electronics",
    checked: false,
    children: [
      {
        id: "smartphones",
        label: "Smartphones",
        checked: false,
        children: [
          {
            id: "apple",
            label: "Apple",
            checked: false,
            children: [],
          },
          {
            id: "samsung",
            label: "Samsung",
            checked: false,
            children: [],
          },
          {
            id: "google",
            label: "Google",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "laptops",
        label: "Laptops",
        checked: false,
        children: [
          {
            id: "macbook",
            label: "MacBook",
            checked: false,
            children: [],
          },
          {
            id: "dell",
            label: "Dell",
            checked: false,
            children: [],
          },
          {
            id: "hp",
            label: "HP",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        checked: false,
        children: [
          {
            id: "headphones",
            label: "Headphones",
            checked: false,
            children: [],
          },
          {
            id: "chargers",
            label: "Chargers",
            checked: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    checked: false,
    children: [
      {
        id: "men",
        label: "Men's Clothing",
        checked: false,
        children: [
          {
            id: "shirts",
            label: "Shirts",
            checked: false,
            children: [],
          },
          {
            id: "pants",
            label: "Pants",
            checked: false,
            children: [],
          },
          {
            id: "shoes",
            label: "Shoes",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "women",
        label: "Women's Clothing",
        checked: false,
        children: [
          {
            id: "dresses",
            label: "Dresses",
            checked: false,
            children: [],
          },
          {
            id: "tops",
            label: "Tops",
            checked: false,
            children: [],
          },
          {
            id: "skirts",
            label: "Skirts",
            checked: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "groceries",
    label: "Groceries",
    checked: false,
    children: [
      {
        id: "fruits",
        label: "Fruits",
        checked: false,
        children: [
          {
            id: "apples",
            label: "Apples",
            checked: false,
            children: [],
          },
          {
            id: "bananas",
            label: "Bananas",
            checked: false,
            children: [],
          },
          {
            id: "oranges",
            label: "Oranges",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "vegetables",
        label: "Vegetables",
        checked: false,
        children: [
          {
            id: "carrots",
            label: "Carrots",
            checked: false,
            children: [],
          },
          {
            id: "broccoli",
            label: "Broccoli",
            checked: false,
            children: [],
          },
          {
            id: "spinach",
            label: "Spinach",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "dairy",
        label: "Dairy",
        checked: false,
        children: [
          {
            id: "milk",
            label: "Milk",
            checked: false,
            children: [],
          },
          {
            id: "cheese",
            label: "Cheese",
            checked: false,
            children: [],
          },
          {
            id: "yogurt",
            label: "Yogurt",
            checked: false,
            children: [],
          },
        ],
      },
    ],
  },
];

const R = () => {
  const [data, setData] = useState(checkboss);

  return (
    <div className="w-screen h-screen">
      <Tree data={data} setData={setData} depth={1} />
    </div>
  );
};

export default R;

const Tree = ({ data, setData, depth }) => {
  const toggleHandler = (ID) => {
    setData((prev) => {
      const prevState = structuredClone(prev);

      const findItems = (nodes) => {
        return nodes.map((item) => {
          if (item.id === ID) {
            // top down here, matlab i click on one got find all its childern and check em
            const checked = !item.checked;
            const childrenState =
              item.children.length > 0 ? findAllNodesAndCheckThem(item.children, checked) : item.children;
            return {
              ...item,
              checked,
              children: childrenState,
            };
          } else if (item.children && item.children.length > 0) {
            // we go bottom up here
            const nestedChildren = findItems(item.children);
            const checkedParent = nestedChildren.some((i) => i.checked);
            return {
              ...item,
              checked: checkedParent,
              children: nestedChildren,
            };
          }
          return item;
        });
      };

      const findAllNodesAndCheckThem = (nodes, checked) => {
        return nodes.map((item) => {
          if (item.children.length > 0) {
            return {
              ...item,
              checked,
              children: findAllNodesAndCheckThem(item.children, checked),
            };
          } else {
            return {
              ...item,
              checked,
            };
          }
        });
      };

      return findItems(prevState);
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      {data.map((item) => {
        if (item.children.length > 0) {
          return (
            <div
              style={{
                marginLeft: depth * 10,
                marginTop: "4px",
              }}
              key={item.id}
            >
              <div className="flex items-center gap-2">
                <Chekbox item={item} toggleHandler={toggleHandler} />
              </div>
              <Tree data={item.children} setData={setData} depth={depth + 1} />
            </div>
          );
        } else {
          return (
            <div
              style={{
                marginLeft: depth * 16,
                marginTop: "4px",
              }}
              key={item.id}
            >
              <div className="flex items-center gap-2">
                <Chekbox item={item} toggleHandler={toggleHandler} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

const Chekbox = ({ toggleHandler, item }) => {
  return (
    <>
      <input
        id={item.label}
        type="checkbox"
        value={item.label}
        onChange={(e) => toggleHandler(item.id)}
        checked={item.checked}
      />
      <label htmlFor={item.label}>{item.label}</label>
    </>
  );
};
