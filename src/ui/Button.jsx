function Button({
    submit = false,
    state = false,
    btnstyle = "",
    handle,
    children,
}) {
    const style =
        "bg-bluegreen py-[10px] text-secondary  cursor-pointer active:translate-y-1 active:shadow-lg disabled:active:translate-y-0 disabled:active:shadow-none disabled:cursor-not-allowed" +
        btnstyle;

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
