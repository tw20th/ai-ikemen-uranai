import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © 2025 占いサイト | <a href="/terms" style={styles.link}>利用規約</a> | <a href="/privacy" style={styles.link}>プライバシーポリシー</a>
      </p>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    footer: {
      backgroundColor: "#f4f4f4",
      padding: "10px 20px",
      textAlign: "center", // 文字列として適合
      borderTop: "1px solid #ddd",
    },
    text: {
      margin: 0,
      fontSize: "14px",
      color: "#666",
    },
    link: {
      textDecoration: "none",
      color: "#333",
    },
  };

export default Footer;
