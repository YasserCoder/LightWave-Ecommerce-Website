import MenuItems from "./MenuItems";

function SideBar({ cats }) {
    return (
        <ul
            className="bg-secondary h-fit sticky top-4 rounded-lg p-2 w-auto min-w-72 shadow-md font-medium"
            data-testid="sidebar"
        >
            <MenuItems categories={cats} />
        </ul>
    );
}

export default SideBar;
