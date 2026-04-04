import { create } from "zustand";
import type { Contact } from "@/types/database";

interface ContactsState {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchQuery: string;
  filterTag: string | null;
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  selectContact: (contact: Contact | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterTag: (tag: string | null) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  selectedContact: null,
  searchQuery: "",
  filterTag: null,
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({ contacts: [contact, ...state.contacts] })),
  updateContact: (id, updates) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
  selectContact: (contact) => set({ selectedContact: contact }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterTag: (tag) => set({ filterTag: tag }),
}));
