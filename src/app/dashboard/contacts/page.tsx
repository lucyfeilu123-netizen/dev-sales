"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useContactsStore } from "@/stores/contacts";
import { SOURCE_LABELS, type Contact, type ContactSource } from "@/types/database";
import { Mail, Phone, Plus, Search, Trash2, User } from "lucide-react";
import { useState } from "react";

function generateId() {
  return crypto.randomUUID();
}

export default function ContactsPage() {
  const {
    contacts,
    searchQuery,
    setSearchQuery,
    addContact,
    deleteContact,
  } = useContactsStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    source: "website" as ContactSource,
    tags: "",
  });

  const filtered = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.first_name.toLowerCase().includes(q) ||
      c.last_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.position || "").toLowerCase().includes(q)
    );
  });

  function handleAdd() {
    const contact: Contact = {
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: "local",
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone || null,
      company_id: null,
      source: form.source,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
      score: 0,
      avatar_url: null,
      notes: null,
      position: form.position || null,
    };
    addContact(contact);
    setShowModal(false);
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      position: "",
      source: "website",
      tags: "",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Contacts</h1>
          <p className="text-surface-500 text-sm mt-1">
            {contacts.length} total contacts
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Contact
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400"
        />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm bg-surface-0 border border-surface-300 rounded-[var(--radius-md)] placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
        />
      </div>

      {/* Contact list */}
      {filtered.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-surface-400" />
            </div>
            <p className="text-surface-600 font-medium">
              {contacts.length === 0
                ? "No contacts yet"
                : "No contacts match your search"}
            </p>
            <p className="text-surface-400 text-sm mt-1">
              {contacts.length === 0
                ? "Add your first contact to get started"
                : "Try a different search term"}
            </p>
          </div>
        </Card>
      ) : (
        <Card padding={false}>
          <div className="divide-y divide-surface-100">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-surface-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
                    {contact.first_name[0]}
                    {contact.last_name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">
                      {contact.first_name} {contact.last_name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-surface-500 flex items-center gap-1">
                        <Mail size={12} /> {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="text-xs text-surface-500 flex items-center gap-1">
                          <Phone size={12} /> {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {contact.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                  <Badge variant="info">
                    {SOURCE_LABELS[contact.source]}
                  </Badge>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-1.5 text-surface-400 hover:text-danger hover:bg-red-50 rounded-[var(--radius-sm)] transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add contact modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Add Contact"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="first_name"
              label="First name"
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }
              required
            />
            <Input
              id="last_name"
              label="Last name"
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }
              required
            />
          </div>
          <Input
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            id="phone"
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            id="position"
            label="Position"
            placeholder="e.g. Owner, Marketing Director"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-surface-700">
              Source
            </label>
            <select
              value={form.source}
              onChange={(e) =>
                setForm({ ...form, source: e.target.value as ContactSource })
              }
              className="w-full px-3 py-2 text-sm bg-surface-0 border border-surface-300 rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            >
              {Object.entries(SOURCE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Input
            id="tags"
            label="Tags (comma separated)"
            placeholder="e.g. hot-lead, restaurant, local"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Contact</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
