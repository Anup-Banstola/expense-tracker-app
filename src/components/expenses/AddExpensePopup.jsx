import { useState, useEffect } from "react";
import styles from "./AddExpensePopup.module.css";

const BASE_URL = "http://localhost:9000";

function AddExpensePopup({ onClose, onAddExpense }) {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const newExpense = { transactionAmount, categoryName, date, description };
    try {
      const response = await fetch(`${BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense.");
      }

      onAddExpense(newExpense);

      setTransactionAmount("");
      setCategoryName("");
      setDate("");
      setDescription("");

      onClose();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.amount}>
            <label htmlFor="amount">Transaction Amount:</label>

            <input
              type="int"
              placeholder="Transaction Amount"
              id="amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className={styles.expensefield}
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
              <option value="food">Food</option>
              <option value="rent">Rent</option>
              <option value="education">Education</option>
              <option value="medicine">Medicine</option>
              <option value="grocery">Grocery</option>
              <option value="entertainment">Entertainment</option>
              <option value="clothing">Clothing</option>
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
              type="text"
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

export default AddExpensePopup;
