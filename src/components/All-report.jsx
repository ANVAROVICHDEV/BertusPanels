
import { AllReportUI } from "../ui/index";


const AllReport = ({ mainReport }) => {
	return (
		<>
			<div className="flex justify-between text-center p-5 bg-white border-2 border-gray-300 shadow-lg rounded-xl">
				<table className="w-full space-y-3">
					<tbody>
						<AllReportUI
							title={"КИРИМ"}
							name={"Сендвич"}
							sum={mainReport?.total_money_sum_sandwich_incomes?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_sandwich_incomes?.toLocaleString()}
							locatioN={"/income_info/sandwich"}
						/>
						<AllReportUI
							title={"КИРИМ"}
							name={"Пена"}
							sum={mainReport?.total_money_sum_pena_incomes?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_pena_incomes?.toLocaleString()}
							locatioN={"/income_info/pena"}
						/>
						<AllReportUI
							title={"КИРИМ"}
							name={"Бошқалар"}
							sum={mainReport?.total_money_sum_other_incomes?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_other_incomes?.toLocaleString()}
							locatioN={"/income_info/other"}
						/>
						<AllReportUI
							title={"ЧИҚИМ"}
							name={"Одатий"}
							sum={mainReport?.total_money_sum_usual_expenses?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_usual_expenses?.toLocaleString()}
							locatioN={"/outcome_info/usual"}
						/>
						<AllReportUI
							title={"ЧИҚИМ"}
							name={"Йўл ҳаққи"}
							sum={mainReport?.total_money_sum_toll_expenses?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_toll_expenses?.toLocaleString()}
							locatioN={"/outcome_info/toll"}
						/>
						<AllReportUI
							title={"ЧИҚИМ"}
							name={"Озиқ Овқат"}
							sum={mainReport?.total_money_sum_food_expenses?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_food_expenses?.toLocaleString()}
							locatioN={"/outcome_info/food"}
						/>
						<AllReportUI
							title={"ЧИҚИМ"}
							name={"Бошқалар"}
							sum={mainReport?.total_money_sum_other_expenses?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_other_expenses?.toLocaleString()}
							locatioN={"/outcome_info/other"}
						/>
						<AllReportUI
							title={"ЧИҚИМ"}
							name={"Aванс"}
							sum={mainReport?.total_money_sum_advance_salaries?.toLocaleString()}
							dollar={mainReport?.total_money_dollar_advance_salaries?.toLocaleString()}
							locatioN={"/advance"}
						/>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AllReport;
