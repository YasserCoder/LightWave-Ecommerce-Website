function Section({ title, padding = true, children }) {
    return (
        <section
            className={
                padding
                    ? `py-[40px] md:py-[60px] xl:py-[90px] w-full container`
                    : `w-full container`
            }
        >
            <div className="relative mx-auto w-fit mb-20">
                <h1 className="text-3xl sm:text-4xl font-extrabold capitalize">
                    {title}
                </h1>
                <span className="absolute w-[70%] h-[2px] bg-bluegreen left-[50%] translate-x-[-50%] -bottom-4"></span>
            </div>
            {children}
        </section>
    );
}

export default Section;
