"use client";

import React, { useState, useEffect, useRef } from "react";

type Menu = {
    id: string;
    name: string;
    category: string;
    price: number;
    variants?: { name: string; price: number }[] | null;
    image: string | null;
};

type CartItem = Menu & { 
    cartId: string; 
    quantity: number; 
    cartItemId: string;
    variant?: string;
};

type PosClientProps = {
    menus: Menu[];
    kasirName: string;
};

export default function PosClient({ menus, kasirName }: PosClientProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("Coffee");
    const [customerName, setCustomerName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [amountReceived, setAmountReceived] = useState<string>("");
    
    // Receipt state
    const [isPrinting, setIsPrinting] = useState(false);
    const [lastOrder, setLastOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

    const categories = ["Coffee", "Non-Coffee", "Dessert"];
    const filteredMenus = menus.filter(m => m.category === activeCategory);

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const received = parseInt(amountReceived) || 0;
    const change = received - cartTotal;

    const addToCart = (menu: Menu, variantName?: string, variantPrice?: number) => {
        const cartId = variantName ? `${menu.id}-${variantName}` : menu.id;
        const finalName = variantName ? `${menu.name} - ${variantName}` : menu.name;
        const finalPrice = variantPrice ?? menu.price;

        setCart(prev => {
            const existing = prev.find(item => item.cartId === cartId);
            if (existing) {
                return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...menu, cartId, name: finalName, price: finalPrice, variant: variantName, quantity: 1, cartItemId: Date.now().toString() }];
        });
    };

    const updateQuantity = (cartId: string, delta: number) => {
        setCart(prev => {
            const index = prev.findIndex(item => item.cartId === cartId);
            if (index === -1) return prev;
            
            const newCart = [...prev];
            const newQuantity = newCart[index].quantity + delta;
            
            if (newQuantity <= 0) {
                newCart.splice(index, 1); // Remove item from cart if quantity falls to 0
            } else {
                newCart[index] = { ...newCart[index], quantity: newQuantity };
            }
            return newCart;
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return alert("Keranjang kosong!");
        if (paymentMethod === "CASH" && received < cartTotal) {
            return alert("Uang tunai kurang!");
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: customerName.trim(),
                    paymentMethod,
                    items: cart.map(item => ({ id: item.id, quantity: item.quantity, variant: item.variant }))
                })
            });

            if (res.ok) {
                const orderData = await res.json();
                setLastOrder({
                    ...orderData,
                    cartSnapshot: [...cart],
                    received,
                    change: paymentMethod === "CASH" ? change : 0
                });
                
                // Print Flow: Trigger state then window.print
                setIsPrinting(true);
                setTimeout(() => {
                    window.print();
                    // Reset after print dialog
                    setCart([]);
                    setCustomerName("");
                    setAmountReceived("");
                    setIsPrinting(false);
                    setIsLoading(false);
                }, 500);

            } else {
                const err = await res.json();
                alert("Gagal memproses pesanan: " + err.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan jaringan.");
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", gap: "20px", height: "100%" }}>
            
            {/* LEFT SIDE: CATALOG */}
            <div className="pos-catalog" style={{ flex: 2, display: "flex", flexDirection: "column", background: "var(--admin-card)", borderRadius: "20px", border: "1px solid var(--admin-border)", padding: "20px", overflow: "hidden" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", paddingBottom: "4px", flexShrink: 0 }}>
                    {categories.map(cat => (
                         <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                background: activeCategory === cat ? "var(--admin-accent)" : "var(--admin-card)",
                                color: activeCategory === cat ? "#fff" : "var(--admin-text)",
                                transition: "all 0.3s ease",
                                boxShadow: activeCategory === cat ? "0 4px 12px rgba(200,136,43,0.3)" : "none",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                
                <style dangerouslySetInnerHTML={{__html: `
                    .pos-catalog-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                        gap: 16px;
                    }
                    @media (max-width: 768px) {
                        .pos-catalog-grid {
                            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                            gap: 12px;
                        }
                    }
                `}} />
                
                <div style={{ flexGrow: 1, overflowY: "auto", paddingRight: "10px" }}>
                    <div className="pos-catalog-grid">
                        {filteredMenus.map(menu => {
                            // Calculate total quantity of this menu across all variants
                            const qty = cart.filter(c => c.id === menu.id).reduce((sum, item) => sum + item.quantity, 0);
                            const hasVariants = menu.variants && menu.variants.length > 0;
                            const displayPrice = hasVariants ? Math.min(...menu.variants!.map(v => v.price)) : menu.price;

                            return (
                                <div 
                                    key={menu.id} 
                                    style={{ 
                                        position: "relative",
                                        background: "var(--admin-sidebar)", 
                                        borderRadius: "16px", 
                                        padding: "16px", 
                                        border: "1px solid var(--admin-border)",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--admin-accent)" }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--admin-border)" }}
                                >
                                    {qty > 0 && (
                                        <div style={{ position: "absolute", top: "-5px", right: "-5px", background: "#f03e3e", color: "white", minWidth: "26px", height: "26px", padding: "0 6px", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.3)", zIndex: 10 }}>
                                            {qty}
                                        </div>
                                    )}
                                    <div style={{ position: "relative", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", background: "var(--admin-bg)", borderRadius: "12px", padding: "10px" }}>
                                        <img src={menu.image || "/logo-anagata.png"} alt={menu.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                                        <div>
                                            <h4 style={{ margin: "0 0 4px", fontSize: "0.95rem", color: "var(--admin-text)", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{menu.name}</h4>
                                            <p style={{ margin: 0, color: "var(--admin-accent)", fontWeight: "700", fontSize: "0.95rem" }}>
                                                {hasVariants ? `Mulai Rp ${displayPrice.toLocaleString("id-ID")}` : `Rp ${displayPrice.toLocaleString("id-ID")}`}
                                            </p>
                                        </div>
                                        
                                        <div style={{ minHeight: "34px", display: "flex", flexDirection: "column", gap: "6px", width: "100%", justifyContent: "flex-end" }}>
                                            {hasVariants ? (
                                                menu.variants!.map(v => {
                                                    const variantId = `${menu.id}-${v.name}`;
                                                    const variantQty = cart.find(c => c.cartId === variantId)?.quantity || 0;
                                                    return (
                                                        <div key={v.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--admin-bg)", padding: "4px 8px", borderRadius: "8px", border: "1px solid var(--admin-border)", width: "100%" }}>
                                                            <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--admin-text)" }}>{v.name}</span>
                                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                                {variantQty > 0 ? (
                                                                    <>
                                                                        <button onClick={() => updateQuantity(variantId, -1)} style={{ width: "24px", height: "24px", borderRadius: "6px", border: "1px solid var(--admin-border)", background: "var(--admin-sidebar)", color: "var(--admin-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem" }}>&minus;</button>
                                                                        <span style={{ fontSize: "0.85rem", fontWeight: "bold", textAlign: "center", minWidth: "16px" }}>{variantQty}</span>
                                                                        <button onClick={() => updateQuantity(variantId, 1)} style={{ width: "24px", height: "24px", borderRadius: "6px", border: "none", background: "var(--admin-accent)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem" }}>+</button>
                                                                    </>
                                                                ) : (
                                                                    <button onClick={() => addToCart(menu, v.name, v.price)} style={{ width: "24px", height: "24px", borderRadius: "6px", border: "none", background: "var(--admin-accent-bg)", color: "var(--admin-accent)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem" }}>+</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                qty > 0 ? (
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--admin-bg)", padding: "4px", borderRadius: "8px", border: "1px solid var(--admin-border)", width: "100%" }}>
                                                        <button onClick={() => updateQuantity(menu.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "6px", border: "1px solid var(--admin-border)", background: "var(--admin-sidebar)", color: "var(--admin-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem", flexShrink: 0 }}>&minus;</button>
                                                        <span style={{ fontSize: "0.9rem", fontWeight: "bold", textAlign: "center", flex: 1 }}>{qty}</span>
                                                        <button onClick={() => updateQuantity(menu.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "6px", border: "none", background: "var(--admin-accent)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem", flexShrink: 0 }}>+</button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); addToCart(menu); }} 
                                                        style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "var(--admin-accent-bg)", color: "var(--admin-accent)", cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem", transition: "all 0.2s" }}
                                                    >
                                                        +
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FLOATING MOBILE CART BUTTON */}
            <button 
                className="mobile-cart-toggle"
                onClick={() => setIsMobileCartOpen(!isMobileCartOpen)}
                style={{
                    position: "fixed", bottom: "20px", right: "20px", zIndex: 99,
                    background: "var(--admin-accent)", color: "white", border: "none",
                    borderRadius: "50%", width: "60px", height: "60px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)", cursor: "pointer",
                    display: "none", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem"
                }}
            >
                🛒
                {cart.length > 0 && (
                    <span style={{ position: "absolute", top: 0, right: 0, background: "red", color: "white", borderRadius: "50%", width: "22px", height: "22px", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                )}
            </button>

            {/* RIGHT SIDE: CART/BILLING */}
            <div className={`pos-cart-panel ${isMobileCartOpen ? 'open' : ''}`} style={{ flex: 1, minWidth: "350px", display: "flex", flexDirection: "column", background: "var(--admin-card)", borderRadius: "20px", border: "1px solid var(--admin-border)", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid var(--admin-border)", paddingBottom: "12px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Keranjang Pesanan</h3>
                    <button className="mobile-cart-close" onClick={() => setIsMobileCartOpen(false)} style={{ display: "none", background: "transparent", border: "none", color: "var(--admin-text)", fontSize: "1.5rem", cursor: "pointer" }}>&times;</button>
                </div>
                
                {/* Cart Items */}
                <div style={{ flexGrow: 1, overflowY: "auto", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", color: "var(--admin-text-muted)", marginTop: "40px" }}>
                            Belum ada pesanan
                        </div>
                    ) : cart.map(item => (
                        <div key={item.cartItemId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px dashed var(--admin-border)" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{item.name}</div>
                                <div style={{ color: "var(--admin-text-muted)", fontSize: "0.85rem" }}>Rp {item.price.toLocaleString("id-ID")}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <button onClick={() => updateQuantity(item.cartId, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                                <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.cartId, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "none", background: "var(--admin-accent)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                            </div>
                            <div style={{ minWidth: "80px", textAlign: "right", fontWeight: "700", color: "var(--admin-accent)" }}>
                                {(item.price * item.quantity).toLocaleString("id-ID")}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Checkout Summary */}
                <div style={{ background: "var(--admin-sidebar)", padding: "16px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                        <span style={{ color: "var(--admin-text-muted)" }}>Subtotal</span>
                        <span style={{ fontWeight: "600" }}>Rp {cartTotal.toLocaleString("id-ID")}</span>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px dashed var(--admin-border)", margin: "4px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "700" }}>
                        <span>Total</span>
                        <span style={{ color: "var(--admin-accent-glow)" }}>Rp {cartTotal.toLocaleString("id-ID")}</span>
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                        <input 
                            type="text" 
                            placeholder="Nama / Meja (Opsional)" 
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)" }}
                        />
                    </div>
                     <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)", width: "100%" }}
                    >
                        <option value="CASH">Tunai (Cash)</option>
                        <option value="QRIS">QRIS / e-Wallet</option>
                        <option value="TRANSFER">Transfer Bank</option>
                    </select>

                    {paymentMethod === "CASH" && (
                        <div style={{ display: "flex", gap: "10px", flexDirection: "column", marginTop: "4px", background: "var(--admin-bg)", padding: "12px", borderRadius: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: "0.9rem" }}>Diterima:</span>
                                <input 
                                    type="number"
                                    value={amountReceived}
                                    onChange={(e) => setAmountReceived(e.target.value)}
                                    placeholder="Nominal"
                                    style={{ padding: "6px 10px", width: "120px", borderRadius: "6px", border: "1px solid var(--admin-border)", background: "var(--admin-sidebar)", color: "var(--admin-text)" }}
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "600" }}>
                                <span style={{ fontSize: "0.9rem" }}>Kembali:</span>
                                <span style={{ color: change >= 0 ? "#28a745" : "#dc3545" }}>
                                    Rp {(change > 0 ? change : 0).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    )}

                    <button 
                        disabled={isLoading || cart.length === 0}
                        onClick={handleCheckout}
                        style={{ 
                            padding: "16px", 
                            marginTop: "10px",
                            borderRadius: "12px", 
                            border: "none", 
                            background: "var(--admin-accent)", 
                            color: "#fff", 
                            fontSize: "1.1rem", 
                            fontWeight: "bold", 
                            cursor: (isLoading || cart.length === 0) ? "not-allowed" : "pointer",
                            opacity: (isLoading || cart.length === 0) ? 0.7 : 1,
                            boxShadow: "0 4px 16px rgba(200,136,43,0.3)"
                        }}
                    >
                        {isLoading ? "Memproses..." : "Bayar & Cetak Nota"}
                    </button>
                    <button 
                        onClick={() => { if(confirm("Bersihkan keranjang?")) setCart([]) }}
                        style={{ padding: "10px", borderRadius: "12px", border: "1px solid var(--admin-border)", background: "transparent", color: "var(--admin-text)", cursor: "pointer", fontWeight: "600" }}
                    >
                        Reset Keranjang
                    </button>
                </div>
            </div>

            {/* PRINT RECEIPT DATA (Hidden in normal view) */}
            <div id="printable-receipt" style={{ display: isPrinting ? "block" : "none", color: "#000", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.4" }}>
                {lastOrder && (
                    <div style={{ width: "58mm", padding: "0", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "10px" }}>
                            <h2 style={{ margin: "0 0 4px", fontSize: "16px" }}>Anagata Coffee</h2>
                            <p style={{ margin: 0 }}>Jl. Contoh Alamat No. 12</p>
                            <p style={{ margin: 0 }}>Telp: 08123456789</p>
                            <p style={{ margin: "4px 0", borderBottom: "1px dashed #000" }}></p>
                        </div>
                        
                        <div style={{ marginBottom: "10px" }}>
                            <div>Waktu: {new Date(lastOrder.createdAt).toLocaleString("id-ID")}</div>
                            <div>Kasir: {kasirName}</div>
                            <div>Nota: {lastOrder.id.slice(-6).toUpperCase()}</div>
                            {lastOrder.customerName && <div>Pelanggan: {lastOrder.customerName}</div>}
                        </div>
                        
                        <div style={{ borderBottom: "1px dashed #000", marginBottom: "10px", paddingBottom: "10px" }}>
                            {lastOrder.cartSnapshot.map((item: any, idx: number) => (
                                <div key={idx} style={{ marginBottom: "6px" }}>
                                    <div style={{ fontWeight: "bold" }}>{item.name}</div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>{item.quantity} x {item.price.toLocaleString("id-ID")}</span>
                                        <span>{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ width: "100%", borderBottom: "1px dashed #000", paddingBottom: "10px", marginBottom: "10px" }}>
                            <table style={{ width: "100%", fontSize: "12px" }}>
                                <tbody>
                                    <tr>
                                        <td>Total</td>
                                        <td style={{ textAlign: "right", fontWeight: "bold" }}>{lastOrder.totalAmount.toLocaleString("id-ID")}</td>
                                    </tr>
                                    <tr>
                                        <td>Metode</td>
                                        <td style={{ textAlign: "right" }}>{lastOrder.paymentMethod}</td>
                                    </tr>
                                    {lastOrder.paymentMethod === "CASH" && (
                                        <>
                                            <tr>
                                                <td>Tunai</td>
                                                <td style={{ textAlign: "right" }}>{lastOrder.received.toLocaleString("id-ID")}</td>
                                            </tr>
                                            <tr>
                                                <td>Kembali</td>
                                                <td style={{ textAlign: "right" }}>{lastOrder.change.toLocaleString("id-ID")}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <p style={{ margin: 0, fontWeight: "bold" }}>Terima Kasih</p>
                            <p style={{ margin: "4px 0 0" }}>Silakan Berkunjung Kembali</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Print CSS Injection */}
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { margin: 0; size: 58mm 200mm; }
                    body { background: white; margin: 0; padding: 0; display: flex; align-items: flex-start; justify-content: flex-start; }
                    body * { visibility: hidden; }
                    #printable-receipt, #printable-receipt * { visibility: visible; }
                    #printable-receipt { position: absolute; left: 0; top: 0; width: 58mm; padding: 10px; box-sizing: border-box; }
                }
                @media (max-width: 900px) {
                    .mobile-cart-toggle { display: flex !important; }
                    .mobile-cart-close { display: block !important; }
                    .pos-cart-panel {
                        position: fixed !important; top: 0; right: 0; bottom: 0; width: 100%; max-width: 400px;
                        z-index: 100; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border-radius: 20px 0 0 20px !important; margin: 0; height: 100vh;
                    }
                    .pos-cart-panel.open {
                        transform: translateX(0);
                        box-shadow: -10px 0 30px rgba(0,0,0,0.5);
                    }
                }
            `}} />

        </div>
    );
}
