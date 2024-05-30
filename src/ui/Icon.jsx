const style =
    "bg-secondary text-primary  flex items-center justify-center rounded-full hover:bg-bluegreen active:bg-hovercol active:text-bluegreen hover:text-secondary cursor-pointer duration-300 text-lg ";
function Icon({ href = "", onClick = () => {}, children }) {
    return (
        <a
            href={`${href}`}
            target="_blank"
            onClick={(e) => {
                onClick(e);
            }}
            className={
                href !== ""
                    ? style + "size-[35px]"
                    : style + "size-[45px] shadow-xl border border-primary"
            }
        >
            {children}
        </a>
    );
}

export default Icon;
