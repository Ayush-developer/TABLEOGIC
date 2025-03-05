import React, { useState, useEffect } from 'react';

const OrderForm = () => {
  const [tableId, setTableId] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');

  // Fetch menu items from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  // Handle item selection
  const handleItemSelect = (item) => {
    const existingItem = selectedItems.find(selected => selected._id === item._id);
    if (existingItem) {
      // Increase quantity if item already selected
      const updatedItems = selectedItems.map(selected =>
        selected._id === item._id
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected
      );
      setSelectedItems(updatedItems);
    } else {
      // Add new item with quantity 1
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
    // Update total amount
    setTotalAmount(totalAmount + item.price);
  };

  // Handle order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tableId || selectedItems.length === 0) {
      setError('Please select at least one item and provide a table ID.');
      return;
    }

    const order = {
      tableId,
      items: selectedItems,
      totalAmount,
    };

    // Send order to the backend
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(data => {
        alert('Order placed successfully!');
        setTableId('');
        setSelectedItems([]);
        setTotalAmount(0);
        setError('');
      })
      .catch(error => {
        console.error('Error placing order:', error);
        setError('Failed to place order. Please try again.');
      });
  };

  return (
    <div>
      <h1>Place an Order</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Table ID:
          <input
            type="text"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          />
        </label>
        <br />
        <h2>Menu</h2>
        <ul>
          {menuItems.map(item => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              {/* <img src={item.image} alt={item.name} width="100" /> */}
              <button type="button" onClick={() => handleItemSelect(item)}>
                Add to Order
              </button>
            </li>
          ))}
        </ul>
        <h2>Selected Items</h2>
        <ul>
          {selectedItems.map(item => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <h3>Total Amount: ${totalAmount}</h3>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;