function Form({ title, children }) {
    return (
        <form className="flex flex-col mx-auto items-center  rounded-md shadow-xl gap-8 my-6 w-fit p-7 sm:px-12 md:px-20 xl:px-28">
            <h1 className="uppercase font-black text-2xl mb-3">{title}</h1>
            {children}
        </form>
    );
}

export default Form;
