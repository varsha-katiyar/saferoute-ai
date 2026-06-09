import React, { useState } from "react";
import { useContacts } from "../hooks/useContacts";

const RELATIONS = ["Mother", "Father", "Sister", "Brother", "Friend", "Partner", "Guardian", "Other"];

const EMPTY_FORM = { name: "", phone: "", relation: "Friend" };

function ContactForm({ initial = EMPTY_FORM, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = () => {
    if (!form.name.trim()) { setError("Please enter a name."); return; }
    if (!form.phone.trim()) { setError("Please enter a phone number."); return; }
    if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim())) {
      setError("Enter a valid phone number (7–15 digits).");
      return;
    }
    setError("");
    onSave({ name: form.name.trim(), phone: form.phone.trim(), relation: form.relation });
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-3">
      {error && (
        <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-center gap-1.5">
          ⚠️ {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Mom"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">Relation</label>
          <select
            value={form.relation}
            onChange={(e) => set("relation", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-purple-400 bg-white"
          >
            {RELATIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">Phone number *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📞</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSave}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Save Contact
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const RELATION_ICONS = {
  Mother: "👩", Father: "👨", Sister: "👧", Brother: "👦",
  Friend: "🤝", Partner: "💑", Guardian: "🛡️", Other: "👤",
};

export default function TrustedContacts() {
  const { contacts, addContact, updateContact, deleteContact, MAX_CONTACTS } = useContacts();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [addError, setAddError] = useState("");

  const handleAdd = (data) => {
    try {
      addContact(data);
      setAdding(false);
      setAddError("");
    } catch (e) {
      setAddError(e.message);
    }
  };

  const handleUpdate = (id, data) => {
    updateContact(id, data);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteContact(id);
    setConfirmDelete(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-base">👥</div>
        <div>
          <h2 className="text-base font-bold text-gray-800">Trusted Contacts</h2>
          <p className="text-xs text-gray-400">Up to {MAX_CONTACTS} contacts · Used in SOS & Emergency alerts</p>
        </div>
        <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${
          contacts.length >= MAX_CONTACTS ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-700"
        }`}>
          {contacts.length}/{MAX_CONTACTS}
        </span>
      </div>

      {/* Contact list */}
      <div className="space-y-3 mb-4">
        {contacts.length === 0 && !adding && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-gray-500 text-sm font-medium">No contacts added yet</p>
            <p className="text-gray-400 text-xs mt-1">Add up to 3 trusted contacts for emergency alerts</p>
          </div>
        )}

        {contacts.map((c) =>
          editingId === c.id ? (
            <ContactForm
              key={c.id}
              initial={{ name: c.name, phone: c.phone, relation: c.relation }}
              onSave={(data) => handleUpdate(c.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={c.id}
              className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl p-3.5 group hover:border-purple-200 hover:shadow-sm transition-all"
            >
              {/* Avatar */}
              <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {RELATION_ICONS[c.relation] || "👤"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    {c.relation}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <span>📞</span> {c.phone}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={`tel:${c.phone}`}
                  className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl flex items-center justify-center text-sm transition-colors"
                  title={`Call ${c.name}`}
                >
                  📞
                </a>
                <button
                  onClick={() => setEditingId(c.id)}
                  className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl flex items-center justify-center text-sm transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setConfirmDelete(c.id)}
                  className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl flex items-center justify-center text-sm transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        )}

        {/* Delete confirmation */}
        {confirmDelete && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm text-red-700 flex-1">Remove this contact? This cannot be undone.</p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700"
              >
                Remove
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add form */}
        {adding && (
          <ContactForm
            onSave={handleAdd}
            onCancel={() => { setAdding(false); setAddError(""); }}
          />
        )}
        {addError && (
          <p className="text-xs text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">⚠️ {addError}</p>
        )}
      </div>

      {/* Add button */}
      {!adding && contacts.length < MAX_CONTACTS && (
        <button
          onClick={() => setAdding(true)}
          className="w-full py-2.5 rounded-xl border-2 border-dashed border-purple-300 text-purple-600 text-sm font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add Contact
        </button>
      )}

      {contacts.length >= MAX_CONTACTS && (
        <p className="text-center text-xs text-gray-400 mt-2">
          ✓ All {MAX_CONTACTS} contact slots filled. Remove one to add another.
        </p>
      )}
    </div>
  );
}
