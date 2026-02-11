"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import * as Icons from "@/components/common/icons";
import styles from "./page.module.scss";      

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState("#17171B");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <header className={styles.header}>
            <h1 className={styles.page_title}>Component Library</h1>
            <p className={styles.page_description}>
              모든 공통 컴포넌트를 확인할 수 있습니다
            </p>
          </header>


        {/* Icons Component */}
        <section className={styles.component_section}>
          <h2 className={styles.section_title}>Icons Component</h2>

          <div className={styles.icon_controls}>
            <div className={styles.icon_control}>
              <label className={styles.control_label}>Size: {iconSize}px</label>
              <input
                type="range"
                min="16"
                max="64"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className={styles.range_input}
              />
            </div>
            <div className={styles.icon_control}>
              <label className={styles.control_label}>Color: {iconColor}</label>
              <input
                type="color"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className={styles.color_input}
              />
            </div>
          </div>

          <div className={styles.icon_grid}>
            {iconList.map(({ name, Component }) => (
              <div key={name} className={styles.icon_item}>
                <div className={styles.icon_wrapper}>
                  <Component size={iconSize} color={iconColor} />
                </div>
                <span className={styles.icon_name}>{name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
