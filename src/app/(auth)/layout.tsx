import styles from "./layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.image_section} />
      <div className={styles.form_section}>{children}</div>
    </div>
  );
}
