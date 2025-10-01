import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Notification = () => {
    const [history, setHistory] = useState([]);
    const [editorContent, setEditorContent] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Load history from localStorage on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("notifications")) || [];
        setHistory(stored);
    }, []);

    // Save new notification
    const sendNotification = () => {
        if (!editorContent.trim()) {
            alert("Please write a notification before sending.");
            return;
        }

        const newNotification = {
            id: Date.now(),
            content: editorContent,
            date: new Date().toLocaleString()
        };

        const updatedHistory = [newNotification, ...history];
        setHistory(updatedHistory);
        localStorage.setItem("notifications", JSON.stringify(updatedHistory));
        setEditorContent("");
        setSuccessMessage("✅ Notification sent successfully!");

        // Hide message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <section className="driver" style={{ padding: "20px" }}>
            <h1 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bx bx-bell" style={{ fontSize: "24px" }}></i>
                Manage Notification
            </h1>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {/* Notification History */}
                <div style={{
                    flex: 1,
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <h2>Notification History</h2>
                    <div style={{ marginTop: "10px" }}>
                        {history.length === 0 ? (
                            <p style={{ color: "#888" }}>No Notification history found</p>
                        ) : (
                            history.map((n) => (
                                <div key={n.id} style={{
                                    background: "#f9f9f9",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "6px"
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: n.content }} />
                                    <small style={{ color: "#666" }}>{n.date}</small>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Create Notification */}
                <div style={{
                    flex: 1,
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <h2>Create Notification</h2>
                    <ReactQuill
                        theme="snow"
                        value={editorContent}
                        onChange={setEditorContent}
                        style={{ height: "150px", marginBottom: "20px" }}
                    />
                    <button
                        onClick={sendNotification}
                        style={{
                            padding: "10px 15px",
                            background: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginTop:"40px"
                        }}
                    >
                        Send Notification
                    </button>
                    {successMessage && (
                        <p style={{ marginTop: "10px", color: "green" }}>{successMessage}</p>
                    )}  
                </div>
            </div>
        </section>
    );
};

export default Notification;
