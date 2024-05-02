import { useEffect, useState } from "react";
import styles from "./MainExpense.module.css";
import AddExpensePopup from "./AddExpensePopup";
import ExpenseList from "./ExpenseList";

const BASE_URL = "http://localhost:9000";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function MainExpense() {
  const [showPopup, setShowPopup] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const [accountBalance, setAccountBalance] = useState();

  useEffect(function () {
    async function fetchData() {
      try {
        const expensesResponse = await fetch(`${BASE_URL}/expenses`);
        const expensesData = await expensesResponse.json();
        console.log(expensesData);

        setExpenses(expensesData);

        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();
        console.log(incomesData);

        const totalExpenses = expensesData.reduce(
          (total, expense) => total + parseFloat(expense.transactionAmount),
          0
        );

        const totalIncomes = incomesData.reduce(
          (total, income) => total + parseFloat(income.transactionAmount),
          0
        );

        setAccountBalance(totalIncomes - totalExpenses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const togglePopup = () => setShowPopup(!showPopup);

  function handleAddExpense(newExpense) {
    const amount = parseFloat(newExpense.transactionAmount);
    if (isNaN(amount)) {
      alert("Invalid amount. Please enter a valid number.");
      return;
    }
    // if (accountBalance >= amount) {
    //   fetch(`${BASE_URL}/expenses`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newExpense),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Failed to add expense to the server.");
    //       }
    //       setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    //       const newBalance = accountBalance - amount;
    //       setAccountBalance(newBalance);
    //       setShowPopup(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error adding expense to the server", error);
    //     });
    // } else {
    //   alert("Insufficient balance to add this expense.");
    //   setShowPopup(false);
    // }

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    const newBalance = accountBalance - amount;
    setAccountBalance(newBalance);
    setShowPopup(false);
  }

  const handleDeleteExpense = async (index) => {
    try {
      const deletedExpense = expenses[index];
      const response = await fetch(
        `${BASE_URL}/expenses/${deletedExpense.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }

      const deletedAmount = parseFloat(deletedExpense.transactionAmount);
      const updatedExpenses = expenses.filter((_, id) => id !== index);
      setExpenses(updatedExpenses);

      const newBalance = accountBalance + deletedAmount;
      setAccountBalance(newBalance);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.expenseheader}>
          <h2>Expenses</h2>

          <button onClick={togglePopup} className={styles.addexpense}>
            Add new expense
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && (
            <AddExpensePopup
              onClose={togglePopup}
              onAddExpense={handleAddExpense}
            />
          )}
          <ExpenseList
            expenses={expenses}
            handleDeleteExpense={handleDeleteExpense}
          />

          <div className={styles.balance}>
            Current Balance:{formatAmount(accountBalance)}
          </div>
        </main>
      </div>
    </>
  );
}

export default MainExpense;
