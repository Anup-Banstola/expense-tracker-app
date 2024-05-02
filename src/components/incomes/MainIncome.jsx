import { useState, useEffect } from "react";
import styles from "./MainIncome.module.css";
import AddIncomePopup from "./AddIncomePopup";
import IncomeList from "./IncomeList";

const BASE_URL = "http://localhost:9000";

function MainIncome() {
  const [showPopup, setShowPopup] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const incomesResponse = await fetch(`${BASE_URL}/incomes`);
        const incomesData = await incomesResponse.json();
        setIncomes(incomesData);
        console.log(incomesData);
      } catch (error) {
        console.log("Error fetching income data:", error);
      }
    };
    fetchIncomeData();
  }, []);

  function handleAddIncome(newIncome) {
    const amount = parseFloat(newIncome.transactionAmount);
    if (isNaN(amount)) {
      console.log("hello");
      alert("Invalid amount. Please enter a valid number.");
      return;
    }
    setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
    setShowPopup(false);
  }

  const handleDeleteIncome = async (index) => {
    try {
      const deletedIncome = incomes[index];
      const response = await fetch(`${BASE_URL}/incomes/${deletedIncome.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete income.");
      }
      const updatedIncomes = incomes.filter((income, id) => id !== index);
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.incomeheader}>
          <h2>Incomes</h2>

          <button className={styles.addincome} onClick={togglePopup}>
            Add Income
          </button>
        </header>
        <main className={styles.main}>
          {showPopup && (
            <AddIncomePopup
              onAddIncome={handleAddIncome}
              onClose={togglePopup}
            />
          )}
          <IncomeList
            incomes={incomes}
            handleDeleteIncome={handleDeleteIncome}
          />
        </main>
      </div>
    </>
  );
}

export default MainIncome;
