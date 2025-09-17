import React from 'react';
import { Building2, Users, Wrench, FileText, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);

  const menuItems = [
    { icon: Building2, label: 'Services', path: '/services' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Wrench, label: 'Equipment', path: '/equipment' },
    { icon: FileText, label: 'Procedures', path: '/procedures' },
    { icon: FileText, label: 'Resultat', path: '/Resultat' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        <h1 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>Admin Portal</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-700 rounded">
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-4 hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;