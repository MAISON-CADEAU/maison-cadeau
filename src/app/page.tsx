"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
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
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.page_title}>Component Library</h1>
          <p className={styles.page_description}>
            모든 공통 컴포넌트를 확인할 수 있습니다
          </p>
        </header>

        {/* Button Component */}
        <section className={styles.component_section}>
          <h2 className={styles.section_title}>Button Component</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>Variants</h3>
            <div className={styles.component_grid}>
              <div className={styles.component_item}>
                <Button variant="primary">Primary</Button>
                <code className={styles.code}>variant="primary"</code>
              </div>
              <div className={styles.component_item}>
                <Button variant="secondary">Secondary</Button>
                <code className={styles.code}>variant="secondary"</code>
              </div>
              <div className={styles.component_item}>
                <Button variant="outline">Outline</Button>
                <code className={styles.code}>variant="outline"</code>
              </div>
              <div className={styles.component_item}>
                <Button variant="ghost">Ghost</Button>
                <code className={styles.code}>variant="ghost"</code>
              </div>
              <div className={styles.component_item}>
                <Button variant="kakao">Kakao</Button>
                <code className={styles.code}>variant="kakao"</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>Sizes</h3>
            <div className={styles.component_grid}>
              <div className={styles.component_item}>
                <Button size="sm">Small</Button>
                <code className={styles.code}>size="sm"</code>
              </div>
              <div className={styles.component_item}>
                <Button size="md">Medium</Button>
                <code className={styles.code}>size="md"</code>
              </div>
              <div className={styles.component_item}>
                <Button size="lg">Large</Button>
                <code className={styles.code}>size="lg"</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>States</h3>
            <div className={styles.component_grid}>
              <div className={styles.component_item}>
                <Button disabled>Disabled</Button>
                <code className={styles.code}>disabled</code>
              </div>
              <div className={styles.component_item}>
                <Button isLoading={isLoading} onClick={handleLoadingClick}>
                  {isLoading ? "Loading..." : "Click to Load"}
                </Button>
                <code className={styles.code}>isLoading</code>
              </div>
              <div className={styles.component_item}>
                <Button fullWidth>Full Width</Button>
                <code className={styles.code}>fullWidth</code>
              </div>
            </div>
          </div>
        </section>

        {/* Input Component */}
        <section className={styles.component_section}>
          <h2 className={styles.section_title}>Input Component</h2>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>Basic</h3>
            <div className={styles.input_column}>
              <div className={styles.input_item}>
                <Input
                  placeholder="기본 인풋"
                  value={inputValue1}
                  onChange={(e) => setInputValue1(e.target.value)}
                />
                <code className={styles.code}>{`<Input placeholder="기본 인풋" />`}</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>With Label</h3>
            <div className={styles.input_column}>
              <div className={styles.input_item}>
                <Input
                  label="이메일"
                  type="email"
                  placeholder="example@email.com"
                  value={inputValue2}
                  onChange={(e) => setInputValue2(e.target.value)}
                />
                <code className={styles.code}>{`<Input label="이메일" type="email" />`}</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>With Helper Text</h3>
            <div className={styles.input_column}>
              <div className={styles.input_item}>
                <Input
                  label="닉네임"
                  placeholder="닉네임 입력"
                  helperText="2-10자의 한글, 영문, 숫자"
                />
                <code className={styles.code}>{`<Input helperText="..." />`}</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>Error State</h3>
            <div className={styles.input_column}>
              <div className={styles.input_item}>
                <Input
                  label="이메일"
                  type="email"
                  placeholder="example@email.com"
                  error="올바른 이메일 형식이 아닙니다"
                  value={inputValue3}
                  onChange={(e) => setInputValue3(e.target.value)}
                />
                <code className={styles.code}>{`<Input error="..." />`}</code>
              </div>
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsection_title}>Disabled</h3>
            <div className={styles.input_column}>
              <div className={styles.input_item}>
                <Input label="비활성화" placeholder="입력 불가" disabled />
                <code className={styles.code}>{`<Input disabled />`}</code>
              </div>
            </div>
          </div>
        </section>

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
  );
}
