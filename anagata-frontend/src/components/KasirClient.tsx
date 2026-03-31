"use client";

import React, { useState } from "react";

type Menu = {
    id: string;
    name: string;
    category: string;
    price: number;
    variants?: { name: string; price: number }[] | null;
    image: string | null;
    isAvailable: boolean;
};

type DialogState = {
    isOpen: boolean;
    type: "alert" | "confirm";
    title: string;
    message: string;
    onConfirm?: () => void;
};

export default function KasirClient({ initialMenus, isOwner }: { initialMenus: Menu[], isOwner: boolean }) {
    const [menus, setMenus] = useState<Menu[]>(initialMenus);
    const [activeTab, setActiveTab] = useState<string>("Coffee");
    
    // Modal states for forms
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);

    // Custom Dialog State
    const [dialog, setDialog] = useState<DialogState>({ isOpen: false, type: "alert", title: "", message: "" });

    // Form states
    const [formName, setFormName] = useState("");
    const [formCategory, setFormCategory] = useState("Coffee");
    const [formPrice, setFormPrice] = useState("");
    const [formVariants, setFormVariants] = useState<{name: string, price: number}[]>([]);
    const [formImage, setFormImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ["Coffee", "Non-Coffee", "Dessert"];
    const filteredMenus = menus.filter(m => m.category === activeTab);

    const showAlert = (title: string, message: string) => {
        setDialog({ isOpen: true, type: "alert", title, message });
    };

    const showConfirm = (title: string, message: string, onConfirm: () => void) => {
        setDialog({ isOpen: true, type: "confirm", title, message, onConfirm });
    };

    const closeDialog = () => setDialog({ ...dialog, isOpen: false });

    const resetForm = () => {
        setFormName("");
        setFormCategory("Coffee");
        setFormPrice("");
        setFormVariants([]);
        setFormImage(null);
        setEditingMenu(null);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", formName);
            formData.append("category", formCategory);
            formData.append("price", formPrice);
            if (formVariants.length > 0) {
                // filter out empty names just in case
                const cleanVariants = formVariants.filter(v => v.name.trim() !== "");
                formData.append("variants", JSON.stringify(cleanVariants));
            }
            if (formImage) {
                formData.append("image", formImage);
            }

            const res = await fetch("/api/menus", {
                method: "POST",
                body: formData
            });

            if (res.ok) {
                const newMenu = await res.json();
                setMenus([newMenu, ...menus]);
                setIsAddOpen(false);
                resetForm();
            } else {
                showAlert("Gagal", "Gagal menambahkan menu");
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Terjadi kesalahan pada sistem.");
        }
        setIsSubmitting(false);
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMenu) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", formName);
            formData.append("category", formCategory);
            formData.append("price", formPrice);
            if (formVariants.length > 0) {
                const cleanVariants = formVariants.filter(v => v.name.trim() !== "");
                formData.append("variants", JSON.stringify(cleanVariants));
            } else {
                formData.append("variants", "[]"); // explicitly send empty array to clear variants
            }
            if (formImage) {
                formData.append("image", formImage);
            }

            const res = await fetch(`/api/menus/${editingMenu.id}`, {
                method: "PUT",
                body: formData
            });

            if (res.ok) {
                const updated = await res.json();
                setMenus(menus.map(m => m.id === updated.id ? updated : m));
                setIsEditOpen(false);
                resetForm();
            } else {
                showAlert("Gagal", "Gagal memperbarui menu");
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Terjadi kesalahan saat memperbarui data.");
        }
        setIsSubmitting(false);
    };

    const confirmDelete = (menu: Menu) => {
        showConfirm("Hapus Menu", `Tahan! Anda yakin ingin menghapus menu "${menu.name}"? Data yang dihapus tidak dapat dikembalikan.`, () => {
            performDelete(menu.id);
        });
    };

    const performDelete = async (id: string) => {
        closeDialog();
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/menus/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMenus(menus.filter(m => m.id !== id));
            } else {
                showAlert("Gagal", "Gagal menghapus menu");
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Terjadi kesalahan saat menghapus data.");
        }
        setIsSubmitting(false);
    };

    const handleToggleAvailability = async (menu: Menu) => {
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/menus/${menu.id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAvailable: !menu.isAvailable })
            });

            if (res.ok) {
                const updated = await res.json();
                setMenus(menus.map(m => m.id === updated.id ? updated : m));
            } else {
                showAlert("Gagal", "Gagal memperbarui status menu.");
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Terjadi kesalahan pada sistem.");
        }
        setIsSubmitting(false);
    };

    const openEditModal = (menu: Menu) => {
        setEditingMenu(menu);
        setFormName(menu.name);
        setFormCategory(menu.category);
        setFormPrice(menu.price.toString());
        setFormVariants(menu.variants || []);
        setIsEditOpen(true);
    };

    const openAddModal = () => {
        resetForm();
        setIsAddOpen(true);
    };

    return (
        <div>
            {/* Header / Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingBottom: "4px" }}>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                background: activeTab === cat ? "var(--admin-accent)" : "var(--admin-card)",
                                color: activeTab === cat ? "#fff" : "var(--admin-text)",
                                transition: "all 0.3s ease",
                                boxShadow: activeTab === cat ? "0 4px 12px rgba(200,136,43,0.3)" : "none"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                {isOwner && (
                    <button 
                        onClick={openAddModal}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "var(--admin-accent)",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                    >
                        + Tambah Menu
                    </button>
                )}
            </div>

            {/* Grid */}
            <div className="pos-grid">
                <style dangerouslySetInnerHTML={{__html: `
                    .pos-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                        gap: 24px;
                        margin-bottom: 40px;
                    }
                    @media (max-width: 768px) {
                        .pos-grid {
                            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                            gap: 16px;
                        }
                    }
                    .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); border-color: var(--admin-accent); }
                    [data-theme='dark'] .product-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.5); }
                `}} />
                {filteredMenus.map((item) => (
                    <div key={item.id} className="product-card" style={{ background: "var(--admin-card)", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--admin-border)", boxShadow: "var(--admin-card-shadow)", transition: "all 0.3s ease", display: "flex", flexDirection: "column" }}>
                        <div style={{ height: "180px", background: "var(--admin-sidebar)", position: "relative", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={item.image || "/logo-anagata.png"} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", filter: item.isAvailable ? "none" : "grayscale(100%)", opacity: item.isAvailable ? 1 : 0.5 }} />
                            {!item.isAvailable && (
                                <div style={{ position: "absolute", background: "var(--admin-card)", color: "#dc3545", padding: "4px 12px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.85rem", border: "1px solid #dc3545", zIndex: 10 }}>
                                    HABIS
                                </div>
                            )}
                            <div style={{ position: "absolute", top: "12px", right: "12px", background: "var(--admin-accent-bg)", border: "1px solid var(--admin-border)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700", color: "var(--admin-accent)" }}>
                                {item.category}
                            </div>
                        </div>
                        <div style={{ padding: "20px", opacity: item.isAvailable ? 1 : 0.7, display: "flex", flexDirection: "column", flex: 1 }}>
                            <h3 style={{ margin: "0 0 8px", fontSize: "1rem", color: "var(--admin-text)", fontWeight: "700" }}>{item.name}</h3>
                            <p style={{ margin: "0 0 16px", fontWeight: "700", color: "var(--admin-accent-glow)", fontSize: "0.9rem", flexShrink: 0 }}>
                                {item.variants && item.variants.length > 0 
                                    ? `Mulai Rp ${Math.min(...item.variants.map(v => v.price)).toLocaleString("id-ID")}`
                                    : `Rp ${item.price.toLocaleString("id-ID")}`
                                }
                            </p>
                            {isOwner && (
                                <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                                        <button 
                                            title="Edit Menu"
                                            onClick={(e) => { e.stopPropagation(); openEditModal(item); }}
                                            style={{ flex: 1, background: "var(--admin-accent)", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                            </svg>
                                        </button>
                                        <button 
                                            title={item.isAvailable ? "Non-aktifkan Menu (Habis)" : "Aktifkan Menu (Tersedia)"}
                                            onClick={(e) => { e.stopPropagation(); handleToggleAvailability(item); }}
                                            style={{ flex: 1, background: item.isAvailable ? "#6c757d" : "#28a745", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            {item.isAvailable ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.1 13.1 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.1 13.1 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.1 13.1 0 0 1 1.172 8z"/>
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                                </svg>
                                            )}
                                        </button>
                                        <button 
                                            title="Hapus Menu"
                                            onClick={(e) => { e.stopPropagation(); confirmDelete(item); }}
                                            style={{ flex: 1, background: "#dc3545", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Dialog / Alert / Confirm */}
            {dialog.isOpen && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
                    <div style={{ background: "var(--admin-card)", padding: "30px", borderRadius: "16px", width: "90%", maxWidth: "400px", color: "var(--admin-text)", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", border: "1px solid var(--admin-border)", textAlign: "center" }}>
                        <h3 style={{ margin: "0 0 10px", fontSize: "1.3rem", color: dialog.type === "confirm" ? "var(--admin-text)" : "#dc3545" }}>
                            {dialog.title}
                        </h3>
                        <p style={{ margin: "0 0 24px", color: "var(--admin-text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                            {dialog.message}
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            {dialog.type === "confirm" && (
                                <button onClick={closeDialog} style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-sidebar)", color: "var(--admin-text)", cursor: "pointer", fontWeight: "600", flex: 1 }}>
                                    Batal
                                </button>
                            )}
                            <button 
                                onClick={() => {
                                    if (dialog.type === "confirm" && dialog.onConfirm) {
                                        dialog.onConfirm();
                                    } else {
                                        closeDialog();
                                    }
                                }} 
                                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: dialog.type === "confirm" ? "#dc3545" : "var(--admin-accent)", color: "#fff", cursor: "pointer", fontWeight: "600", flex: 1 }}
                            >
                                {dialog.type === "confirm" ? "Ya, Hapus" : "Tutup"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Add / Edit Form */}
            {(isAddOpen || isEditOpen) && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", flexWrap: "wrap", overflowY: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", zIndex: 1000, padding: "40px 15px" }}>
                    <div style={{ background: "var(--admin-card)", padding: "30px", borderRadius: "16px", width: "100%", maxWidth: "500px", color: "var(--admin-text)", margin: "auto" }}>
                        <h2 style={{ marginTop: 0 }}>{isAddOpen ? "Tambah Menu" : "Edit Menu"}</h2>
                        <form onSubmit={isAddOpen ? handleAdd : handleEdit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Nama Menu</label>
                                <input required type="text" value={formName} onChange={e => setFormName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Kategori</label>
                                <select value={formCategory} onChange={e => setFormCategory(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }}>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Harga (Angka)</label>
                                <input required type="number" value={formPrice} onChange={e => setFormPrice(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }} />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "5px", fontSize: "0.9rem" }}>Foto Menu</label>
                                <input type="file" accept="image/*" onChange={e => setFormImage(e.target.files?.[0] || null)} style={{ width: "100%" }} />
                                {isEditOpen && <small style={{ color: "var(--admin-text-muted)" }}>Biarkan kosong jika tidak ingin mengubah gambar.</small>}
                            </div>
                            <div style={{ padding: "12px", background: "rgba(0,0,0,0.03)", borderRadius: "10px", border: "1px dashed var(--admin-border)" }}>
                                <label style={{ display: "block", marginBottom: "10px", fontSize: "0.9rem", fontWeight: "bold" }}>Varian (Hot/Ice/dll) - Opsional</label>
                                {formVariants.map((v, i) => (
                                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                        <select value={v.name} onChange={e => { const nv = [...formVariants]; nv[i].name = e.target.value; setFormVariants(nv); }} style={{ flex: "1 1 110px", minWidth: "110px", padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }}>
                                            <option value="" disabled>Pilih Varian...</option>
                                            <option value="Hot">Hot</option>
                                            <option value="Ice">Ice</option>
                                        </select>
                                        <div style={{ display: "flex", alignItems: "center", flex: "1 1 140px", minWidth: "140px", position: "relative" }}>
                                            <span style={{ position: "absolute", left: "10px", color: "var(--admin-text-muted)", fontSize: "0.9rem", fontWeight: "bold" }}>Rp</span>
                                            <input type="number" value={v.price || ""} placeholder="Harga" onChange={e => { const nv = [...formVariants]; nv[i].price = e.target.value === "" ? 0 : (parseInt(e.target.value)||0); setFormVariants(nv); }} style={{ width: "100%", padding: "10px 10px 10px 32px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }} />
                                        </div>
                                        <button type="button" onClick={() => setFormVariants(formVariants.filter((_, idx) => idx !== i))} style={{ padding: "10px 14px", background: "#f03e3e", color: "white", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", marginLeft: "auto" }}>&times;</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setFormVariants([...formVariants, {name: "", price: 0}])} style={{ fontSize: "0.85rem", padding: "8px", borderRadius: "8px", border: "1px dashed var(--admin-accent)", background: "transparent", color: "var(--admin-accent)", cursor: "pointer", width: "100%", fontWeight: "bold" }}>+ Tambah Varian</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                                <button type="button" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "transparent", color: "var(--admin-text)", cursor: "pointer" }}>Batal</button>
                                <button type="submit" disabled={isSubmitting} style={{ padding: "10px 16px", borderRadius: "8px", border: "none", background: "var(--admin-accent)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
                                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
