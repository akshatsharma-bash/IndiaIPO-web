import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";

interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
}

const ManageBankerCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/banker-subcategories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editForm.name || !editForm.type) {
      alert("Name and Type are required");
      return;
    }

    try {
      if (isEditing) {
        await fetch(`/api/banker-subcategories/${isEditing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        });
      } else {
        await fetch("/api/banker-subcategories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        });
      }
      setIsEditing(null);
      setIsCreating(false);
      setEditForm({});
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`/api/banker-subcategories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manage Banker Subcategories</h2>
          <p className="text-gray-500 text-sm">Add or edit subcategories for SME and Mainboard bankers.</p>
        </div>
        {!isCreating && !isEditing && (
          <Button onClick={() => { setIsCreating(true); setEditForm({ type: 'sme', status: 'active' }); }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add Subcategory
          </Button>
        )}
      </div>

      {(isCreating || isEditing !== null) && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Subcategory Name</label>
            <input
              type="text"
              value={editForm.name || ""}
              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="e.g. Compare SME Merchant Bankers"
            />
          </div>
          <div className="w-48">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
            <select
              value={editForm.type || "sme"}
              onChange={e => setEditForm({ ...editForm, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
            >
              <option value="sme">SME</option>
              <option value="mainboard">Mainboard</option>
            </select>
          </div>
          <div className="w-32">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
            <select
              value={editForm.status || "active"}
              onChange={e => setEditForm({ ...editForm, status: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button onClick={() => { setIsCreating(false); setIsEditing(null); }} variant="outline">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="py-3 px-4 font-semibold text-sm text-gray-600">ID</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-600">Type</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="py-3 px-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50/50">
                <td className="py-3 px-4 text-sm text-gray-500">#{cat.id}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{cat.name}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">{cat.slug}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${cat.type === 'sme' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {cat.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${cat.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {cat.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setIsEditing(cat.id); setEditForm(cat); setIsCreating(false); }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No subcategories found. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ManageBankerCategories;
