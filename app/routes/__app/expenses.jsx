import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaPlus, FaDownload } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "../../data/expenses.server";
import { requireUserSession } from "../../data/auth.server";

export default function ExpensesPage() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Download Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && <section id="no-expenses">
          <h1>No expenses found</h1>
          <p>Start <Link to='add'> adding some</Link> today</p>
          </section>}
      </main>
    </>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request);
  const expenses = getExpenses(userId);
  return expenses;

  // if (!expenses || (await expenses).length === 0) {
  //   throw json(
  //     { message: "Could not find any Expense" },
  //     { status: 404, statusText: "No expenses found" }
  //   );
  // }
}

// export function CatchBoundary() {
//   return(
//     <p></p>
//   )

