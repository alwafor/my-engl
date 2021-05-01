import { NavLink } from "react-router-dom"

interface NavbarProps {
   
}

const Navbar: React.FC<NavbarProps> = () => {
   return <div className="main_navbar">
      <nav className="nav">
         <div className="nav_item">
            <NavLink to="/">Случайные слова</NavLink>
         </div>
         <div className="nav_item">
            <NavLink to="/addWords">Добавить слова</NavLink>
         </div>
         <div className="nav_head">
            MyEngl
         </div>
         <div className="nav_item">
            <NavLink to="/dictionaries">Словари</NavLink>
         </div>
         <div className="nav_item">
            <NavLink to="/">Go</NavLink>
         </div>
      </nav>
   </div>;
};

export default Navbar;
