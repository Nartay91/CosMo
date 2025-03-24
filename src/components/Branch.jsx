// import { useBranchStore } from '../store/useBranchStore';
// import { useEffect } from 'react';

// const BranchesList = () => {
//   const { branches, fetchBranches, deleteBranch } = useBranchStore();

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   return (
//     <div>
//       <h2>Список филиалов</h2>
//       <ul>
//         {branches.map((branch) => (
//           <li key={branch.id}>
//             {branch.title} - {branch.address}
//             <button onClick={() => deleteBranch([branch.id])}>Удалить</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BranchesList;
