// function Categories() {
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const { screenSize: isSmallScreen } = useScreenSize(768, handleResize);
//     const [containerWidth, setContainerWidth] = useState(0);

//     const catsRef = useRef(null);

//     useEffect(() => {
//         const cats = catsRef.current;
//         if (cats) {
//             setContainerWidth(cats.clientWidth);
//             cats.addEventListener("scroll", handleScroll);
//         }

//         return () => {
//             if (cats) {
//                 cats.removeEventListener("scroll", handleScroll);
//             }
//         };
//     }, []);

//     function handleScroll() {
//         const cats = catsRef.current;
//         if (cats) {
//             setScrollPosition(cats.scrollLeft);
//         }
//     }
//     function handleResize() {
//         const cats = catsRef.current;
//         if (cats) {
//             setContainerWidth(cats.clientWidth);
//         }
//     }
//     function scrollDirection(dir) {
//         const cats = catsRef.current;

//         if (cats) {
//             // console.log(cats.get)
//             if (dir === "left") {
//                 cats.scrollBy(-100, 0);
//             } else {
//                 cats.scrollBy(100, 0);
//             }
//         }
//     }
//     const listWidth = catsRef.current ? catsRef.current.scrollWidth : 0;
//     return (
//         <div className="relative pt-5 w-full container ">
//             {scrollPosition !== 0 && !isSmallScreen && (
//                 <RoundedBtns
//                     horizontal={"left-1"}
//                     onClick={() => {
//                         scrollDirection("left");
//                     }}
//                 >
//                     <FaAngleLeft />
//                 </RoundedBtns>
//             )}
//             <ul
//                 ref={catsRef}
//                 className={`flex whitespace-nowrap text-lg justify-between gap-x-20 text-grey overflow-auto md:overflow-x-hidden pb-5 mx-10 scroll-smooth`}
//                 id="list"
//             >
//                 {Object.keys(cats).map((e) => {
//                     return (
//                         <li key={e} className="group relative">
//                             <NavLink
//                                 to={"/cart"}
//                                 className={"hover:text-bluegreen duration-700"}
//                             >
//                                 {e}
//                             </NavLink>
//                             <span className="absolute w-0 h-[2px] -bottom-5 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
//                         </li>
//                     );
//                 })}
//             </ul>
//             {scrollPosition + containerWidth !== listWidth &&
//                 !isSmallScreen && (
//                     <RoundedBtns
//                         horizontal={"right-1"}
//                         onClick={() => {
//                             scrollDirection("right");
//                         }}
//                     >
//                         <FaAngleRight />
//                     </RoundedBtns>
//                 )}
//         </div>
//     );
// }

// function RoundedBtns({ horizontal, children }) {
//     return (
//         <button
//
//             className={`absolute top-[50%] z-20 translate-y-[-50%] ${horizontal} size-9 flex items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-lg cursor-pointer duration-300`}
//         >
//             {children}
//         </button>
//     );
// }
