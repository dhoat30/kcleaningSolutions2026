import styles from "./Footer.module.scss";

export default function Copyright() {
  return (
    <div className={styles.copyrightWrapper}>
      <p>© {new Date().getFullYear()} K Cleaning Solution. All rights reserved.</p>
      <a href="https://webduel.co.nz" rel="nofollow noopener noreferrer" target="_blank">
        Designed &amp; developed by web<strong>duel</strong>
      </a>
    </div>
  );
}
