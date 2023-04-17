import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "../../../data/expenses.server";
import { redirect } from "@remix-run/node";
// import { getExpense } from "../../../data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader ({params}){
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId)
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  if (request.method === "PATCH") {
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  }
  else {
    await deleteExpense(expenseId);
    return redirect("/expenses");
  }
}

