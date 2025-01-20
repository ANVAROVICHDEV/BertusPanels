import { useEffect, useState } from "react";
import { ICONS } from "../constants/images";
import WorkerOpeations from "../services/workerOperations";
import { toast } from "react-toastify";

function WorkerEdit({ setShowUpdate, id , restRender, setRestRender}) {
  const [name, setname] = useState("");
  const [workdays, setworkdays] = useState("");
  const [fixed, setfixed] = useState("");
  const [part, setpart] = useState("");
  const [balance, setBalance] = useState("");

  const updateWorker = async () => {
    try {
      // Format fixed va balance qiymatlarini faqat raqamlar bilan
      const formattedFixed = (fixed || "").toString().replace(/\D/g, "");  // faqat raqamlar
      const formattedBalance = (balance || "").toString().replace(/\D/g, "");  // faqat raqamlar

      const response = await WorkerOpeations.updateWorker({
        id,
        name,
        workdays,
        formattedFixed,
        part,
        formattedBalance
      });
	  setRestRender(!restRender)
      toast.success("Ҳодим маълумотлари муваффақиятли янгиланди!");
    } catch (error) {
      console.error("Update worker error:", error);
      toast.error("Маълумотларни янгилашда хатолик юз берди.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !workdays || !fixed || !part || !balance) {
      alert("Барча майдонларни тўлдиринг!");
      return;
    }
    updateWorker();
    setShowUpdate(false);
  };

  useEffect(() => {
    const fetchWorkerData = async () => {
      const response = await WorkerOpeations.oneWorkers(id);
      const worker = response.data[0];
      setname(worker.name || "");
      setworkdays(worker.workdays || "");
      setfixed(worker.fixed || "");
      setpart(worker.part || "");
      setBalance(worker.balance || "");
    };
    fetchWorkerData();
  }, [id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-4/5 max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            Ҳодим Маълумотларини ўзгартириш
          </h3>
          <button
            onClick={() => setShowUpdate(false)}
            className="ml-auto bg-gray-300 p-2 rounded-lg flex items-center justify-center"
          >
            <img src={ICONS.EXITMODAL} alt="Close" className="w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h4 className="text-sm font-medium">Ҳодим тури</h4>
              <select
                value={part}
                onChange={(e) => setpart(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50"
              >
                <option value="office">Офис</option>
                <option value="sandwich">Сендвич</option>
                <option value="peno_cutting">Пенопласт кесиш</option>
                <option value="peno_making">Пенопласт ясаш</option>
                <option value="other">Бошқа</option>
              </select>
            </div>
            <div>
              <h4 className="text-sm font-medium">Исм Фамиляси</h4>
              <input
                type="text"
                required
                placeholder="Исм фамиляси"
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={name}
                onChange={(e) => setname(e.target.value)}
                maxLength={50}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium">Фикса ойлик</h4>
              <input
                type="text"
                required
                placeholder="Фикса ойлик"
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={(e) => {
                  // Raqamlarni to'plab, bo'sh joylarni olib tashlash
                  const formattedValue = e.target.value
                    .replace(/\D/g, "") // Faqat raqamlarni qabul qiladi
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Bo'sh joy bilan formatlash
                  setfixed(formattedValue);
                }}
                maxLength={12} // maksimal uzunlikni cheklash
              />
            </div>

            <div>
              <h4 className="text-sm font-medium">Баланси</h4>
              <input
                required
                placeholder="Баланси"
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                onChange={(e) =>
                  setBalance(e.target.value.toString().replaceAll(" ", ""))
                }
                maxLength={12}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium">Бу ой ишлади</h4>
              <input
                required
                placeholder="Бу ой ишлади"
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={workdays}
                onChange={(e) => setworkdays(e.target.value)}
                maxLength={3}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Янгилаш
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkerEdit;
