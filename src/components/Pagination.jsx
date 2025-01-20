import React from "react";

const Pagination = ({handlePageChange, totalPages, currentPage}) => {
	return (
		<nav aria-label="Page navigation ">
			<ul className="inline-flex -space-x-px text-base h-10">
				{/* Previous Button */}
				<li>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-blue-500 text-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
					>
						Previous
					</button>
				</li>

				{/* Page numbers */}
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<li key={page}>
						<button
							onClick={() => handlePageChange(page)}
							className={`flex items-center justify-center px-4 h-10 leading-tight ${
								page === currentPage
									? "text-blue-600 bg-blue-200 border border-gray-300"
									: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							}`}
						>
							{page}
						</button>
					</li>
				))}

				{/* Next Button */}
				<li>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="flex items-center justify-center px-4 h-10 leading-tight  bg-blue-500 text-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
