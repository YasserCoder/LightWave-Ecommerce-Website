function Quantity({ qte, setQte, originalQte, id, action = () => {} }) {
    function handleChange(e) {
        setQte(e.target.value);

        action((prevItems) => {
            return originalQte !== Number(e.target.value)
                ? { ...prevItems, [id]: Number(e.target.value) }
                : { ...prevItems, [id]: null };
        });
    }
    return (
        <div className="border-2 flex items-center h-fit rounded-md">
            <button
                className={`py-2 px-4  text-lg font-semibold border-r-2 ${
                    qte <= 1
                        ? "text-grey cursor-not-allowed"
                        : "active:translate-y-[2px] text-bluegreen"
                }  `}
                disabled={qte <= 1}
                onClick={() => {
                    if (qte > 1) {
                        setQte(Number(qte) - 1);
                        action((prevItems) => {
                            return originalQte !== Number(qte) - 1
                                ? { ...prevItems, [id]: Number(qte) - 1 }
                                : { ...prevItems, [id]: null };
                        });
                    }
                }}
            >
                ــ
            </button>
            <input
                type="number"
                name="number"
                className="w-16 py-2 px-2 outline-none font-semibold"
                min={"1"}
                value={qte}
                onChange={handleChange}
            />
            <button
                className="py-2 px-4 text-lg font-semibold text-bluegreen border-l-2 active:translate-y-[2px]"
                onClick={() => {
                    setQte(Number(qte) + 1);
                    action((prevItems) => {
                        return originalQte !== Number(qte) + 1
                            ? { ...prevItems, [id]: Number(qte) + 1 }
                            : { ...prevItems, [id]: null };
                    });
                }}
            >
                +
            </button>
        </div>
    );
}

export default Quantity;
