import React from "react";

// プロパティの型定義
type HeaderProps = {
  user: { name: string } | null;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>占いサイト</h1>
      <nav style={styles.nav}>
        {user ? (
          <>
            <a href="/profile" style={styles.link}>
              プロフィール
            </a>
            <a href="/logout" style={styles.link}>
              ログアウト
            </a>
          </>
        ) : (
          <>
            <a href="/login" style={styles.link}>
              ログイン
            </a>
            <a href="/register" style={styles.link}>
              登録
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#f4f4f4",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
};

export default Header;
