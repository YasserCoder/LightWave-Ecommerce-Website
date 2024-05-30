function Button({
    submit = false,
    state = false,
    btnstyle = "",
    handle,
    children,
}) {
    const style =
        "bg-bluegreen py-[10px] text-secondary  cursor-pointer " + btnstyle;

    return (
        <button
            type={submit ? "submit" : "button"}
            className={style}
            disabled={state}
            onClick={(e) => handle(e)}
        >
            {children}
        </button>
    );
}

export default Button;
