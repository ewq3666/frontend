import React from 'react';

const WinningsPopover = ({ winningsData, onClose }) => {
    console.log(winningsData);
  return (
    <div className="popover">
      <div className="popover-content">
        <button onClick={onClose}>Close</button>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {winningsData?.map((item, index) => (
              <tr key={index}>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningsPopover;
