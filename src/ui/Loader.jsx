import styles from "./loader.module.css";

function Loader() {
    return (
        <div className="w-full h-44 flex justify-center items-center">
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Loader;
