import styles from "./loader.module.css";

function Loader() {
    return (
        <div className="w-full min-h-80 flex justify-center items-center">
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Loader;
