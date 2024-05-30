import Link from "next/link";

//Common DropDwon Menu
// interface MenuPropType {
//     menu: {path: String, label: string}[]
//     visible: Boolean
// }
const Dropdown = (props) => {
  const { menu, visible } = props;

  return (
    <div
      id="dropdownHover"
      className={`z-10 mt-12 right-4 ${
        !visible ? "hidden" : ""
      } bg-[#434343] bg-opacity-[36%]  divide-y divide-gray-100 rounded-lg shadow w-44 backdrop-blur dark:bg-gray-700 absolute`}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200 text-[13px]"
        aria-labelledby="dropdownHoverButton"
      >
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path}
              className="block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
