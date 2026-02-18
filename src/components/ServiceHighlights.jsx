// import React from 'react';

// const ServiceHighlights = () => {
//   const highlights = [
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
//           <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12z"/>
//         </svg>
//       ),
//       title: 'Photo Studio',
//       description: 'Photography & Passport Photos'
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
//         </svg>
//       ),
//       title: 'Wedding Cards',
//       description: 'Beautiful Invitations & Prints'
//     },
//     {
//       icon: (
//         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
//         </svg>
//       ),
//       title: 'Xerox DTP Services',
//       description: 'Xerox, Printing & Designing'
//     }
//   ];

//   return (
//     <section className="bg-gradient-to-b from-orange-50 to-orange-100 py-1">
//       <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {highlights.map((item, index) => (
//             <div 
//               key={index}
//               className="bg-gradient-to-br from-orange-100 via-amber-100 to-orange-100 p-6 rounded-xl shadow-xl border-2 border-orange-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="bg-white p-4 rounded-full shadow-md text-amber-900">
//                   {item.icon}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-amber-900 mb-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-amber-800 font-medium">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceHighlights;