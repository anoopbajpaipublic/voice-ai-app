import { useLocation, useNavigate } from "react-router-dom";

const NavTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'home', path: '/' },
    { label: 'products', path: '/products' },
    { label: 'contact', path: '/contact' }
  ];

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      {tabs.map(tab => (
        <button
          key={tab.label}
          onClick={() => navigate(tab.path)}
          style={{
            padding: '10px 20px',
            margin: '0 5px',
            background: location.pathname === tab.path ? '#1976d2' : '#f5f5f5',
            color: location.pathname === tab.path ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textTransform: 'capitalize'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;
