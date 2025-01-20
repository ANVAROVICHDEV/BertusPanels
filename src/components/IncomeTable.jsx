import React from "react";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MoneyOperations from "../services/moneyOpeations";
import { setRefreshRenderData } from "../slices/renderPage";
import { Loader } from "../index";

const IncomeTable = ({ data, isLoading }) => {
	const dispatch = useDispatch();
	const typeMap = {
		sandwich: "Сендвич",
		pena: "Пена",
		other: "Бошқалар",
	};

	const deleteIncome = async (id) => {
		if (window.confirm("Сиз ростдан ҳам ушбу киримни ўчирмоқчимисиз?")) {
			try {
				await MoneyOperations.deleteIncome(id);
				toast.success("Амалиёт муваффақиятли амалга оширилди");
				dispatch(setRefreshRenderData());
			} catch (error) {
				console.error("Нимадир хато кетди, қайтадан уриниб кўринг.", error);
			}
		}
	};

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
		{
      isLoading ? <Loader /> : 	<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="ps-6 py-3">
            N
          </th>
          <th scope="col" className="px-6 py-3">
            Мижоз исми
          </th>
          <th scope="col" className="px-6 py-3">
            Маҳсулот
          </th>
          <th scope="col" className="px-6 py-3">
            Ўзбек сўми
          </th>
          <th scope="col" className="px-6 py-3">
            Долларда
          </th>
          <th scope="col" className="px-6 py-3">
            Изоҳ
          </th>
          <th scope="col" className="px-6 py-3">
            Сана
          </th>
          <th scope="col" className="px-6 py-3">
            Ўчириш
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr
            className="bg-white text-base dark:bg-gray-800 hover:bg-blue-200 hover:text-black dark:hover:bg-gray-600 text-center"
            key={index}
          >
            <th className="ps-6 py-4">{index + 1}</th>
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4">
              {typeMap[item.type] || "Noma'lum type"}
            </td>
            <td className="px-6 py-4">
              {item.currency === "sum"
                ? item.money?.toLocaleString("uz-UZ")
                : 0}
            </td>
            <td className="px-6 py-4">
              {item.currency === "dollar"
                ? item.money?.toLocaleString("uz-UZ")
                : 0}
            </td>
            <td className="px-6 py-4">
              {item.comment.length > 16
                ? item.comment.slice(0, 16) + "..."
                : item.comment}
            </td>
            <td className="px-6 py-4">
              {moment(item.dateTime).format("YYYY-MM-DD")}
            </td>
            <td className="px-6 py-4 flex justify-center">
              <MdDelete
                onClick={() => deleteIncome(item.id)}
                className="text-red-500 text-2xl cursor-pointer"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    }
		</div>
	);
};

export default IncomeTable;
