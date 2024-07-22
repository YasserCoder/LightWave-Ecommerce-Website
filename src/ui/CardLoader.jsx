import styles from "./cardLoader.module.css";

function CardLoader() {
    return (
        <div className={styles.cardLoader}>
            <div className={styles.loaderImg}></div>
            <div className={styles.loaderInfo}>
                <div className={`${styles.loaderLine} ${styles.short}`}></div>
                <div className={styles.loaderLine}></div>
            </div>
            <div className={styles.loaderIcons}>
                <div className={styles.loaderIcon}></div>
                <div className={styles.loaderIcon}></div>
                <div className={styles.loaderIcon}></div>
            </div>
        </div>
    );
}

export default CardLoader;
