const Table = () => {
  return (
    <table className="w-full border-collapse border border-border dark:border-gray-600">
      <thead>
        <tr className="bg-bg-card dark:bg-gray-800">
          <th className="border border-border dark:border-gray-600 px-4 py-2 text-left text-text-primary dark:text-white font-semibold">Nombre</th>
          <th className="border border-border dark:border-gray-600 px-4 py-2 text-left text-text-primary dark:text-white font-semibold">Apellido</th>
          <th className="border border-border dark:border-gray-600 px-4 py-2 text-left text-text-primary dark:text-white font-semibold">Edad</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-bg-main dark:bg-gray-900 hover:bg-bg-elevated dark:hover:bg-gray-700">
          <td className="border border-border dark:border-gray-600 px-4 py-2 text-text-primary dark:text-gray-200">John</td>
          <td className="border border-border dark:border-gray-600 px-4 py-2 text-text-primary dark:text-gray-200">Doe</td>
          <td className="border border-border dark:border-gray-600 px-4 py-2 text-text-primary dark:text-gray-200">30</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table