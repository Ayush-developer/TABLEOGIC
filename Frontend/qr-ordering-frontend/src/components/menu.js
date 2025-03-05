import React, { useEffect, useState } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the backend
    fetch('http://localhost:5000/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Menu</h1>
     
    </div>
  );
};

export default Menu;