import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const MAX_CONTACTS = 3;

export function useContacts() {
  const { user } = useAuth();
  const key = user ? `saferoute_contacts_${user.id}` : null;

  const load = () => {
    if (!key) return [];
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
  };

  const [contacts, setContacts] = useState(load);

  useEffect(() => {
    setContacts(load());
  }, [key]);

  const save = (updated) => {
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(updated));
    setContacts(updated);
  };

  const addContact = (contact) => {
    if (contacts.length >= MAX_CONTACTS) throw new Error(`Maximum ${MAX_CONTACTS} contacts allowed.`);
    const updated = [...contacts, { id: Date.now(), ...contact }];
    save(updated);
  };

  const updateContact = (id, data) => {
    save(contacts.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteContact = (id) => {
    save(contacts.filter((c) => c.id !== id));
  };

  return { contacts, addContact, updateContact, deleteContact, MAX_CONTACTS };
}
