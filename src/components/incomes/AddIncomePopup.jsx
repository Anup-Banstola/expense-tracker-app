import { useState } from "react";
import styles from "./AddIncomePopup.module.css";

const BASE_URL = "http://localhost:9000";

function AddIncomePopup({ onClose, onAddIncome }) {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIncome = { transactionAmount, categoryName, date, description };

    try {
      const response = await fetch(`${BASE_URL}/incomes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      });
      if (!response.ok) {
        throw new Error("Failed to add income.");
      }
      onAddIncome(newIncome);
      setTransactionAmount("");
      setCategoryName("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.amount}>
            <label htmlFor="amount">Income Amount: </label>
            <input
              type="text"
              placeholder="Income Amount"
              id="amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className={styles.incomefield}
            />
          </div>
          <div className={styles.selectcategory}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={styles.inputfield}
              required
            >
              <option value="">Select a category</option>
              <option value="salary">Salary</option>
              <option value="rent">Rent</option>
              <option value="bankaccount">Bank account</option>
              <option value="gift">Gift</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className={styles.date}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.inputfield}
              required
            />
          </div>
          <div className={styles.description}>
            <label htmlFor="description">Add description:</label>
            <input
              id="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.descriptionfield}
              required
            />
          </div>

          <button type="submit" className={styles.save}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddIncomePopup;
