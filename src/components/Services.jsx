// import React from 'react';

// const Services = () => {
//   const services = [
//     {
//       image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80',
//       title: 'Wedding Photography',
//       description: 'Capture Your Special Moments'
//     },
//     {
//       image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=80',
//       title: 'Printing & Xerox',
//       description: 'Xerox, Lamination, Printing'
//     },
//     {
//       image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=80',
//       title: 'DTP & Design Works',
//       description: 'Brochures, Forms, Resume'
//     },
//     {
//       image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=80',
//       title: 'Cyber Services',
//       subtitle: '(Coming Soon)',
//       description: 'PAN, Online Forms, E-Governance'
//     }
//   ];

//   return (
//     <section className="bg-gradient-to-b from-orange-100 to-orange-50 py-16">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-3">
//             <div className="h-1 w-32 bg-orange-400 rounded"></div>
//             <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mx-6">
//               Our Services
//             </h2>
//             <div className="h-1 w-32 bg-orange-400 rounded"></div>
//           </div>
//           <p className="text-xl text-amber-800 font-medium">
//             Quality & Affordable Solutions
//           </p>
//         </div>

//         {/* Service Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => (
//             <div 
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100"
//             >
//               <div 
//                 className="h-56 bg-cover bg-center"
//                 style={{ backgroundImage: `url('${service.image}')` }}
//               ></div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-amber-900 mb-1">
//                   {service.title}
//                 </h3>
//                 {service.subtitle && (
//                   <p className="text-sm text-red-600 font-semibold mb-1">
//                     {service.subtitle}
//                   </p>
//                 )}
//                 <p className="text-sm text-amber-700">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;