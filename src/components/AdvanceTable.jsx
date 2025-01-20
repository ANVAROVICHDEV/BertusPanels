import moment from "moment";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const AdvanceTable = () => {
  const { mainReport } = useSelector(
		(state) => state.date,
	);

  const typeMap = {
		anvance: "Aванс",
	};

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="ps-6 py-3">N</th>
            <th scope="col" className="px-6 py-3">Мижоз исми</th>
            {/* <th scope="col" className="px-6 py-3">Бўлим</th> */}
            <th scope="col" className="px-6 py-3">Ўзбек сўми</th>
            <th scope="col" className="px-6 py-3">Изоҳ</th>
            <th>Sana</th>
            {/* <th scope="col" className="px-6 py-3 text-center">Ўчириш</th> */}
          </tr>
        </thead>
        <tbody>
          {mainReport?.salaries?.map((item, index) => (
            <tr
              key={index}
              className="text-center text-base bg-white dark:bg-gray-800 hover:bg-blue-200 hover:text-black dark:hover:bg-gray-600"
            >
              
              <td className="ps-6 py-4 font-bold">{index + 1}</td>
              <td className="px-6 py-4">{item?.worker_name}</td>
              {/* <td className="px-6 py-4">{typeMap[item?.type]}</td> */}
              <td className="px-6 py-4">{item?.amount?.toLocaleString()}</td>
              <td className="px-6 py-4">{item?.comment}</td>
              <td className="px-6 py-4"> {moment(item?.datetime).format("YYYY-MM-DD")}</td>
             
              {/* <td className="px-6 py-4 flex justify-center">
                <MdDelete className="text-red-500 text-2xl cursor-pointer" />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvanceTable;
