import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '@/config';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    imageUrl: '',
    fields: [],
  });
  const [editingService, setEditingService] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('No authentication token found');
          return;
        }

        const response = await fetch(`${config.apiUrl}/api/services`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        const servicesArray = Array.isArray(data) ? data : 
          (data.content ? data.content : 
          (data.services ? data.services : [data]));

        setServices(servicesArray);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error(`Failed to fetch services: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (!newService.name || newService.fields.length === 0) {
      toast.error('Please provide a service name and at least one field.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const response = await fetch(`${config.apiUrl}/api/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const addedService = await response.json();
      setServices([...services, addedService]);
      setNewService({ name: '', imageUrl: '', fields: [] });
      setIsAdding(false);
      toast.success('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error(`Failed to add service: ${error.message}`);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const response = await fetch(`${config.apiUrl}/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      setServices(services.filter((service) => service.id !== id));
      toast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error(`Failed to delete service: ${error.message}`);
    }
  };

  const handleUpdateService = async () => {
    if (!editingService.name || editingService.fields.length === 0) {
      toast.error('Please provide a service name and at least one field.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const response = await fetch(`${config.apiUrl}/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingService),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const updatedService = await response.json();
      setServices(services.map((service) => 
        service.id === updatedService.id ? updatedService : service
      ));
      setEditingService(null);
      toast.success('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error(`Failed to update service: ${error.message}`);
    }
  };

  const handleAddField = () => {
    setNewService((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        { name: '', label: '', type: 'text', options: [] },
      ],
    }));
  };

  const handleFieldChange = (index, key, value) => {
    setNewService((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[index][key] = value;
      return { ...prev, fields: updatedFields };
    });
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Services</h2>

      {/* List of Services */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="text-gray-500">No services found</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">{service.name}</p>
                <div className="">
                  <button
                    onClick={() => setEditingService(service)}
                    className="text-blue-500 p-2 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-500 p-2 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {service.imageUrl && (
                <img src={service.imageUrl} alt={service.name} className="w-24 h-24 object-cover mb-2" />
              )}
              <p className="text-gray-600">Times Bought: {service.timesBought || 0}</p>
              <div className="mt-2">
                <p className="text-md font-medium">Fields:</p>
                <ul className="list-disc list-inside">
                  {service.fields && service.fields.map((field, index) => (
                    <li key={index}>
                      {field.label} ({field.type})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Service Form */}
      <div className="mt-6">
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isAdding ? 'Cancel' : 'Add New Service'}
        </button>

        {isAdding && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Add New Service</h3>
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newService.imageUrl}
              onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <h4 className="font-medium">Fields:</h4>
            {newService.fields.map((field, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Field Name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <select
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="text">Text</option>
                  <option value="select">Select</option>
                </select>
                {field.type === 'select' && (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={field.options.join(',')}
                    onChange={(e) =>
                      handleFieldChange(index, 'options', e.target.value.split(','))
                    }
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>
            ))}
            <button
              onClick={handleAddField}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Add Field
            </button>
            <button
              onClick={handleAddService}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
            >
              Save Service
            </button>
          </div>
        )}
      </div>

      {/* Edit Service Form */}
      {editingService && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Edit Service</h3>
          <input
            type="text"
            placeholder="Service Name"
            value={editingService.name}
            onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editingService.imageUrl}
            onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <h4 className="font-medium">Fields:</h4>
          {editingService.fields.map((field, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => {
                  const updatedFields = [...editingService.fields];
                  updatedFields[index].name = e.target.value;
                  setEditingService({ ...editingService, fields: updatedFields });
                }}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => {
                  const updatedFields = [...editingService.fields];
                  updatedFields[index].label = e.target.value;
                  setEditingService({ ...editingService, fields: updatedFields });
                }}
                className="w-full p-2 border rounded mb-2"
              />
              <select
                value={field.type}
                onChange={(e) => {
                  const updatedFields = [...editingService.fields];
                  updatedFields[index].type = e.target.value;
                  setEditingService({ ...editingService, fields: updatedFields });
                }}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="text">Text</option>
                <option value="select">Select</option>
              </select>
              {field.type === 'select' && (
                <input
                  type="text"
                  placeholder="Options (comma-separated)"
                  value={field.options.join(',')}
                  onChange={(e) => {
                    const updatedFields = [...editingService.fields];
                    updatedFields[index].options = e.target.value.split(',');
                    setEditingService({ ...editingService, fields: updatedFields });
                  }}
                  className="w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
          <button
            onClick={() => setEditingService({ ...editingService, fields: [...editingService.fields, { name: '', label: '', type: 'text', options: [] }] })}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Add Field
          </button>
          <button
            onClick={handleUpdateService}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-5"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingService(null)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;



























// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import config from '@/config';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [newService, setNewService] = useState({
//     name: '',
//     fields: [],
//   });
//   const [isAdding, setIsAdding] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           toast.error('No authentication token found');
//           return;
//         }

//         const response = await fetch(`${config.apiUrl}/api/services`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//         }

//         const data = await response.json();
        
//         // Ensure data is an array
//         const servicesArray = Array.isArray(data) ? data : 
//           (data.content ? data.content : 
//           (data.services ? data.services : [data]));

//         setServices(servicesArray);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//         toast.error(`Failed to fetch services: ${error.message}`);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleAddService = async () => {
//     if (!newService.name || newService.fields.length === 0) {
//       toast.error('Please provide a service name and at least one field.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('No authentication token found');
//         return;
//       }

//       const response = await fetch(`${config.apiUrl}/api/services`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newService),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }

//       const addedService = await response.json();
//       setServices([...services, addedService]);
//       setNewService({ name: '', fields: [] });
//       setIsAdding(false);
//       toast.success('Service added successfully!');
//     } catch (error) {
//       console.error('Error adding service:', error);
//       toast.error(`Failed to add service: ${error.message}`);
//     }
//   };

//   const handleDeleteService = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         toast.error('No authentication token found');
//         return;
//       }

//       const response = await fetch(`${config.apiUrl}/api/services/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//       }

//       setServices(services.filter((service) => service.id !== id));
//       toast.success('Service deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting service:', error);
//       toast.error(`Failed to delete service: ${error.message}`);
//     }
//   };

//   const handleAddField = () => {
//     setNewService((prev) => ({
//       ...prev,
//       fields: [
//         ...prev.fields,
//         { name: '', label: '', type: 'text', options: [] },
//       ],
//     }));
//   };

//   const handleFieldChange = (index, key, value) => {
//     setNewService((prev) => {
//       const updatedFields = [...prev.fields];
//       updatedFields[index][key] = value;
//       return { ...prev, fields: updatedFields };
//     });
//   };

//   if (loading) {
//     return <div>Loading services...</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">Services</h2>

//       {/* List of Services */}
//       <div className="space-y-4">
//         {services.length === 0 ? (
//           <p className="text-gray-500">No services found</p>
//         ) : (
//           services.map((service) => (
//             <div key={service.id} className="p-4 border rounded-lg">
//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-semibold">{service.name}</p>
//                 <button
//                   onClick={() => handleDeleteService(service.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//               <p className="text-gray-600">Times Bought: {service.timesBought || 0}</p>
//               <div className="mt-2">
//                 <p className="text-md font-medium">Fields:</p>
//                 <ul className="list-disc list-inside">
//                   {service.fields && service.fields.map((field, index) => (
//                     <li key={index}>
//                       {field.label} ({field.type})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add New Service Form */}
//       <div className="mt-6">
//         <button
//           onClick={() => setIsAdding(!isAdding)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           {isAdding ? 'Cancel' : 'Add New Service'}
//         </button>

//         {isAdding && (
//           <div className="mt-4 p-4 border rounded-lg">
//             <h3 className="text-lg font-semibold mb-2">Add New Service</h3>
//             <input
//               type="text"
//               placeholder="Service Name"
//               value={newService.name}
//               onChange={(e) => setNewService({ ...newService, name: e.target.value })}
//               className="w-full p-2 border rounded mb-4"
//             />
//             <h4 className="font-medium">Fields:</h4>
//             {newService.fields.map((field, index) => (
//               <div key={index} className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Field Name"
//                   value={field.name}
//                   onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
//                   className="w-full p-2 border rounded mb-2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Field Label"
//                   value={field.label}
//                   onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
//                   className="w-full p-2 border rounded mb-2"
//                 />
//                 <select
//                   value={field.type}
//                   onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
//                   className="w-full p-2 border rounded mb-2"
//                 >
//                   <option value="text">Text</option>
//                   <option value="select">Select</option>
//                 </select>
//                 {field.type === 'select' && (
//                   <input
//                     type="text"
//                     placeholder="Options (comma-separated)"
//                     value={field.options.join(',')}
//                     onChange={(e) =>
//                       handleFieldChange(index, 'options', e.target.value.split(','))
//                     }
//                     className="w-full p-2 border rounded"
//                   />
//                 )}
//               </div>
//             ))}
//             <button
//               onClick={handleAddField}
//               className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
//             >
//               Add Field
//             </button>
//             <button
//               onClick={handleAddService}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
//             >
//               Save Service
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


