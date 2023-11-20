import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
import WinningsPopover from './WinningsPopover';

const ContestManager = () => {
  const [contests, setContests] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setloading] = useState(true)
  const [winnings, setwinnings] = useState({ from: 0, to: 0, amount: 0 })
  const [totalWinning, settotalWinning] = useState([])
  const [showPopover, setShowPopover] = useState(false); // State to control popover visibility
  const [popoverData, setPopoverData] = useState([]); // State to store popover data


  useEffect(() => {
    // Fetch contests from the API
    axios.get(END_POINTS.contest)
      .then(response => setContests(response.data.result))
      .catch(error => console.error(error));
  }, []);

  const winningAdd = (e) => {
    const { name, value } = e.target
    setwinnings((prev) => ({ ...prev, [name]: value }))
    console.log(e.target.name);
  }
  const addContest = (e) => {
    e.preventDefault();

    // Send a POST request to add a new contest
    axios.post(END_POINTS.contest, { name, price, date, time, winnings: totalWinning })
      .then(response => {
        setContests([...contests, response.data]);
        setName('');
        setPrice('');
        setDate('');
        setTime('');
      })
      .catch(error => console.error(error));
  };

  const handleWinningsClick = (winnings) => {
    setPopoverData(winnings); // Set popover data
    setShowPopover(true); // Show popover
  };

  const handleClosePopover = () => {
    setShowPopover(false); // Hide popover
  };

  const addWinning = () => {
    settotalWinning([...totalWinning, winnings])
    console.log(totalWinning);
  }
  const deleteContest = (id) => {
    console.log(id);
    // Send a DELETE request to remove a contest
    axios.delete(`${END_POINTS.contest}/${id}`)
      .then(response => {
        const updatedContests = contests.filter(contest => contest._id !== id);
        setContests(updatedContests);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="contest-manager">
      <form onSubmit={addContest}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div >
          <br />
          <label>Winnings:</label>
          <br />
          <div style={{ display: 'flex' }}>

            <label>from:</label>
            <input type="number" placeholder='from' value={winnings.from} name='from' onChange={(e) => winningAdd(e)} />
            <br />
            <label>to:</label>
            <br />
            <input type="number" placeholder='to' value={winnings.to} name='to' onChange={(e) => winningAdd(e)} />
            <br />
            <br />
            <label>amount:</label>
            <input type="number" placeholder='amount' value={winnings.amount} name='amount' onChange={(e) => winningAdd(e)} />
            <button onClick={addWinning}>Add Winning</button>
          </div>
            <WinningsPopover
              winningsData={totalWinning}
            />
        </div>
        <button type="submit">Add Contest</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
            <th>Winnings</th>
          </tr>
        </thead>
        <tbody>
          {
            contests.length ?
              contests?.map((contest) => (
                <tr key={contest._id}>
                  <td>{contest.name}</td>
                  <td>{contest.price}</td>
                  <td>{contest.date}</td>
                  <td>{contest.time}</td>
                  <td>
                    <button onClick={() => deleteContest(contest._id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleWinningsClick(contest.winnings)}>Winnings</button>
                    {showPopover && (
                      <WinningsPopover
                        winningsData={contest.winnings}
                        onClose={handleClosePopover}
                      />
                    )}
                  </td>
                </tr>
              )) : ""}
        </tbody>
      </table>

    </div>
  );
};

export default ContestManager;
