"use client";

import { useState } from "react";
import * as Icons from "./index";
import styles from "./Icons.test.module.scss";

const iconList = [
  { name: "ArrowDownLeft", Component: Icons.ArrowDownLeftIcon },
  { name: "ArrowLeft", Component: Icons.ArrowLeftIcon },
  { name: "ArrowRight", Component: Icons.ArrowRightIcon },
  { name: "Box", Component: Icons.BoxIcon },
  { name: "Cart", Component: Icons.CartIcon },
  { name: "Chat", Component: Icons.ChatIcon },
  { name: "CheckLg", Component: Icons.CheckLgIcon },
  { name: "CheckSm", Component: Icons.CheckSmIcon },
  { name: "ChevronDown", Component: Icons.ChevronDownIcon },
  { name: "ChevronLeft", Component: Icons.ChevronLeftIcon },
  { name: "ChevronRight", Component: Icons.ChevronRightIcon },
  { name: "ChevronUp", Component: Icons.ChevronUpIcon },
  { name: "Close", Component: Icons.CloseIcon },
  { name: "Data", Component: Icons.DataIcon },
  { name: "Edit", Component: Icons.EditIcon },
  { name: "Facebook", Component: Icons.FacebookIcon },
  { name: "Filter", Component: Icons.FilterIcon },
  { name: "FolderPlus", Component: Icons.FolderPlusIcon },
  { name: "Grid", Component: Icons.GridIcon },
  { name: "Heart", Component: Icons.HeartIcon },
  { name: "InstaBlack", Component: Icons.InstaBlackIcon },
  { name: "InstaWhite", Component: Icons.InstaWhiteIcon },
  { name: "List", Component: Icons.ListIcon },
  { name: "Menu", Component: Icons.MenuIcon },
  { name: "Minus", Component: Icons.MinusIcon },
  { name: "Plus", Component: Icons.PlusIcon },
  { name: "Search", Component: Icons.SearchIcon },
  { name: "Share", Component: Icons.ShareIcon },
  { name: "Trash", Component: Icons.TrashIcon },
  { name: "Truck", Component: Icons.TruckIcon },
  { name: "Twitter", Component: Icons.TwitterIcon },
  { name: "User", Component: Icons.UserIcon },
];

export const IconsTest = () => {
  const [size, setSize] = useState(24);
  const [color, setColor] = useState("#17171B");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Icons Component</h2>

      <section className={styles.controls}>
        <div className={styles.control}>
          <label>Size: {size}px</label>
          <input
            type="range"
            min="16"
            max="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
        <div className={styles.control}>
          <label>Color: {color}</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </section>

      <section className={styles.grid}>
        {iconList.map(({ name, Component }) => (
          <div key={name} className={styles.item}>
            <div className={styles.icon_wrapper}>
              <Component size={size} color={color} />
            </div>
            <span className={styles.name}>{name}</span>
          </div>
        ))}
      </section>
    </div>
  );
};
