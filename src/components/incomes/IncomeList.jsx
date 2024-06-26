import styles from "./IncomeList.module.css";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(amount);
}

function IncomeList({ incomes, handleDeleteIncome }) {
  return (
    <div className={styles.incomeitem}>
      {incomes &&
        incomes.map((income, index) => (
          <div key={index} className={styles.incomelist}>
            <div className={styles.income}>
              <div>
                Income Amount:{" "}
                <span className={styles.incamount}>
                  {formatAmount(income.transactionAmount)}
                </span>
              </div>
              <div>
                Category:{" "}
                <span className={styles.catagory}>{income.categoryName}</span>
              </div>
              <div className={styles.description}>
                Description:
                <div className={styles.wraptext}>{income.description}</div>
              </div>
            </div>
            <div>
              <span
                className={styles.deletebtn}
                onClick={() => handleDeleteIncome(index)}
              >
                X
              </span>
              <div className={styles.date}>Date: {income.date}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default IncomeList;
