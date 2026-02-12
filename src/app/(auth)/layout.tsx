import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.auth_layout}>
      <Header theme="light" />
      <main className={styles.main}>
        {/* Left Image Section */}
        <div className={styles.image_section}>
          <div
            className={styles.background_image}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1539906071507-c5e9f091b3ce?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
        </div>

        {/* Right Form Section */}
        <div className={styles.form_section}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
